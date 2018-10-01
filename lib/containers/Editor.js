import { connect } from 'react-redux'

import { showModal } from '../actions/app'
import {
  dryRunDataset,
  newDataset,
  saveDataset
} from '../actions/dataset'

import {
  initDataset,
  setName,
  setCommit,
  setMeta,
  setStructure,
  setTransform,
  setViz,
  setTransformScript,
  setVizScript,
  setBody
} from '../actions/editor'
import { selectDryRunDatasetById } from '../selectors/dataset'
import { selectSessionProfileId, selectSessionProfileName } from '../selectors/session'

import Editor from '../components/editor/Editor'

const EditorContainer = connect(
  (state, ownProps) => {
    const id = selectSessionProfileId(state)
    const profilePeername = selectSessionProfileName(state)

    const { name, dataset, transformScript, vizScript, body } = state.editor

    return Object.assign({
      profilePeername,
      id,

      name,
      dataset,
      transformScript,
      vizScript,
      body,

      // localDataset: selectLocalDatasetByPath(state, 'new'),
      // TODO - finish
      resultDataset: selectDryRunDatasetById(state, 'test')
    }, ownProps)
  }, {

    initDataset,
    setName,
    setCommit,
    setMeta,
    setStructure,
    setTransform,
    setViz,
    setTransformScript,
    setVizScript,
    setBody,

    dryRunDataset,
    newDataset,
    saveDataset,

    showModal
  }
)(Editor, 'Editor')

export default EditorContainer
