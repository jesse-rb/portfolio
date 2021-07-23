package main

import (
	"log"
	"net/http"
	"os"
	"time"
	"os/signal"
	"context"
	"portfolio-website/handlers"
)

func main() {
	l := log.New(os.Stdout, "main => ", log.LstdFlags)
	lhandlers := log.New(os.Stdout, "handlers => ", log.LstdFlags)
	// Create handlers
	projects := handlers.NewDirStructure(lhandlers, "./Projects")

	// Create new serve mux
	sm := http.NewServeMux()
	// Register handlers
	sm.Handle("/get-projects", projects)
	sm.Handle("/Projects/", http.StripPrefix("/Projects/" ,http.FileServer(http.Dir("./Projects"))))

	// Grab standard port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not specified
	}

	// Create new server
	s := &http.Server{
		Addr:         ":" + port,
		Handler:      sm,
		IdleTimeout:  120 * time.Second,
		ReadTimeout:  1 * time.Second,
		WriteTimeout: 1 * time.Second,
	}

	// Start server
	go func() {
		l.Println("Starting server on port " + port)

		err := s.ListenAndServe()
		if err != nil {
			l.Fatal(err)
		}
	}()

	// Graceful shutdown with interrupt or kill signals
	sigChan := make(chan os.Signal)
	signal.Notify(sigChan, os.Interrupt)
	signal.Notify(sigChan, os.Kill)

	sig := <-sigChan
	l.Println("Recieved terminate, graceful shutdown", sig)

	tc, cancelFunc := context.WithTimeout(context.Background(), 30*time.Second)
	cancelFunc()
	s.Shutdown(tc)
}