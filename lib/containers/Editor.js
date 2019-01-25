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
  setBodyView,
  setRowOrder,
  setColOrder
} from '../actions/editor'

import { selectDryRunDatasetById, extractColumnHeaders } from '../selectors/dataset'
import { selectSessionProfileId, selectSessionProfileHandle } from '../selectors/session'
import {
  selectSchemaString,
  selectBodyView,
  selectBodyString,
  selectRowOrder,
  selectColOrder
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
      schemaString: selectSchemaString(state),
      bodyView: selectBodyView(state),
      bodyString: selectBodyString(state),
      columnHeaders: extractColumnHeaders({ dataset }),
      rowOrder: selectRowOrder(state),
      colOrder: selectColOrder(state),

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
    setRowOrder,
    setColOrder,

    dryRunDataset,
    saveDataset,

    showModal
  }
)(Editor, 'Editor')

export default EditorContainer
