import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Project.css'
import Dir from './Source/Dir'
import {ApiContext} from '../../ApiContext'

export default class Project extends Component {
    api = this.context.api;

    render() {
        const {Name, Source, Proj} = this.props.project;
        return (
            <div className="project">
                <h4>
                    {Name + " "}
                    {Proj && Proj ? (Proj.DemoURL && Proj.DemoURL ?
                                    <span><a href={Proj.DemoURL} target="_blank" rel="noopener noreferrer">visit project</a></span> :
                                    false) :
                                    false}
                </h4>
                    <div className="preview">{Proj && Proj ? (Proj.KeyWords && Proj.KeyWords.map((kw, i) => {
                        let cssProps = {};
                        cssProps['--animation-delay'] = ((Math.random()*20000).toString()+'ms')
                        return <span className="keyword" style={cssProps} key={i}>
                            <span className="material-icons">
                                label
                            </span>
                            {kw}
                        </span>
                    })) :
                    false}</div>
                    <div className="preview">{Proj && Proj ? (Proj.ImgURLs && Proj.ImgURLs.map((img, i) => {
                        let cssProps = {};
                        cssProps['--animation-delay'] = ((Math.random()*20000).toString()+'ms')
                        return <img src={this.api+img} style={cssProps} alt="Screenshot of project." key={i}></img>
                    })) :
                    false}</div>
                
                {Proj && Proj ? (Proj.Description && Proj.Description ? <p>{Proj.Description}</p> : false) : false}
                <Dir directory={Source} />
            </div>
        )
    }
}

// Context type
Project.contextType = ApiContext

// Prop types
Project.propTypes = {
    project: PropTypes.object.isRequired
}