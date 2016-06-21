import React, { Component, PropTypes } from 'react'

export default class Navbar extends Component {
	render() {
		return (
			<div id="navbar">
				<div className="container">
					<div className="row">
						<a id="logotype" className="col-md-1" href={__BUILD__.BASE_URL}>
							<img src="https://s3.amazonaws.com/static.qri.io/svg/logotype.svg" />
						</a>
						<div className="menu col-md-6 col-md-offset-5">
							<a href="/explore">Explore</a>
							<a href="/console">Console</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Navbar.propTypes = {
}

Navbar.defaultProps = {
}