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
  removeSection,
  setSchema,
  setBodyView
} from '../actions/editor'

import { selectDryRunDatasetById, extractColumnHeaders } from '../selectors/dataset'
import { selectSessionProfileId, selectSessionProfileHandle } from '../selectors/session'
import {
  selectDatasetValid,
  selectSchemaString,
  selectBodyView,
  selectBodyString,
  selectBodyParsable
} from '../selectors/editor'

import Editor from '../components/editor/Editor'

const EditorContainer = connect(
  (state, ownProps) => {
    const id = selectSessionProfileId(state)
    const profilePeername = selectSessionProfileHandle(state)

    const { name, dataset, transformScript, vizScript, body, showHeaders } = state.editor
    return Object.assign({
      profilePeername,
      id,

      name,
      dataset,
      transformScript,
      vizScript,
      body,
      showHeaders,
      bodyParsable: selectBodyParsable(state),
      schemaString: selectSchemaString(state),
      valid: selectDatasetValid(state),
      bodyView: selectBodyView(state),
      bodyString: selectBodyString(state),
      columnHeaders: extractColumnHeaders({ dataset }),

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
    setSchema,
    setBodyView,

    dryRunDataset,
    saveDataset,

    showModal
  }
)(Editor, 'Editor')

export default EditorContainer
