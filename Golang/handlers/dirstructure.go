package handlers

import (
	"encoding/json"
	"path"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
	"os"
	"bufio"
	"fmt"
)

var l *log.Logger;

// DirStructure : Directory structure
type DirStructure struct {
	name 	string
	path 	string
	sub		[]*DirStructure
}

// Project : projects in directory
type Project struct {
	Name 		string
	Category 	string
	Source		*SDir
	Proj		*ProjFile
}

// ProjFile : File for project info
type ProjFile struct {
	ImgURLs		[]string
	KeyWords	[]string
	Description	string
	DemoURL		string
}

// SDir : Source directory
type SDir struct {
	Name	string
	Dirs	[]*SDir
	Files	[]*SFile
	Images	[]*SImage
}

// SImage : Source image
type SImage struct {
	Name 	string
	URL		string
}

// SFile : Source file
type SFile struct {
	Name	string
	Lines	[]string
	URL		string
}

// NewDirStructure : Create new directory structure
func NewDirStructure(lhandler *log.Logger, topDir string) (*DirStructure) {
	ds := &DirStructure{path: topDir, name: path.Base(topDir)}
	l = lhandler

	ds.scanDir()

	return ds
}

func (ds *DirStructure) scanDir() {
	files, _ := ioutil.ReadDir(ds.path) // Get sub files
	for _, f := range files { // Loop through sub files
		ds.sub = append(ds.sub, &DirStructure{name: f.Name(), path: path.Join(ds.path, f.Name())})
		if (f.IsDir()) {
			ds.sub[len(ds.sub)-1].scanDir()
		}
	}
}

func (ds *DirStructure) toProjects() ([]*Project) {
	projects := make([]*Project, 0)
	for _, dirProject := range ds.sub { // For each project
		s := &SDir{Name: dirProject.name, Dirs: make([]*SDir, 0), Files: make([]*SFile, 0)}
		project := dirProject.scanProject(&Project{Name:dirProject.name, Category: ds.name,
			Source: s}, s)
		projects = append(projects, project)
	}
	return projects
}

func (ds *DirStructure) scanProject(p *Project, s *SDir) (*Project) {
	for _, ps := range ds.sub { // For each project

		if ok, _ := regexp.MatchString(`^(proj.json)$`, ps.name); ok { // Search for project.json file for project info
			jsonFile, err := os.Open(ps.path)
			defer jsonFile.Close()
			if err != nil { l.Println(err); return p }
			
			jsonBytes, _ := ioutil.ReadAll(jsonFile)

			p.Proj = &ProjFile{ImgURLs: make([]string, 0), KeyWords: make([]string, 0), DemoURL: "", Description: ""}
			json.Unmarshal(jsonBytes, p.Proj)
			for i := range p.Proj.ImgURLs {
				p.Proj.ImgURLs[i] = path.Join(path.Dir(ps.path), p.Proj.ImgURLs[i])
			}
			continue
		}

		// Open file to check if it is a directory
		file, err := os.Open(ps.path)
		if err != nil {
			log.Println(err)
		}
		defer file.Close()
		fileStats, err := file.Stat()
		if err != nil {
			log.Println(err)
		}
		isDir := fileStats.IsDir()

		// Is file
		if !isDir {
			// Handle file that can go into img tag
			if ok, _ := regexp.MatchString(`((.jpg)|(.png)|(.gif)|(.svg))$`, ps.name); ok {
				f := &SImage{Name: ps.name, URL: path.Join("./", ps.path)}
				s.Images = append(s.Images, f) // Add file to directory
				continue
			} 
			// Handle file that has readable lines of source code
			if ok, _ := regexp.MatchString(`((.txt)|(.go)|(.java)|(.php)|(.js)|(.html)|(.css)|(.md)|(.json))$`, ps.name); ok {
				file, err := os.Open(ps.path)
				defer file.Close()
				if err != nil { l.Println(err); return p }
				scanner := bufio.NewScanner(file)
	
				f := &SFile{Name: ps.name, URL: path.Join("./", ps.path), Lines: make([]string, 0)}
				for scanner.Scan() { // Add each line of source to file
					f.Lines = append(f.Lines, scanner.Text())
				}
				s.Files = append(s.Files, f) // Add file to directory
				continue
			} else {
				// Handle file that does not have readable lines of source code
				f := &SFile{Name: ps.name, URL: path.Join("./", ps.path), Lines: nil}
				f.Lines = append(f.Lines, "Server: \"This file probably contains a lot of 1s and 0s :)\"")
				s.Files = append(s.Files, f) // Add file to directory
				continue
			}
		}
		// Is Dir, so scan the sub directory
		s.Dirs = append(s.Dirs, &SDir{Name: ps.name, Dirs: make([]*SDir, 0), Files: make([]*SFile, 0)})
		p = ps.scanProject(p, s.Dirs[len(s.Dirs)-1]) // Do a project scan
	}
	return p
}

// ServeHTTP : Serve http
func (ds *DirStructure) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if (r.Method == http.MethodGet) {
		w.Header().Set("Content-Type", "application/json")

		l.Println("Hit")

		projects := ds.toProjects()

		json.NewEncoder(w).Encode(projects)
	} 
}

func (ds *DirStructure) toString() (string) {
	return "path: " + ds.path + " | name: " + ds.name
}

func (ds *DirStructure) dump() {
	l.Println(ds.toString())
	for _, sub := range ds.sub {
		sub.dump()
	}
}

func (p *Project) toString() (string) {
	return fmt.Sprintf("\nname: %v\ncategory: %v\nsource: %v", p.Name, p.Category, p.Source)
}

func dump(ps []*Project) {
	for _, p := range ps {
		l.Println(p.toString())
	}
}