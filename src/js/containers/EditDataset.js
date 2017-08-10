import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import { loadDatasetByAddress, editDataset, updateDataset, saveDataset, deleteDataset } from '../actions/dataset'
import { selectSessionUser } from '../selectors/session'
import { selectLocalDatasetByAddress } from '../selectors/dataset'
import validateDataset from '../validators/dataset'

import Spinner from '../components/Spinner'
import SessionRequired from '../components/SessionRequired'
import EditAddress from '../components/EditAddress'
import ValidInput from '../components/form/ValidInput'

import ValidTextarea from '../components/form/ValidTextarea'


class EditDataset extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showErrors : false,
			loading : !props.dataset
		};

		[ 
			"handleChange", 
			"handleSave", 
			"handleDelete" 
		].forEach(m => this[m] = this[m].bind(this));
	}

	componentWillMount() {
		this.props.editDataset(this.props.address);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.address != this.props.address) {
			this.props.editDataset(nextProps.address);
			this.setState({ showErrors: false, loading : !nextProps.dataset });
		} else if (nextProps.dataset && this.state.loading) {
			this.setState({ loading : false });
		}
	}

	handleChange(name, value, e) {
		const dataset = Object.assign({}, this.props.dataset)
		dataset[name] = value;
		this.props.updateDataset(dataset);
	}

	handleDelete() {
		if (confirm("Are you sure you want to delete this dataset?")) {
			this.props.deleteDataset(this.props.dataset.id, "/console");
		}
	}

	handleSave(e) {
		const { dataset, validation, saveDataset } = this.props;
		
		e.preventDefault();

		if (!validation.isValid) {
			if (!this.state.showErrors) {
				this.setState({ showErrors : true });
			}
		} else {
			saveDataset(dataset)
		}
	}

	render() {
		const { showErrors, loading } = this.state;
		const { user, dataset, validation } = this.props;

		if (loading) {
			return (
				<div className="editDataset">
					<Spinner />
				</div>
			)
		}

		if (!user) {
			return (
				<div className="editDataset">
					<SessionRequired />
				</div>
			);
		}

		if (!dataset) {
			// todo - should return some sort of not found error in this case
			return (
				<div>
					<h3>uh.... no dataset?</h3>
				</div>
			);
		}

		return (
			<div id="wrapper">
				<div className="editDataset container">
					<div className="col-md-8 col-md-offset-2">
						<h3>Edit Dataset</h3>
						<form className="editDataset">
							<EditAddress label="Address" value={dataset.address} showError={showErrors} error={validation.address} onChange={this.handleChange} />
							<ValidInput label="Name" name="name" value={dataset.name} showError={showErrors} error={validation.name} onChange={this.handleChange}  />
							<ValidInput label="External Url" name="source_url" value={dataset.source_url} showError={showErrors} error={validation.source_url} onChange={this.handleChange}  />
							<ValidTextarea label="Summary" name="summar" value={dataset.summary} showError={showErrors} error={validation.summary} onChange={this.handleChange} />
							<ValidTextarea label="Description" name="description" value={dataset.description} showError={showErrors} error={validation.description} onChange={this.handleChange} />
							<button className="btn btn-large submit" disabled={(!validation.isValid && showErrors)} onClick={this.handleSave}>Save Dataset</button>
						</form>
						<button className="btn btn-large submit" onClick={this.handleDelete}>Delete</button>
					</div>
				</div>
			</div>
		);
	}
}

EditDataset.propTypes = {
	// address of the dataset to edit. should be derived from url params
	address : PropTypes.string.isRequired,
	// any general error message (not found, no permission, etc.)
	error : PropTypes.string,

	// session user model
	user : PropTypes.object,
	// dataset model to edit. should be a local model
	dataset : PropTypes.object,
	// validation logic for the dataset model fields
	validation : PropTypes.object,

	loadDatasetByAddress : PropTypes.func.isRequired,
	editDataset : PropTypes.func.isRequired,
	updateDataset: PropTypes.func.isRequired,
	saveDataset: PropTypes.func.isRequired,
	deleteDataset: PropTypes.func.isRequired,
}

EditDataset.defaultProps = {
	
}

function mapStateToProps(state, ownProps) {
	const address = [ownProps.params.user, ownProps.params.dataset].join(".");
	const dataset = selectLocalDatasetByAddress(state, address);

	return Object.assign({
		address,
		dataset,
		user : selectSessionUser(state),
		validation : validateDataset(dataset),
	}, ownProps);
}

export default connect(mapStateToProps, {
	loadDatasetByAddress,
	editDataset,
	updateDataset,
	saveDataset,
	deleteDataset,
})(EditDataset);