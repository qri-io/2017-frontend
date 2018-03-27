import { connect } from 'react-redux'

import { push } from 'react-router-redux'
import { newDataset, updateDataset, loadDatasetByPath, saveMetaDataset, cancelDatasetEdit } from '../actions/dataset'
import { showModal, hideModal } from '../actions/app'

import { selectLocalDatasetByPath, selectDatasetByPath } from '../selectors/dataset'
import { selectSessionProfile } from '../selectors/session'

import MetadataEditor from '../components/MetadataEditor'

const MetadataEditorContainer = connect(
  (state, ownProps) => {
    const { params } = ownProps.match
    const path = `/${params.network}/${params.hash}`
    return Object.assign({
      path,
      sessionProfile: selectSessionProfile(state),
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
    hideModal,
    push
  }
)(MetadataEditor, 'MetadataEditor')

export default MetadataEditorContainer
