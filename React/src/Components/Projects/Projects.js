import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Projects.css'
import Project from './Project'
import {ApiContext} from '../../ApiContext'

export default class Projects extends Component {
    api = this.context.api;
    hidden = new Map();

    componentDidMount() {
        let categories = this.props.categories;

        categories.map((cat) => {
            // Get projects from server
            fetch(this.api + "get-"+ cat +"-projects", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then((result) => {
                    for(let i = 0; i < result.length; i++) {
                        let p = result[i];
                        this.setState({projects: [...this.state.projects, p]})
                    }
                }
            )

            // Initialize hidden
            this.hidden.set(cat, true)
            return 1
        })
    }

    toggleHide = (cat) => {
        this.hidden.set(cat, !this.hidden.get(cat))
		this.forceUpdate();
    }    

    // Projects
    state = {
        projects: []
    }

    render() {
        let categories = this.props.categories;
        let projects = this.state.projects;
        let loading = true;
        if (projects.length > 0) {
            loading = false;
        }
        return (
            <div className="projects">
                {
                    loading ?   <div id="loading">
                                    <h3>Loading projects...</h3>
                                    <div id="loading-shape"><span className="material-icons">sync</span></div>
                                </div>
                            :   categories.map((cat) => (
                                <div key={cat} className="category">
                                    <div className="expander inline" style={{'--top': 1}}>
                                        <button className={this.hidden.get(cat) ? "" : "btn-expanded"} onClick={() => {this.toggleHide(cat)}} >
                                            &gt;
                                        </button>
                                        <h3>{cat}</h3>
                                    </div>
                                    <div className={this.hidden.get(cat) ? "hidden" : "category-sub"}>
                                        {
                                            projects.map(((proj, i) => (
                                                cat === proj.Category ? <Project project={proj} category={cat} key={i} /> : false)
                                            ))
                                        }
                                    </div>
                                </div>
                    ))
                }
            </div>
        )
    }
}

// Context type
Projects.contextType = ApiContext

// Prop types
Projects.propTypes = {
    categories: PropTypes.array.isRequired
}
