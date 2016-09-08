import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import { editMigration, updateMigration, saveMigration, deleteMigration } from '../actions/migration'
import { selectSessionUser } from '../selectors/session'
import { selectLocalMigrationByNumber } from '../selectors/migration'
import validateMigration from '../validators/migration'

import Spinner from '../components/Spinner'
import SessionRequired from '../components/SessionRequired'
import EditAddress from '../components/EditAddress'
import ValidInput from '../components/ValidInput'
import ValidTextarea from '../components/ValidTextarea'

export default class EditMigration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showErrors : false,
			loading : !props.migration
		};

		[ "handleChange", "handleSave", "handleDelete" ].forEach(m => this[m] = this[m].bind(this));
	}

	componentWillMount() {
		this.props.editMigration(this.props.address, this.props.number);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.address != this.props.address || nextProps.number != this.props.number) {
			this.props.editMigration(nextProps.address, nextProps.number);
			this.setState({ showErrors: false, loading : !nextProps.migration });
		} else if (nextProps.migration && this.state.loading) {
			this.setState({ loading : false });
		}
	}

	handleChange(name, value, e) {
		const migration = Object.assign({}, this.props.migration)
		migration[name] = value;
		this.props.updateMigration(migration);
	}


	handleSave(e) {
		const { migration, validation, saveMigration } = this.props;
		
		e.preventDefault();

		if (!validation.isValid) {
			if (!this.state.showErrors) {
				this.setState({ showErrors : true });
			}
		} else {
			saveMigration(migration)
		}
	}

	handleDelete() {
		if (confirm("Are you sure you want to delete this migration?")) {
			this.props.deleteMigration(this.props.migration.id, "/console");
		}
	}

	render() {
		const { showErrors, loading } = this.state;
		const { user, migration, validation } = this.props;

		if (loading) {
			return (
				<div className="editMigration">
					<Spinner />
				</div>
			)
		}

		if (!user) {
			return (
				<div className="editMigration">
					<SessionRequired />
				</div>
			);
		}

		if (!migration) {
			// todo - should return some sort of not found error in this case
			return (
				<div>
					<h3>uh.... no migration?</h3>
				</div>
			);
		}

		return (
			<div className="editMigration">
				<h3>Edit Migration</h3>
				<form className="editMigration">
					<ValidTextarea label="Description" name="description" value={migration.description} showError={showErrors} error={validation.description} onChange={this.handleChange} />
					<ValidTextarea label="SQL" name="sql" value={migration.sql} showError={showErrors} error={validation.sql} onChange={this.handleChange} />
					<button className="btn btn-large submit" disabled={(!validation.isValid && showErrors)} onClick={this.handleSave}>Save Migration</button>
					
				</form>
				<button className="btn btn-large submit" onClick={this.handleDelete}>Delete</button>
			</div>
		);
	}
}

EditMigration.propTypes = {
	// address of the migration to edit. should be derived from url params
	address : PropTypes.string.isRequired,
	// migration number from url string
	number : PropTypes.string.isRequired,
	// any general error message (not found, no permission, etc.)
	error : PropTypes.string,

	// session user model
	user : PropTypes.object,
	// migration model to edit. should be a local model
	migration : PropTypes.object,
	// validation logic for the migration model fields
	validation : PropTypes.object,

	editMigration : PropTypes.func.isRequired,
	updateMigration: PropTypes.func.isRequired,
	saveMigration: PropTypes.func.isRequired,
	deleteMigration: PropTypes.func.isRequired,
}

EditMigration.defaultProps = {
	
}

function mapStateToProps(state, ownProps) {
	const address = [ownProps.params.user, ownProps.params.dataset].join(".");
	const migration = selectLocalMigrationByNumber(state, address, ownProps.params.number);

	return Object.assign({
		address,
		number : ownProps.params.number,
		migration,
		user : selectSessionUser(state),
		validation : validateMigration(migration),
	}, ownProps);
}

export default connect(mapStateToProps, {
	editMigration,
	updateMigration,
	saveMigration,
	deleteMigration,
})(EditMigration);