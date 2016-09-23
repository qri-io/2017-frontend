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
			return undefined
		}

		return (
			<div>
				<Link to={`/${user.username}`}>{user.username}</Link>
			</div>
		)
	}

	render() {
		const { user, show } = this.props;
		return (
			<div id="main_menu" onClick={this.onClick} className={ show ? "show" : "hide" }>
				{/*<Link to="/queries">Queries</Link>*/}
				<Link to="/datasets">Datasets</Link>
				<Link to="/console">Console</Link>
				{this.userLinks(user)}
			</div>
		);
	}
}

MainMenu.propTypes = {
	user : React.PropTypes.oneOfType([
		React.PropTypes.object, 
		React.PropTypes.null]),
	show : React.PropTypes.bool,
}

MainMenu.defaultProps = {
	
}