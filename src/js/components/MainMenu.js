import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default class MainMenu extends React.Component {
	onClick(e) {
		// need to prevent any clicks on mainmenu from bubbling up
		// & hiding the menu
		e.stopPropagation();
	}

	userLinks(user) {
		if (!user) {
			return <Link to="/login">Login</Link>
		}

		return (
			<div>
				<Link to={`/user/${user.username}`}>{user.username}</Link>
				<a href="/docs">Docs</a>
			</div>
		)
	}

	render() {
		const { user, show, onGimmieInvite } = this.props;
		return (
			<div id="main_menu" onClick={this.onClick} className={ show ? "show" : "hide" }>
				<Link className="blue" to="/">Datasets</Link>
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
		);
	}
}

MainMenu.propTypes = {
	user : React.PropTypes.oneOfType([
		React.PropTypes.object, 
		React.PropTypes.null]),
	show : React.PropTypes.bool,
	onGimmieInvite : React.PropTypes.func
}

MainMenu.defaultProps = {
	
}