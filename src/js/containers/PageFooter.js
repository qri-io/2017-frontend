import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import { newInvite, updateInvite, saveInvite } from '../actions/invite';
import { selectLocalInviteById } from '../selectors/invite';

import EmailSignup from '../components/EmailSignup';

class PageFooter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			savingInvite : false
		};

		[
			'handleInviteChange',
			'handleSubmitInvite',
		].forEach((m) => this[m] = this[m].bind(this));
	}

	componentWillMount() {
		if (!this.props.invite.id) {
			this.props.newInvite();
		}
	}

	handleInviteChange(name, value, e) {
		this.props.updateInvite({
			email : value
		});
	}

	handleSubmitInvite(name, value, e) {
		this.state = {
			savingInvite : false
		}

		this.props.saveInvite(email);
	}

	render() {
		const { invite } = this.props;

		return (
			<footer className="pageFooter container">
				<div className="col-md-6">
					<EmailSignup value={invite.email} error={""} saving={this.state.savingInvite} onChange={this.handleInviteChange} onSubmit={this.handleSubmitInvite} />
				</div>
			</footer>
		);
	}
}

PageFooter.propTypes = {
	
}

PageFooter.defaultProps = {
	
}

function mapStateToProps (state, ownProps) {
	return {
		invite : selectLocalInviteById(state, "new") || {},
	}
}

export default connect(mapStateToProps,{
	newInvite,
	updateInvite,
	saveInvite
})(PageFooter);