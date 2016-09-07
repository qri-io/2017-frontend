import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadDatasetByAddress } from '../actions/dataset'
import { newMigration, updateMigration, saveMigration } from '../actions/migration'
import { selectMigrationByNumber } from '../selectors/migration'

import SessionRequired from '../components/SessionRequired'
import ValidInput from '../components/ValidInput'
import ValidTextarea from '../components/ValidTextarea'
import SchemaTable from '../components/SchemaTable'

class NewMigration extends React.Component {
	constructor(props) {
		super(props);
		[
			'handleChange',
		].forEach(m => this[m] = this[m].bind(this))
	}

  componentWillMount() {
  	// fire off a load dataset request to make sure we have the dataset
  	this.props.loadDatasetByAddress(this.props.address)
    // this.props.loadMigrationByNumber(this.props.address, this.props.number)
    this.props.newMigration({ address : this.props.address });
  }

	componentWillReceiveProps(nextProps) {
		const { handle, slug } = this.props
		if (nextProps.handle != handle || nextProps.slug != slug) {
	    this.props.loadMigrationByNumber(nextProps.handle, nextProps.slug)
		}
	}

	handleChange(name, value, e) {
		const migration = Object.assign({}, this.props.migration);
		migration[name] = value;
		this.props.updateMigration(migration)
	}

	render() {
		const { dataset, migration } = this.props
		
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
							<ValidTextarea label="SQL" name="sql" onChange={this.handleChange} />
							<button className="btn btn-large submit"></button>
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
	address : PropTypes.string.isRequired,
	// the migration model
	migration : PropTypes.object,
	dataset : PropTypes.object,
	user : PropTypes.object,

	loadDatasetByAddress : PropTypes.func.isRequired,
	newMigration : PropTypes.func.isRequired,
	updateMigration : PropTypes.func.isRequired,
	saveMigration : PropTypes.func.isRequired,
}

NewMigration.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	const address = [ownProps.params.user, ownProps.params.dataset].join(".")
	return Object.assign({
		dataset : selectDatasetByAddress(state, address),
		migration : selectMigrationByNumber(state, address, ownProps.params.number)
	}, ownProps)
}

export default connect(mapStateToProps, { 
	loadDatasetByAddress,
	newMigration,
})(NewMigration)