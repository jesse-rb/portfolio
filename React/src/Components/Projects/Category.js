import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Category'
import Project from './Project'
import {ApiContext} from '../../ApiContext'

export default class Category extends Component {
    api = this.context.api;
    hidden = true;

    toggleHide = (cat) => {
        this.hidden = !this.hidden
		this.forceUpdate();
    } 

    render() {
        const name = this.props.Name;
        const projects = this.props.Projects;
        let loading = true;
        if (projects.length > 0) {
            loading = false;
        }
        return (
            <div className="category">
                <div className={this.hidden ? "expander" : "expander expanded"}>
                    <button className={this.hidden ? "" : "btn-expanded"} onClick={this.toggleHide} >&gt;</button>
                    <pre className="material-icons">{this.hidden ? "folder" : "folder_open"}</pre><pre>{name}</pre>
                </div>
                <div className={this.hidden ? "hidden" : ""}>
                    {
                        loading ?   <div id="loading">
                                        <h3>Loading projects...</h3>
                                        <div id="loading-shape"><span className="material-icons">sync</span></div>
                                    </div>
                                :   projects.map(((proj, i) => (
                                    <Project project={proj} key={i} />
                                )))
                    }
                </div>
            </div>
        )
    }
}

// Context type
Category.contextType = ApiContext

// Prop types
Category.propTypes = {
    Name: PropTypes.string.isRequired,
    Projects: PropTypes.array.isRequired
}