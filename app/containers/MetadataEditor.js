import { connect } from 'react-redux'

// import { createHashHistory } from 'history'

import { newDataset, updateDataset, loadDataset, saveDataset, cancelDatasetEdit } from '../actions/dataset'
import { hideModal } from '../actions/app'

import { selectLocalDatasetById, selectDataset } from '../selectors/dataset'

import MetadataEditor from '../components/MetadataEditor'

const MetadataEditorContainer = connect(
  (state, ownProps) => {
    const path = `/ipfs/${ownProps.match.params.id}/dataset.json`
    console.log('in metadataeditor container')
    console.log(ownProps)
    // const history = createHashHistory()
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
    hideModal
  }
)(MetadataEditor, 'MetadataEditor')

export default MetadataEditorContainer
