import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Navbar extends Component {
	render() {
		const { user, onToggleMenu, onGimmieInvite } = this.props;
		return (
			<div id="navbar">
				<div className="container">
					<div className="row">
						<div id="logotype" className="col-md-1 col-sm-2" href={__BUILD__.BASE_URL}>
							<img src="https://s3.amazonaws.com/static.qri.io/svg/qri.svg" />
						</div>
						<div className="menu col-md-4 offset-md-7">
							<Link className="green" to="/browse">Datasets</Link>
							{ user ? <a className="orange" href="http://docs.qri.io">Docs</a> : undefined}
							{ 
								user ? 
									<Link to={`/users/${user.username}`}>{user.username}</Link> :
									<a onClick={onGimmieInvite}>Gimmie beta</a>
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Navbar.propTypes = {
	user : React.PropTypes.oneOfType([
		React.PropTypes.object, 
		React.PropTypes.null]),

	onToggleMenu : React.PropTypes.func.isRequired,
	onGimmieInvite : React.PropTypes.func.isRequired
}

Navbar.defaultProps = {
}