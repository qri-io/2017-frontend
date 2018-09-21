import { connect } from 'react-redux'

import { showModal } from '../actions/app'
import {
  newDataset,
  updateDataset,
  cancelDatasetEdit,
  initDataset,
  dryRunDataset
} from '../actions/dataset'
import { selectLocalDatasetByName, selectDryRunDatasetById } from '../selectors/dataset'
import { selectSessionProfileId } from '../selectors/session'

import Editor from '../components/editor/Editor'

const EditorContainer = connect(
  (state, ownProps) => {
    const id = selectSessionProfileId(state)
    return Object.assign({
      id,
      localDataset: selectLocalDatasetByName(state),
      // TODO - finish
      resultDataset: selectDryRunDatasetById(state, 'test')
    }, ownProps)
  }, {
    initDataset,
    dryRunDataset,
    newDataset,
    updateDataset,
    cancelDatasetEdit,
    showModal
  }
)(Editor, 'Editor')

export default EditorContainer

// if there is a search string, turn false only if loading is false or noDatasets is true
