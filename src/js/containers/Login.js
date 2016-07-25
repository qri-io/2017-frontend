import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { loginUser } from '../actions/session'
import { selectSessionUser } from '../selectors/session'

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
	}

	componentWillMount() {
		if (this.props.user != null ) {
			browserHistory.push('/')
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user != null ) {
			browserHistory.push('/')
		}
	}

	handleLoginSubmit(e) {
		e.preventDefault()
		this.props.loginUser(this._handle.value, this._password.value)
	}

	render() {
		return (
			<div id="login">
				<div className="container">
					<form onSubmit={this.handleLoginSubmit}>
						<input type="text" name="handle" ref={(c) => this._handle = c} />
						<input type="password" name="password" ref={(c) => this._password = c} />
						<input className="btn btn-standard" type="submit" value="submit" />
					</form>
				</div>
			</div>
		);
	}
}

Login.propTypes = {

}

Login.defaultProps = {

}

function mapStateToProps(state) {
	return {
		 user : selectSessionUser(state)
	}
}

export default connect(mapStateToProps, {
	loginUser
})(Login)