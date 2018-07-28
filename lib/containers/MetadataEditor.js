import { connect } from 'react-redux'

import { push } from 'react-router-redux'
import { loadDatasets, newDataset, updateDataset, loadDatasetByPath, saveDataset, cancelDatasetEdit } from '../actions/dataset'
import { showModal, hideModal, clearPaginationIds } from '../actions/app'

import { selectLocalDatasetByPath, selectDatasetByPath } from '../selectors/dataset'
import { selectSessionProfileId } from '../selectors/session'

import MetadataEditor from '../components/MetadataEditor'

const MetadataEditorContainer = connect(
  (state, ownProps) => {
    const { params } = ownProps.match
    const path = `/${params.network}/${params.hash}`
    return Object.assign({
      path,
      peername: params.peername,
      name: params.name,
      sessionProfile: selectSessionProfileId(state),
      datasetRef: selectDatasetByPath(state, path),
      localDatasetRef: selectLocalDatasetByPath(state, path),
      goBack: ownProps.history.goBack
    }, ownProps)
  }, {
    newDataset,
    loadDatasetByPath,
    updateDataset,
    saveDataset,
    cancelDatasetEdit,
    showModal,
    hideModal,
    loadDatasets,
    push,
    clearPaginationIds
  }
)(MetadataEditor, 'MetadataEditor')

export default MetadataEditorContainer
