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
  EDITOR_REMOVE_SECTION
} from '../constants/editor'

import cloneDeep from 'clone-deep'

const initialState = {
  dirty: false,
  name: '',
  dataset: {},
  vizScript: undefined,
  transformScript: undefined,
  body: undefined
}

// TODO - TESTS!
export default function editorReducer (state = initialState, action) {
  switch (action.type) {
    case EDITOR_INIT_DATASET:
      return {
        dirty: false,
        name: action.name || '',
        dataset: action.dataset || {},
        vizScript: action.vizScript,
        transformScript: action.transformScript,
        body: action.body
      }

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
      return Object.assign({}, state, { dirty: true, body: newBody })
    case EDITOR_SET_VIZ_SCRIPT:
      return Object.assign({}, state, { dirty: true, vizScript: action.vizScript })
    case EDITOR_SET_TRANSFORM_SCRIPT:
      return Object.assign({}, state, { dirty: true, transformScript: action.transformScript })
    case EDITOR_REMOVE_SECTION:
      const datasetSections = Object.keys(state.dataset).filter(s => s !== action.section)
      dataset = {}
      datasetSections.forEach(s => { dataset[s] = state.dataset[s] })
      return Object.assign({}, state, { dirty: true, dataset: dataset })
    default:
      return state
  }
}
