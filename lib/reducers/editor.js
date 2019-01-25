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
  EDITOR_SET_ROW_ORDER
} from '../constants/editor'

import cloneDeep from 'clone-deep'

const initialState = {
  dirty: false,
  name: '',
  dataset: {},
  vizScript: undefined,
  transformScript: undefined,
  body: undefined,
  colOrder: undefined,
  rowOrder: undefined,
  stringified: {
    schema: {
      string: ''
    }
  },
  bodyView: 'json'
}

// TODO - TESTS!
export default function editorReducer (state = initialState, action) {
  switch (action.type) {
    case EDITOR_INIT_DATASET:
      var stringified = {
        body: { string: '' },
        schema: { string: '' }
      }
      var schema = action.dataset && action.dataset.structure && action.dataset.structure.schema
      var body = action.body
      if (schema) {
        stringified.schema = {
          string: JSON.stringify(schema, null, 2)
        }
      }
      if (body) {
        body = JSON.stringify(action.body, null, 2)
      }
      return {
        dirty: false,
        name: action.name || '',
        dataset: action.dataset || {},
        vizScript: action.vizScript,
        transformScript: action.transformScript,
        bodyView: 'json',
        body: body,
        stringified
      }
    case EDITOR_SET_BODY_VIEW:
      return Object.assign({}, state, { bodyView: action.view })
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
      var dataset = state.dataset
      var body = cloneDeep(state.body)
      const prevFormat = state && state.dataset && state.dataset.structure && state.dataset.structure.format
      const currFormat = action.structure && action.structure.format
      if (prevFormat !== currFormat) {
        // if we are flipping back to csv, we need to make sure that the body
        // is not a string
        if (currFormat === 'csv' && typeof body === 'string') {
          body = JSON.parse(body)
        }
      }
      return Object.assign({}, state, {
        dirty: true,
        dataset: Object.assign({}, state.dataset, { structure: action.structure }),
        body
      })
    case EDITOR_SET_SCHEMA:
      var schemaString
      schema = {}
      dataset = state.dataset
      stringified = state.stringified

      // if schema is empty, clear it from the state tree
      if (!action.schema) {
        const structure = {}
        Object.keys(state.dataset.structure)
          .filter(key => key !== 'schema')
          .forEach(key => { structure[key] = state.dataset.structure[key] })
        dataset = Object.assign({}, state.dataset, { structure })
        stringified = Object.assign({}, state.stringified, {
          schema: {
            string: ''
          }
        })
        return Object.assign({}, state, {
          dirty: true,
          stringified,
          dataset
        })
      }

      if (action.schema.constructor === String) {
        schemaString = action.schema
        // if the schema is a string !== "":
        // otherwise, parse the schema string
        try {
          schema = JSON.parse(schemaString)
          const structure = Object.assign({}, state.dataset.structure, { schema })
          dataset = Object.assign({}, state.dataset, { structure })
        } catch (e) { }
      } else {
        // if the schema is an object and not a string, and we are adding it to the structure
        // we need to update schemaString to include the stringified schema
        schema = action.schema
        schemaString = JSON.stringify(schema, null, 2)
        const structure = Object.assign({}, state.dataset.structure, { schema })
        dataset = Object.assign({}, state.dataset, { structure })
      }
      stringified = Object.assign({}, state.stringified, {
        schema: {
          string: schemaString
        }
      })
      return Object.assign({}, state, {
        dirty: true,
        stringified,
        dataset
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
    case EDITOR_UPDATE_BODY:
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
      body = state.body
      if (action.section === 'body') {
        body = undefined
      }
      dataset = {}
      datasetSections.forEach(s => { dataset[s] = state.dataset[s] })
      return Object.assign({}, state, { dirty: true, dataset, body })
    case EDITOR_SET_COL_ORDER:
      return Object.assign({}, state, { dirty: true, colOrder: action.order })
    case EDITOR_SET_ROW_ORDER:
      return Object.assign({}, state, { dirty: true, rowOrder: action.order })
    default:
      return state
  }
}
