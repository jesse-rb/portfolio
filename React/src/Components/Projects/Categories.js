import React, { Component } from 'react'
import './Categories.css'
import Category from './Category'
import {ApiContext} from '../../ApiContext'

export default class Categories extends Component {
    api = this.context.api;
    hidden = new Map();

    componentDidMount() {
        // Get projects from server
        fetch(this.api + "get-projects", {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then((result) => {
                for(let i = 0; i < result.length; i++) {
                    let c = result[i];
                    this.setState({categories: [...this.state.categories, c]});
                }
            }
        )
    }

    toggleHide = (cat) => {
        this.hidden.set(cat, !this.hidden.get(cat))
		this.forceUpdate();
    }    

    // Categories
    state = {
        categories: []
    }

    render() {
        let categories = this.state.categories;
        let loading = true;
        if (categories.length > 0) {
            loading = false;
        }
        return (
            <div className="categories">
                {
                    loading ?   <div id="loading">
                                    <h3>Loading categories...</h3>
                                    <div id="loading-shape"><span className="material-icons">sync</span></div>
                                </div>
                            :   categories.map(((cat, i) => (
                                    <Category Name={cat.Name} Projects={cat.Projects} key={i} />
                                )))
                }
            </div>
        )
    }
}

// Context type
Categories.contextType = ApiContext;