import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { newInvite, updateInvite, saveInvite } from '../actions/invite';
import { selectLocalInviteById } from '../selectors/invite';
import validateInvite from '../validators/invite';

import ValidInput from '../components/form/ValidInput'
;

class BetaSignup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showValidation : false,
			saving : false
		};

		[
			'handleCancel',
			'handleChange',
			'handleSave'
		].forEach(m => this[m] = this[m].bind(this));
	}

	componentWillMount() {
		if (!this.props.invite) {
			this.props.newInvite();
		}
	}

	handleChange(name, value, e) {
		this.props.updateInvite(Object.assign({}, this.props.invite, {
			[name] : value
		}));
	}

	handleCancel() {
		this.props.onCancelled();
	}

	handleSave() {
		if (!this.props.validation.isValid && !this.state.showValidation) {
			this.setState({ showValidation : true });

		} else if (this.props.validation.isValid) {
			this.setState({ saving : true });
			this.props.saveInvite(this.props.invite).then(action => {
				this.props.onSaved();
			});
		}
	}

	render() {
		const { showValidation, saving } = this.state;
		const { invite, validation } = this.props;

		if (!invite) {
			return null;
		}

		return (
			<div className="betaSignup">
				<hr className="red" />
				<button type="button" className="close" aria-label="Close"><span aria-hidden="true" className="red" onClick={this.handleCancel}>&times;</span></button>
				<h4 className="title">Give Beta</h4>
				<p>Are you a brave? Are you willing to help forge this thing from it's doughy infancy? Are you awesome?</p>
				<p>Yeah. you're awesome. Holler with an email:</p>
				<ValidInput type="email" name="email" value={invite.email} error={validation.email} showError={showValidation} onChange={this.handleChange} placeholder="sparkle_pony_2000@qri.io" />
				<div className="form-group">
		      <input className="checkbox right" type="checkbox" name="marketing" checked={invite.marketing ? "on" : ""} onChange={(e) => { this.handleChange("marketing", !invite.marketing, e) }} />
					<p>Ok, send me rare marketing email:</p>
				</div>
				<button className="btn btn-primary" disabled={saving || (!validation.isValid && showValidation)} onClick={this.handleSave}>Signup</button>
			</div>
		);
	}
}

BetaSignup.propTypes = {
	invite : PropTypes.object,
	validation : PropTypes.object,

	onSaved : PropTypes.func.isRequired,
	onCancelled : PropTypes.func.isRequired,
}

BetaSignup.defaultProps = {
	
}

function mapStateToProps(state, ownProps) {
	const invite = selectLocalInviteById(state, "new")
	return {
		invite,
		validation : validateInvite(invite),

	}
}

export default connect(mapStateToProps, {
	newInvite,
	updateInvite,
	saveInvite
})(BetaSignup);