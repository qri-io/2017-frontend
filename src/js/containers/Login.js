import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { loginUser } from '../actions/session'
import { selectSessionUser } from '../selectors/session'
import ValidInput from '../components/form/ValidInput'


// TODO - add validation logic
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username : "",
			password : "",
			validation : {
				username : "",
				password : ""
			}
		};

		[ 'handleChange','handleLoginSubmit'].forEach(m => this[m] = this[m].bind(this));
	}

	componentWillMount() {
		if (this.props.user != null ) {
			browserHistory.push('/browse')
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user != null ) {
			browserHistory.push('/browse')
		}
	}

	handleLoginSubmit(e) {
		e.preventDefault()
		this.props.loginUser(this.state.username, this.state.password)
	}

	handleChange(name, value, e) {
		this.setState({
			[name] : value
		});
	}

	render() {
		const { username, password, validation } = this.state;
		return (
			<div id="login">
				<div className="container">
					<form onSubmit={this.handleLoginSubmit} className="form col-md-4 offset-md-4">
						<hr className="green" />
						<h3 className="green">Login:</h3>
						<ValidInput type="text" label="Username" name="username" value={username} error={validation.username} showError={false} onChange={this.handleChange} />
						<ValidInput type="password" label="Password" name="password" value={password} error={validation.username} showError={false} onChange={this.handleChange} />
						<input className="login bg-green btn btn-standard" type="submit" value="login" />
						<a href="/login/forgot">I forgot my password</a>
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