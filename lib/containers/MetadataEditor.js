import { connect } from 'react-redux'

import { newDataset, updateDataset, loadDatasetByPath, saveMetaDataset, cancelDatasetEdit } from '../actions/dataset'
import { showModal, hideModal } from '../actions/app'

import { selectLocalDatasetByPath, selectDatasetByPath } from '../selectors/dataset'

import MetadataEditor from '../components/MetadataEditor'

const MetadataEditorContainer = connect(
  (state, ownProps) => {
    const { params } = ownProps.match
    const path = `/${params.network}/${params.hash}`
    return Object.assign({
      path,
      datasetRef: selectDatasetByPath(state, path),
      localDatasetRef: selectLocalDatasetByPath(state, path),
      goBack: ownProps.history.goBack
    }, ownProps)
  }, {
    newDataset,
    loadDatasetByPath,
    updateDataset,
    saveMetaDataset,
    cancelDatasetEdit,
    showModal,
    hideModal
  }
)(MetadataEditor, 'MetadataEditor')

export default MetadataEditorContainer
