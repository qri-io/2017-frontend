import React, { PropTypes } from 'react';

export default class SessionRequired extends React.Component {
	render() {
		return (
			<div id="wrapper" className="sessionRequired">
				<div className="container">
					<div className="col-md-12">
						<h3 className="center-text">You must be logged-in to do this</h3>
					</div>
				</div>
			</div>
		);
	}
}

SessionRequired.propTypes = {
	
}

SessionRequired.defaultProps = {
	
}