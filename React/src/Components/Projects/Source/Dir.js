import React, { Component } from 'react'
import PropTypes from 'prop-types'
import File from './File'
import Image from './Image'
import './source.css'

export default class Dir extends Component {
    hidden = true;

    toggleHide = () => {
        this.hidden = !this.hidden;
        this.forceUpdate();
    }

    render() {
        const {Name, Dirs, Files, Images} = this.props.directory
        return (
            <div>
                <div className="expander" style={{'--top': 5, '--z-index': 9}}>
                    <button className={this.hidden ? "" : "btn-expanded"} onClick={this.toggleHide} >&gt;</button>
                    <pre className="material-icons">{this.hidden ? "folder" : "folder_open"}</pre><pre>{Name}</pre>
                </div>
                <div className={this.hidden ? "hidden" : "indent"}>
                    {
                        Dirs && Dirs.map((dir, i) => (
                            <Dir directory={dir} key={i} />
                        ))
                    }
                    {
                        Files && Files.map((f, i) => (
                            <File file={f} key={i} />
                        ))
                    }
                    {
                        Images && Images.map((img, i) => (
                            <Image file={img} key={i} />
                        ))
                    }
                </div>
            </div>
        )
    }
}

// Prop types
Dir.propTypes = {
    directory: PropTypes.object.isRequired
}