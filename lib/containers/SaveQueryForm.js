import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { hideModal } from '../actions/app'
import { saveQuery } from '../actions/query'
import { addDataset, loadDatasets } from '../actions/dataset'

import SaveQueryForm from '../components/form/SaveQueryForm'

const SaveQueryFormContainer = connect(
	(state, ownProps) => {
  return Object.assign({}, ownProps)
}, {
  loadDatasets,
  addDataset,
  hideModal,
  saveQuery
}
)(SaveQueryForm)

export default SaveQueryFormContainer
