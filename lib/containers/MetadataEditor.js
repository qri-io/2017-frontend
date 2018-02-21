import { connect } from 'react-redux'

import { newDataset, updateDataset, loadDataset, saveDataset, cancelDatasetEdit } from '../actions/dataset'
import { showModal, hideModal } from '../actions/app'

import { selectLocalDatasetByName, selectDatasetByName } from '../selectors/dataset'

import MetadataEditor from '../components/MetadataEditor'

const MetadataEditorContainer = connect(
  (state, ownProps) => {
    const { params } = ownProps.match
    const path = `${params.peername}/${params.name}`
    return Object.assign({
      path,
      datasetRef: selectDatasetByName(state, params.peername, params.name),
      localDatasetRef: selectLocalDatasetByName(state, params.peername, params.name),
      goBack: ownProps.history.goBack
    }, ownProps)
  }, {
    newDataset,
    loadDataset,
    updateDataset,
    saveDataset,
    cancelDatasetEdit,
    showModal,
    hideModal
  }
)(MetadataEditor, 'MetadataEditor')

export default MetadataEditorContainer
