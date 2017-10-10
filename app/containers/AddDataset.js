import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { initDataset } from '../actions/dataset'

import AddDataset from '../components/AddDataset'

function mapStateToProps (state, ownProps) {
  return Object.assign({}, state.console, ownProps)
}

const AddDatasetContainer = connect(mapStateToProps, {
  initDataset,
  push
})(AddDataset)

export default AddDatasetContainer
