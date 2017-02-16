import React, { PropTypes } from 'react';

export default class Welcome extends React.Component {
	render() {
		return (
			<div id="welcome">
				<div className="container">
					<div className="col-md-12">
						<h1>Welcome to qri!</h1>
						<p></p>
						<ul>
							<li><a href="/download">Download the CLI (command line client)</a></li>
							<li><a href="/download">Check out the Docs</a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

Welcome.propTypes = {
	
}

Welcome.defaultProps = {
	
}