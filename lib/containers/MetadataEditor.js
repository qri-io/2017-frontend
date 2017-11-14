import { connect } from 'react-redux'

import { newDataset, updateDataset, loadDataset, saveDataset, cancelDatasetEdit } from '../actions/dataset'
import { showModal, hideModal } from '../actions/app'

import { selectLocalDatasetById, selectDataset } from '../selectors/dataset'

import MetadataEditor from '../components/MetadataEditor'

const MetadataEditorContainer = connect(
  (state, ownProps) => {
    const path = `/ipfs/${ownProps.match.params.id}/dataset.json`
    return Object.assign({
      path,
      datasetRef: selectDataset(state, path),
      localDatasetRef: selectLocalDatasetById(state, path),
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
