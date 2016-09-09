import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { editChange, updateChange, saveChange, deleteChange } from '../actions/change'
import { loadDatasetByAddress } from '../actions/dataset'
import { selectDatasetByAddress } from '../selectors/dataset'
import { selectSessionUser } from '../selectors/session'
import { selectLocalChangeByNumber } from '../selectors/change'
import validateChange from '../validators/change'

import Spinner from '../components/Spinner'
import SessionRequired from '../components/SessionRequired'
import EditAddress from '../components/EditAddress'
import ValidInput from '../components/ValidInput'
import ValidTextarea from '../components/ValidTextarea'
import SelectSchemaTable from '../components/SelectSchemaTable'

export default class EditChange extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showErrors : false,
			loading : !props.change
		};

		[ "handleChange", "handleSave", "handleDelete" ].forEach(m => this[m] = this[m].bind(this));
	}

	componentWillMount() {
		this.props.loadDatasetByAddress(this.props.address);
		this.props.editChange(this.props.address, this.props.number);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.address != this.props.address || nextProps.number != this.props.number) {
			this.props.loadDatasetByAddress(this.props.address);
			this.props.editChange(nextProps.address, nextProps.number);
			this.setState({ showErrors: false, loading : !nextProps.change });
		} else if (nextProps.change && this.state.loading) {
			this.setState({ loading : false });
		}
	}

	handleChange(name, value, e) {
		const change = Object.assign({}, this.props.change)
		change[name] = value;
		this.props.updateChange(change);
	}


	handleSave(e) {
		const { change, validation, saveChange } = this.props;
		
		e.preventDefault();

		if (!validation.isValid) {
			if (!this.state.showErrors) {
				this.setState({ showErrors : true });
			}
		} else {
			saveChange(change)
		}
	}

	handleDelete() {
		if (confirm("Are you sure you want to delete this change?")) {
			this.props.deleteChange(this.props.change.id, "/console");
		}
	}

	render() {
		const { showErrors, loading } = this.state;
		const { user, change, dataset, validation } = this.props;

		if (loading) {
			return (
				<div className="editChange">
					<Spinner />
				</div>
			)
		}

		if (!user) {
			return (
				<div className="editChange">
					<SessionRequired />
				</div>
			);
		}

		if (!change) {
			// todo - should return some sort of not found error in this case
			return (
				<div>
					<h3>uh.... no change?</h3>
				</div>
			);
		}

		return (
			<div className="editChange">
				<form className="editChange">
					<h3>Edit Change</h3>
					<label>Type:</label>
					<select onChange={(e) => { this.handleChange("type", e.target.value, e) }}>
						<option value="">-Choose Type-</option>
						<option>INSERT</option>
						<option>MODIFY</option>
						<option>DELETE</option>
					</select>
					<SelectSchemaTable label="Table" name="table_name" value={change.table_name} schema={dataset.schema || []} onChange={this.handleChange} />
					<ValidTextarea label="Description" name="description" value={change.description} showError={showErrors} error={validation.description} onChange={this.handleChange} />
					<ValidTextarea label="CSV Data" name="data" value={change.data} showError={showErrors} error={validation.description} onChange={this.handleChange} />
					<button className="btn btn-large submit" disabled={(!validation.isValid && showErrors)} onClick={this.handleSave}>Save Change</button>
				</form>
				<button className="btn btn-large submit" onClick={this.handleDelete}>Delete</button>
			</div>
		);
	}
}

EditChange.propTypes = {
	// address of the change to edit. should be derived from url params
	address : PropTypes.string.isRequired,
	// change number from url string
	number : PropTypes.string.isRequired,
	// any general error message (not found, no permission, etc.)
	error : PropTypes.string,

	// session user model
	user : PropTypes.object,
	// dataset model, need this to read schemas
	dataset : PropTypes.object,
	// change model to edit. should be a local model
	change : PropTypes.object,
	// validation logic for the change model fields
	validation : PropTypes.object,

	loadDatasetByAddress : PropTypes.func.isRequired,
	editChange : PropTypes.func.isRequired,
	updateChange: PropTypes.func.isRequired,
	saveChange: PropTypes.func.isRequired,
	deleteChange: PropTypes.func.isRequired,
}

EditChange.defaultProps = {
	
}

function mapStateToProps(state, ownProps) {
	const address = [ownProps.params.user, ownProps.params.dataset].join(".");
	let change = selectLocalChangeByNumber(state, address, ownProps.params.number);

	if (change && Array.isArray(change.data)) {
		data = change.data.reduce((a,b) => {
			return a + b.join(",") + "\n"
		}, "");
		console.log(data)
		change = Object.assign({}, change, { data })
	}

	return Object.assign({
		address,
		number : ownProps.params.number,

		dataset : selectDatasetByAddress(state, address),
		user : selectSessionUser(state),
		change,
		validation : validateChange(change),
	}, ownProps);
}

export default connect(mapStateToProps, {
	loadDatasetByAddress,

	editChange,
	updateChange,
	saveChange,
	deleteChange,
})(EditChange);