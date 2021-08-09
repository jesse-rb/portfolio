import React from 'react'
import './Top.css'

export default function Top() {
    return (
        <div id="top">
            <div id="details">
                <h1>Jesse Reyneke-Barnard</h1>
                <a target="_blank" rel="noopener noreferrer"href="https://github.com/jesse-rb">GitHub</a>
                <a target="_blank" rel="noopener noreferrer"href="https://www.linkedin.com/in/jesse-reyneke-barnard/">LinkedIn</a>
            </div>
            <div id="navbar">
                <div id="goto-page-1"><a href="/">Home</a></div>
                <div id="goto-page-2"><a href="/projects">Projects</a></div>
                <div id="goto-page-3"><a href="/about">About</a></div>
            </div>
        </div>
    )
}
