import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Navbar extends Component {
	render() {
		const { user, onToggleMenu, onGimmieInvite, style } = this.props;
		return (
			<div id="navbar" style={style}>
				<div className="container">
					<div className="row">
						<div id="logotype" className="col-md-1 col-sm-2" href={__BUILD__.BASE_URL}>
							<img src="https://s3.amazonaws.com/static.qri.io/svg/qri.svg" />
						</div>
						<div className="menu col-md-4 offset-md-7">
							<Link className="blue" to="/browse">Datasets</Link>
							<Link className="green" to="/browse">Docs</Link>
							{/* user ? <a className="orange" href="http://docs.qri.io">Docs</a> : undefined */}
							{ user ? <a className="orange" href="/beta">Beta Info</a> : undefined}
							{ 
								user ? 
									<Link className="yellow" to={`/users/${user.username}`}>{user.username}</Link> :
									<a onClick={onGimmieInvite}>Gimmie beta</a>
							}
							{ user ? undefined : <Link to="/login">Login</Link>}
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