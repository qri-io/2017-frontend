import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { loadDatasetByAddress, editDataset, updateDataset, saveDataset, deleteDataset } from '../actions/dataset'

import { selectSessionUser } from '../selectors/session'

import SessionRequired from '../components/SessionRequired'
import ValidInput from '../components/ValidInput'
import ValidTextarea from '../components/ValidTextarea'

export default class EditDataset extends React.Component {
	componentWillMount() {
		this.props.editDataset(this.props.address);
	}

	render() {
		return (
			<div className="editDataset">
				<h3>Edit Dataset</h3>
			</div>
		);
	}
}

EditDataset.propTypes = {
	address : PropTypes.string.isRequired,

	user : PropTypes.object,
	dataset : PropTypes.object,

	loadDatasetByAddress : PropTypes.func.isRequired,
	editDataset : PropTypes.func.isRequired,
	updateDataset: PropTypes.func.isRequired,
	saveDataset: PropTypes.func.isRequired,
	deleteDataset: PropTypes.func.isRequired,
}

EditDataset.defaultProps = {
	
}

function mapStateToProps(state, ownProps) {
	const address = [ownProps.params.user, ownProps.params.dataset].join(".")
	return Object.assign({
		address,
		user : selectSessionUser(state),
		dataset : selectDatasetByAddress(state, address),
	}, ownProps);
}

export default connect(mapStateToProps, {
	loadDatasetByAddress,
	editDataset,
	updateDataset,
	saveDataset,
	deleteDataset,
})(EditDataset);