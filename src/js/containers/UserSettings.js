import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectLocalSessionUser } from '../selectors/session';
import { editSessionUser, updateSessionUser, saveSessionUser } from '../actions/session';

import ValidInput from '../components/form/ValidInput'
;
import ValidTextarea from '../components/form/ValidTextarea'
;
import validateUser from '../validators/user';

import Spinner from '../components/Spinner';


class UserSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showErrors : false,
			saving : false
		};

		[
			'handleChange',
			'handleSave'
		].forEach(m => this[m] = this[m].bind(this));
	}

	componentWillMount() {
		this.props.editSessionUser();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user && this.state.loading) {
			this.setState({ loading : false });
		}
	}

	handleChange(name, value, e) {
		const user = Object.assign({}, this.props.user)
		user[name] = value;
		this.props.updateSessionUser(user);
	}
	handleSave(e) {
		const { user, validation, saveSessionUser } = this.props;
		e.preventDefault();

		if (!validation.isValid) {
			if (!this.state.showErrors) {
				this.setState({ showErrors : true });
			}
		} else {
			this.setState({ saving : true });
			saveSessionUser(user);
		}
	}
	render() {
		const { showErrors, saving, loading } = this.state;
		const { user, validation } = this.props;
		
		if (loading) {
			return <Spinner />
		}

		return (
			<div className="container">
				<div className="col-md-6 col-md-offset-3">
					<header>
						<h3>User Settings</h3>
						<ValidInput type="text" label="name" name="name" value={user.name} showError={showErrors} error={validation.name} onChange={this.handleChange} />
						<ValidInput type="text" label="username" name="username" value={user.username} showError={showErrors} error={validation.username} onChange={this.handleChange} />
						<ValidInput type="text" label="email" name="email" value={user.email} showError={showErrors} error={validation.email} onChange={this.handleChange} />
						<ValidTextarea label="bio/description/about" name="description" value={user.description} showError={showErrors} error={validation.description} onChange={this.handleChange} />
						<button className="btn btn-primary" disabled={(!validation.isValid && showErrors)} onClick={this.handleSave}>Update</button>
					</header>
				</div>
			</div>
		);
	}
}

UserSettings.propTypes = {
	user : PropTypes.object,
	validation : PropTypes.object,

	editSessionUser : PropTypes.func.isRequired,
	updateSessionUser : PropTypes.func.isRequired,
	saveSessionUser : PropTypes.func.isRequired
}

UserSettings.defaultProps = {
	
}

function mapStateToProps(state, ownProps) {
	const user = selectLocalSessionUser(state);
	return {
		user,
		validation : validateUser(user)
	}
}

export default connect(mapStateToProps, {
	editSessionUser,
	updateSessionUser,
	saveSessionUser
})(UserSettings);