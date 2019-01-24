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
  EDITOR_SET_BODY_VIEW
} from '../constants/editor'

import cloneDeep from 'clone-deep'

const initialState = {
  dirty: false,
  name: '',
  dataset: {},
  vizScript: undefined,
  transformScript: undefined,
  body: undefined,
  stringified: {
    schema: {
      string: '',
      parsable: true
    },
    body: {
      string: '',
      parsable: true
    }
  },
  bodyView: 'json'
}

// TODO - TESTS!
export default function editorReducer (state = initialState, action) {
  switch (action.type) {
    case EDITOR_INIT_DATASET:
      var stringified = {
        body: { string: '', parsable: true },
        schema: { string: '', parsable: true }
      }
      var schema = action.dataset && action.dataset.structure && action.dataset.structure.schema
      if (schema) {
        stringified.schema = {
          string: JSON.stringify(schema, null, 2),
          parsable: true
        }
      }
      if (action.body) {
        stringified.body = {
          string: JSON.stringify(action.body, null, 2),
          parsable: true
        }
      }
      return {
        dirty: false,
        name: action.name || '',
        dataset: action.dataset || {},
        vizScript: action.vizScript,
        transformScript: action.transformScript,
        body: action.body,
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
      var parsable = false
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
            string: '',
            parsable: true
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
        // if it can be parsed, set parsable to true
        // add the parsedSchema to dataset.structure
        try {
          schema = JSON.parse(schemaString)
          parsable = true
          const structure = Object.assign({}, state.dataset.structure, { schema })
          dataset = Object.assign({}, state.dataset, { structure })
        } catch (e) { }
      } else {
        // if the schema is an object and not a string, and we are adding it to the structure
        // we need to update schemaString to include the stringified schema and set parsable to true
        schema = action.schema
        schemaString = JSON.stringify(schema, null, 2)
        parsable = true
        const structure = Object.assign({}, state.dataset.structure, { schema })
        dataset = Object.assign({}, state.dataset, { structure })
      }
      stringified = Object.assign({}, state.stringified, {
        schema: {
          string: schemaString,
          parsable
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
      var bodyParsed = state.body
      var bodyString
      parsable = false
      stringified = ''
      if (!action.body) {
        stringified = Object.assign({}, state.stringified, {
          body: {
            string: '',
            parsable: true
          }
        })
        return Object.assign({}, state, {
          dirty: true,
          stringified,
          body: ''
        })
      }
      if (action.body.constructor === String) {
        bodyString = action.body
        try {
          bodyParsed = JSON.parse(bodyString)
          parsable = true
        } catch (e) { console.log(e) }
      } else {
        bodyParsed = action.body
        bodyString = JSON.stringify(bodyParsed, null, 2)
        parsable = true
      }
      stringified = Object.assign({}, state.stringified, {
        body: {
          string: bodyString,
          parsable
        }
      })
      return Object.assign({}, state, {
        dirty: true,
        body: bodyParsed,
        stringified
      })
    case EDITOR_UPDATE_BODY:
      var newBody = cloneDeep(state.body)
      for (let [row, column, oldValue, newValue] of action.changes) { // eslint-disable-line no-unused-vars
        newBody[row][column] = newValue
      }
      bodyString = JSON.stringify(newBody, null, 2)
      stringified = Object.assign({}, state.stringified, {
        body: {
          string: bodyString,
          parsable: true
        }
      })
      return Object.assign({}, state, {
        dirty: true,
        body: newBody,
        stringified
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
    default:
      return state
  }
}
