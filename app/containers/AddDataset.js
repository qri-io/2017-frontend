import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { initDataset } from '../actions/dataset'

import AddDataset from '../components/AddDataset'

const AddDatasetContainer = connect(
	(state, ownProps) => {
	  return Object.assign({}, state.console, ownProps)
}, {
	  initDataset,
	  push
}
)(AddDataset)

export default AddDatasetContainer
