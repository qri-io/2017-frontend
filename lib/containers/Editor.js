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
  setColOrder,
  setBodyError
} from '../actions/editor'

import { selectDryRunDatasetById, extractColumnHeaders } from '../selectors/dataset'
import { selectSessionProfileId, selectSessionProfileHandle } from '../selectors/session'
import { selectLayoutMain } from '../selectors/layout'

import Editor from '../components/editor/Editor'

const EditorContainer = connect(
  (state, ownProps) => {
    const id = selectSessionProfileId(state)
    const profilePeername = selectSessionProfileHandle(state)

    const {
      name,
      dataset,
      transformScript,
      vizScript,
      body,
      bodyView,
      showHeaders,
      bodyError,
      colOrder,
      rowOrder
    } = state.editor

    return Object.assign({
      profilePeername,
      id,
      layout: selectLayoutMain(state),
      name,
      dataset,
      transformScript,
      vizScript,
      body,
      showHeaders,
      bodyError,
      bodyView,
      rowOrder,
      colOrder,
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
    setRowOrder,
    setColOrder,
    setBodyError,

    dryRunDataset,
    saveDataset,

    showModal
  }
)(Editor, 'Editor')

export default EditorContainer
