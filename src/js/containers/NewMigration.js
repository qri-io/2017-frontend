import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { selectSessionUser } from '../selectors/session'
import { selectDatasetByAddress } from '../selectors/dataset'
import { loadDatasetByAddress } from '../actions/dataset'
import { newMigration, updateMigration, saveMigration } from '../actions/migration'
import { selectLocalMigrationById } from '../selectors/migration'
import validateMigration from '../validators/migration'

import SessionRequired from '../components/SessionRequired'
import ValidInput from '../components/ValidInput'
import ValidTextarea from '../components/ValidTextarea'
import SchemaTable from '../components/SchemaTable'
import Spinner from '../components/Spinner' 
import TableColumnEditor from '../components/TableColumnEditor';

class NewMigration extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			loading : !props.dataset, 
			showErrors : false,
			type : "",
			createTable : {
				name : "",
				columns : []
			},
			dropTable : ""
		};

		[
			'handleChange',
			'handleSave',
			'handleSetMigrationType',
			'handleChangeMigrationState'
		].forEach(m => this[m] = this[m].bind(this));
	}

  componentWillMount() {
  	this.props.loadDatasetByAddress(this.props.address, ['schema']);
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

	handleSetMigrationType(e) {
		this.setState({ type : e.target.value });
	}

	handleChangeMigrationState(type, name, value, e) {
		this.setState({
			[type] : Object.assign({}, this.state[type], {
				[name] : value
			})
		});
		// propagate change into app state tree
		this.props.updateMigration(Object.assign({}, this.props.migration, {
			sql : extractSqlStatement(this.props, this.state)
		}))
	}

	handleChange(name, value, e) {
		const migration = Object.assign({}, this.props.migration);
		migration[name] = value;
		this.props.updateMigration(migration)
	}

	handleSave(e) {
		e.preventDefault();
		console.log(extractSqlStatement(this.props, this.state));
		if (!this.props.validation.isValid && !this.state.showErrors) {
			this.setState({ showErrors : true });
		} else if (this.props.validation.isValid) {
			this.props.saveMigration(this.props.migration);
		}
	}

	renderMigrationEditor(props, state) {
		const { loading, showErrors, createTable } = this.state
		const { user, dataset, migration, validation } = this.props

		switch (state.type) {
			case "none":
				return undefined;
			case "createTable":
				return (
					<div className="migration createTable">
						<ValidInput label="New Table Name" name="name" value={createTable.name} onChange={this.handleChangeMigrationState.bind(this, "createTable")}/>
						<label>Columns:</label>
						<TableColumnEditor name="columns" columns={createTable.columns} onChange={this.handleChangeMigrationState.bind(this, "createTable")} />
					</div>
				);
			case "dropTable":
				return (
					<div className="migration dropTable">
						<div className="form-group">
							<label className="form-label">table to drop:</label>
							<select className="form-control">
								{dataset.schema.map((table,i) => {
									return <option key={i}>{table.name}</option>
								})}
							</select>
						</div>
					</div>
				);
			case "sql":
				return (
					<div>
						<ValidTextarea label="SQL" name="sql" value={migration.sql} showError={showErrors} error={validation.sql} onChange={this.handleChange} />
					</div>
				);
		}

		return <div className="migration"></div>
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
				<div className="container">
					<div className="col-sm-8 col-md-8 col-md-offset-2">
						<form className="newMigration">
							<h3>New Migration</h3>
							<ValidTextarea label="Description" name="description" value={migration.description} showError={showErrors} error={validation.description} onChange={this.handleChange} />
							<div className="form-group">
								<label>Migration Type</label>
								<select className="form-control" value={this.state.type} onChange={this.handleSetMigrationType}>
									<option value="none">none</option>
									<option value="createTable">create table</option>
									<option value="dropTable">drop table</option>
									<option value="sql">sql</option>
								</select>
							</div>
							{this.renderMigrationEditor(this.props, this.state)}
							<br />
							<button className="btn btn-large btn-primary" disabled={(!validation.isValid && showErrors || !this.state.type)} onClick={this.handleSave}>Create Migration</button>
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

	loadDatasetByAddress : PropTypes.func.isRequired,
	newMigration : PropTypes.func.isRequired,
	updateMigration : PropTypes.func.isRequired,
	saveMigration : PropTypes.func.isRequired,
}

NewMigration.defaultProps = {

}

function extractSqlStatement(props, state) {
	switch (state.type) {
		case "createTable":
			return createTableStatement(state);
		case "sql":
			return props.migration.statement;
	}
}

function createTableStatement(state) {
	const { createTable } = state;
	const columns = createTable.columns.map((col) => `${col.name} ${col.type}`).join(",")
	return `CREATE TABLE ${createTable.name} (${columns})`;
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
	loadDatasetByAddress,
	newMigration,
	updateMigration,
	saveMigration,
})(NewMigration)