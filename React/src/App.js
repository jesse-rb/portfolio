import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Top from './Components/Layouts/Top'
import Projects from './Components/Projects/Projects'

export default class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Top />
						<Route exact path="/" render={props => (
							<div className="Section">
								<h2>Hi! Thanks for visiting.</h2>
								<h3>Development notes:</h3>
								<ul>
									<li>My projects page will download ~2.5MB of content.</li>
									<li>Please feel free to request original/omitted project files as they may have been resized or left out to optimize for web :).</li>
								</ul>
								<p><a href="./projects">My projects page</a></p>
							</div>
						)} />
						<Route exact path="/projects" render={props => (
							<div className="Section">
								<h2>Projects</h2>
								<Projects categories={['programming', 'art']} />
							</div>
						)} />
						<Route exact path="/about" render={props => (
							<div className="Section">
								<h2>Attributions</h2>
								<div>
									<div>
										<h3>Google/material-design-icons</h3>
										<ul>
											<li>project - <a target="_blank" rel="noopener noreferrer"
											href="https://github.com/google/material-design-icons">
												https://github.com/google/material-design-icons
											</a></li>
											<li>license - <a target="_blank" rel="noopener noreferrer"
											href="https://github.com/google/material-design-icons/blob/master/LICENSE">
												https://github.com/google/material-design-icons/blob/master/LICENSE
											</a></li>
										</ul>
									</div>
									<div>
										<h3>Google/Golang</h3>
										<ul>
											<li>project - <a target="_blank" rel="noopener noreferrer"
											href="https://golang.org/">
												https://golang.org/
											</a></li>
											<li>license - <a target="_blank" rel="noopener noreferrer"
											href="https://golang.org/LICENSE">
												https://golang.org/LICENSE
											</a></li>
										</ul>
									</div>
									<div>
										<h3>Facebook/React</h3>
										<ul>
											<li>project - <a target="_blank" rel="noopener noreferrer"
											href="https://reactjs.org/">
												https://reactjs.org/
											</a></li>
											<li>license - <a target="_blank" rel="noopener noreferrer"
											href="https://github.com/facebook/react/blob/master/LICENSE">
												https://github.com/facebook/react/blob/master/LICENSE
											</a></li>
										</ul>
									</div>
								</div>

							</div>
						)} />
				</div>
			</Router>
		);
	}
}
