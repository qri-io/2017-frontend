import {
  EDITOR_INIT_DATASET,
  EDITOR_SET_NAME,
  EDITOR_SET_COMMIT,
  EDITOR_SET_META,
  EDITOR_SET_STRUCTURE,
  EDITOR_SET_BODY,
  EDITOR_UPDATE_BODY,
  EDITOR_SET_VIZ,
  EDITOR_SET_VIZ_SCRIPT,
  EDITOR_SET_TRANSFORM,
  EDITOR_SET_TRANSFORM_SCRIPT,
  EDITOR_REMOVE_SECTION,
  EDITOR_SET_SCHEMA,
  EDITOR_SET_BODY_VIEW,
  EDITOR_SET_COL_ORDER,
  EDITOR_SET_ROW_ORDER,
  EDITOR_SET_BODY_ERROR
} from '../constants/editor'

import {
  generateMatchingSchemaAndBody
} from '../qri/generate'

import cloneDeep from 'clone-deep'

export const initialState = {
  dirty: false,
  name: '',
  dataset: {},
  vizScript: undefined,
  transformScript: undefined,
  body: undefined,
  colOrder: undefined,
  rowOrder: undefined,
  bodyView: 'json',
  bodyError: ''
}

// TODO - TESTS!
export default function editorReducer (state = initialState, action) {
  switch (action.type) {
    case EDITOR_INIT_DATASET:
      let bodyText = action.body
      if (action.body) {
        bodyText = JSON.stringify(action.body, null, 2)
      }
      return Object.assign({}, initialState, {
        name: action.name || '',
        dataset: action.dataset || {},
        body: bodyText,
        vizScript: action.vizScript,
        transformScript: action.transformScript
      })
    case EDITOR_SET_BODY_VIEW:
      var { body, columnHeaders, colOrder, rowOrder, dirty } = state
      var prevBody = body
      var dataset = state.dataset
      const check = generateMatchingSchemaAndBody(action.view, dataset.structure, prevBody, columnHeaders, colOrder, rowOrder)
      if (typeof check === 'string') {
        // if `check` is a string, then we have a problem switching to the other body view
        // assign the error
        return Object.assign({}, state, { bodyView: action.view, bodyError: check })
      }
      // Otherwise, we might have to update other parts of our statetree
      // to get the view to show correctly:
      if (check.body) {
        dirty = true
        body = check.body
      }
      if (check.schema) {
        dirty = true
        var structure = Object.assign({}, dataset.structure, { schema: check.schema })
        dataset = Object.assign({}, dataset, { structure })
      }
      if (check.colOrder) {
        dirty = true
        colOrder = check.colOrder
      }
      if (check.rowOrder) {
        dirty = true
        rowOrder = check.rowOrder
      }
      return Object.assign({}, state, {
        dirty,
        bodyView: action.view,
        bodyError: '',
        body,
        dataset,
        colOrder,
        rowOrder
      })
    case EDITOR_SET_NAME:
      return Object.assign({}, state, { dirty: true, name: action.name })
    case EDITOR_SET_COMMIT:
      return Object.assign({}, state, { dirty: true,
        dataset: Object.assign({}, state.dataset, { commit: action.commit })
      })
    case EDITOR_SET_META:
      return Object.assign({}, state, { dirty: true,
        dataset: Object.assign({}, state.dataset, { meta: action.meta })
      })
    case EDITOR_SET_STRUCTURE:
      return Object.assign({}, state, {
        dirty: true,
        dataset: Object.assign({}, state.dataset, { structure: action.structure })
      })
    case EDITOR_SET_SCHEMA:
      dataset = state.dataset
      structure = Object.assign({}, dataset.structure, { schema: action.schema })
      return Object.assign({}, state, {
        dirty: true,
        dataset: Object.assign({}, dataset, { structure })
      })
    case EDITOR_SET_TRANSFORM:
      return Object.assign({}, state, { dirty: true,
        dataset: Object.assign({}, state.dataset, { transform: action.transform })
      })
    case EDITOR_SET_VIZ:
      return Object.assign({}, state, { dirty: true,
        dataset: Object.assign({}, state.dataset, { viz: action.viz })
      })
    case EDITOR_SET_BODY:
      return Object.assign({}, state, { dirty: true, body: action.body })
    case EDITOR_SET_BODY_ERROR:
      return Object.assign({}, state, { dirty: true, error: action.error })
    case EDITOR_UPDATE_BODY:
      if (!state.body) {
        return Object.assign({}, state, { dirty: true, error: 'Attempting to make changes to an undefined body.' })
      }
      if (typeof state.body === 'string') {
        return Object.assign({}, state, { dirty: true, error: 'Body must be parsed and in table view in order to issue an update.' })
      }
      var newBody = cloneDeep(state.body)
      for (let [row, column, oldValue, newValue] of action.changes) { // eslint-disable-line no-unused-vars
        newBody[row][column] = newValue
      }
      return Object.assign({}, state, {
        dirty: true,
        body: newBody
      })
    case EDITOR_SET_VIZ_SCRIPT:
      return Object.assign({}, state, { dirty: true, vizScript: action.vizScript })
    case EDITOR_SET_TRANSFORM_SCRIPT:
      return Object.assign({}, state, { dirty: true, transformScript: action.transformScript })
    case EDITOR_REMOVE_SECTION:
      const datasetSections = Object.keys(state.dataset).filter(s => {
        if (action.section === 'body') {
          return s !== action.section && s !== 'bodyBytes' && s !== 'bodyPath'
        }
        return s !== action.section
      })
      dataset = {}
      datasetSections.forEach(s => { dataset[s] = state.dataset[s] })
      body = state.body
      var bodyView = state.bodyView
      if (action.section === 'body') {
        // if we are resetting body
        // we need to reset the colOrder, rowOrder, and bodyView
        body = undefined
        colOrder = undefined
        rowOrder = undefined
        bodyView = 'json'
      }
      return Object.assign({}, state, { dirty: true, dataset, body, colOrder, rowOrder, bodyView })
    case EDITOR_SET_COL_ORDER:
      return Object.assign({}, state, { dirty: true, colOrder: action.order })
    case EDITOR_SET_ROW_ORDER:
      return Object.assign({}, state, { dirty: true, rowOrder: action.order })
    default:
      return state
  }
}
