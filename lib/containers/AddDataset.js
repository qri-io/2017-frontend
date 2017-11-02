import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { initDataset, loadDatasets } from '../actions/dataset'

import AddDataset from '../components/AddDataset'

const AddDatasetContainer = connect(
	(state, ownProps) => {
	  return Object.assign({}, state.console, ownProps)
}, {
	  initDataset,
	  loadDatasets,
	  push
}
)(AddDataset)

export default AddDatasetContainer
