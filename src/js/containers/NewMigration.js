import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { selectSessionUser } from '../selectors/session'
import { selectDatasetByAddress } from '../selectors/dataset'
import { newMigration, updateMigration, saveMigration } from '../actions/migration'
import { selectLocalMigrationById } from '../selectors/migration'
import validateMigration from '../validators/migration'

import SessionRequired from '../components/SessionRequired'
import ValidInput from '../components/ValidInput'
import ValidTextarea from '../components/ValidTextarea'
import SchemaTable from '../components/SchemaTable'
import Spinner from '../components/Spinner' 

class NewMigration extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading : !props.dataset, showErrors : false };

		[
			'handleChange',
			'handleSave'
		].forEach(m => this[m] = this[m].bind(this));
	}

  componentWillMount() {
    this.props.newMigration(this.props.address, { author : this.props.user });
  }

	componentWillReceiveProps(nextProps) {
		if (nextProps.address != this.props.address) {
	    this.props.newMigration(nextProps.address, { author : this.props.user });
	    this.setState({ loading : !nextProps.dataset })
		} else if (nextProps.dataset && this.state.loading) {
			this.setState({ loading : false });
		}
	}

	handleChange(name, value, e) {
		const migration = Object.assign({}, this.props.migration);
		migration[name] = value;
		this.props.updateMigration(migration)
	}

	handleSave(e) {
		e.preventDefault();
		if (!this.props.validation.isValid && !this.state.showErrors) {
			this.setState({ showErrors : true });
		} else if (this.props.validation.isValid) {
			this.props.saveMigration(this.props.migration);
		}
	}

	render() {
		const { loading, showErrors } = this.state
		const { user, dataset, migration, validation } = this.props

		if (!user) {
			return <SessionRequired />
		}

		if (loading) {
			return (
				<div className="newMigration">
					<Spinner />
				</div>
			);
		}
		
		if (!migration) {
			return (
				<div className="dataset container">
					<p>No Migration</p>
				</div>
			);
		}

		return (
			<div id="wrapper">
				<div class="container">
					<div class="col-md-12">
						<form className="newMigration">
							<h3>New Migration</h3>
							<ValidTextarea label="Description" name="description" value={migration.description} showError={showErrors} error={validation.description} onChange={this.handleChange} />
							<ValidTextarea label="SQL" name="sql" value={migration.sql} showError={showErrors} error={validation.sql} onChange={this.handleChange} />
							<button className="btn btn-large submit" disabled={(!validation.isValid && showErrors)} onClick={this.handleSave}>Create Migration</button>
						</form>
						<section class="col-md-12">
							<hr />
							{ dataset.schema ? <SchemaTable schema={dataset.schema} /> : <p>This dataset currently has no schema</p> }
						</section>
					</div>
				</div>
			</div>
		);
	}
}

NewMigration.propTypes = {
	// dataset address provided by url params
	address : PropTypes.string.isRequired,
	// general error
	error : PropTypes.string,
	
	user : PropTypes.object,
	dataset : PropTypes.object,
	// the migration model
	migration : PropTypes.object,
	validation : PropTypes.object,

	newMigration : PropTypes.func.isRequired,
	updateMigration : PropTypes.func.isRequired,
	saveMigration : PropTypes.func.isRequired,
}

NewMigration.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	const address = [ownProps.params.user, ownProps.params.dataset].join(".")
	const migration = selectLocalMigrationById(state, "new");

	return Object.assign({
		address,
		migration,

		user : selectSessionUser(state),
		dataset : selectDatasetByAddress(state, address),
		validation : validateMigration(migration),
	}, ownProps)
}

export default connect(mapStateToProps, { 
	newMigration,
	updateMigration,
	saveMigration,
})(NewMigration)