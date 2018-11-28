import { connect } from 'react-redux'

import { showModal } from '../actions/app'
import {
  dryRunDataset,
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
  setBody,
  updateBody,
  removeSection
} from '../actions/editor'
import { selectDryRunDatasetById } from '../selectors/dataset'
import { selectSessionProfileId, selectSessionProfileHandle } from '../selectors/session'

import Editor from '../components/editor/Editor'

const EditorContainer = connect(
  (state, ownProps) => {
    const id = selectSessionProfileId(state)
    const profilePeername = selectSessionProfileHandle(state)

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
    updateBody,
    removeSection,

    dryRunDataset,
    saveDataset,

    showModal
  }
)(Editor, 'Editor')

export default EditorContainer
