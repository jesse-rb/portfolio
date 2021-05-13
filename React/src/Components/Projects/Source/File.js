import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './source.css'
import {ApiContext} from '../../../ApiContext'

export default class File extends Component {
    api = this.context.api;
    hidden = true;

    toggleHide = () => {
        this.hidden = !this.hidden;
        this.forceUpdate();
    }

    render() {
        const {Lines, Name, URL} = this.props.file
        let url = this.api + URL
        return (
            <div>
                <div className="expander" style={{'--top': 5, '--z-index': 9}}>
                    <button className={this.hidden ? "" : "btn-expanded"} onClick={this.toggleHide} >
                        &gt;
                    </button>
                    <pre className="material-icons">code</pre>
                    <pre>{Name} </pre>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="material-icons">
                            link
                        </a>
                </div>
                <div className={"indent ".concat(this.hidden ? "hidden" : "sourcecode")}>
                    {
                        Lines && Lines.map((l, i) => (
                            l === "" ? <br key={i}></br> : 
                            (/^\s*\/\//.test(l)) ||
                            (/(^\s*\/\*).*(\*\/\s*$)/.test(l)) ||
                            (/(^\s*<!--).*(-->\s*$)/.test(l)) ? <pre className="comment" key={i}>{l}</pre> :
                            <pre  key={i} >{l}</pre>
                        ))
                    }
                </div>
            </div>
        )
    }   
}

// Context type
File.contextType = ApiContext

// Prop types
File.propTypes = {
    file: PropTypes.object.isRequired
}