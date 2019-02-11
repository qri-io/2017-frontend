/* global describe, it, expect */
import { Reducer } from 'redux-testkit'
import EditorReducer, { initialState } from '../editor'
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
} from '../../constants/editor'

import { generateMatchingSchemaAndBody } from '../../qri/generate'

function assignSchemaToDataset (dataset, schema) {
  if (!dataset) {
    return { structure: schema }
  }
  return Object.assign({}, dataset, { structure: Object.assign({}, dataset.structure, { schema }) })
}

describe('Editor Reducer', () => {
  var testBody = [[1, 2, 3]]
  var testBodyString = JSON.stringify(testBody, null, 2)

  var state = Object.assign({}, initialState, {
    dirty: true,
    name: 'test name',
    body: testBodyString,
    dataset: {
      commit: { id: '1', title: 'title', message: 'message' },
      meta: { title: 'dataset title', description: 'woo description' },
      structure: { format: 'json' },
      transform: 'yay transform',
      viz: 'yay viz'
    },
    transformScript: 'yay transformScript',
    vizScript: 'yay vizScript'
  })

  const gen = generateMatchingSchemaAndBody('table', undefined, state.body, undefined, undefined, undefined)
  const dataset = assignSchemaToDataset(state.dataset, gen.schema)
  var parsedState = Object.assign({}, state, { colOrder: gen.colOrder, rowOrder: gen.rowOrder, body: gen.body, dataset, bodyView: 'table' })

  it('should have an initialState (@@INIT)', () => {
    expect(EditorReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle EDITOR_INIT_DATASET with no body on an initial state', () => {
    const action = {
      type: EDITOR_INIT_DATASET
    }
    Reducer(EditorReducer).expect(action).toReturnState(initialState)
  })

  it('should handle EDITOR_INIT_DATASET with a body on an initial state', () => {
    const action = {
      type: EDITOR_INIT_DATASET,
      body: testBody
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { body: testBodyString }))
  })

  it('should handle EDITOR_INIT_DATASET with no body on an existing state', () => {
    const action = {
      type: EDITOR_INIT_DATASET
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(initialState)
  })

  it('should handle EDITOR_INIT_DATASET with body on an existing state', () => {
    const action = {
      type: EDITOR_INIT_DATASET,
      body: testBody
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, initialState, { body: testBodyString }))
  })

  it('should handle EDITOR_SET_BODY_VIEW on an initial state', () => {
    const action = {
      type: EDITOR_SET_BODY_VIEW,
      view: 'table'
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { bodyView: 'table', bodyError: 'Table view is reserved for two dimentional data, the top level body must be an array.' }))
  })

  it('should handle EDITOR_SET_BODY_VIEW to table on an existing state with an unparsed but valid 2D body', () => {
    const action = {
      type: EDITOR_SET_BODY_VIEW,
      view: 'table'
    }
    const gen = generateMatchingSchemaAndBody('table', undefined, state.body, undefined, undefined, undefined)
    const dataset = assignSchemaToDataset(state.dataset, gen.schema)
    const returnState = Object.assign({}, state, { colOrder: gen.colOrder, rowOrder: gen.rowOrder, body: gen.body, dataset, bodyView: 'table' })
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(returnState)
  })

  it('should handle EDITOR_SET_BODY_VIEW to json on an existing state with an parsed body', () => {
    const action = {
      type: EDITOR_SET_BODY_VIEW,
      view: 'json'
    }
    const returnState = Object.assign({}, parsedState, { body: testBodyString, bodyView: 'json' })
    Reducer(EditorReducer).withState(parsedState).expect(action).toReturnState(returnState)
  })

  it('should handle EDITOR_SET_BODY_VIEW to table on an existing state with an unparsed but UNVALID body', () => {
    const action = {
      type: EDITOR_SET_BODY_VIEW,
      view: 'table'
    }
    const invalidBodyState = Object.assign({}, state, { body: 'invalid' })
    const error = generateMatchingSchemaAndBody('table', undefined, invalidBodyState.body, undefined, undefined, undefined)
    const returnState = Object.assign({}, invalidBodyState, { bodyView: 'table', bodyError: error })
    Reducer(EditorReducer).withState(invalidBodyState).expect(action).toReturnState(returnState)
  })

  it('should handle EDITOR_SET_NAME on an initial state', () => {
    var name = 'test'
    const action = {
      type: EDITOR_SET_NAME,
      name: name
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, name }))
  })

  it('should handle EDITOR_SET_NAME on an existing state', () => {
    var name = 'test'
    const action = {
      type: EDITOR_SET_NAME,
      name: name
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, name }))
  })

  it('should handle EDITOR_SET_COMMIT on an initial state', () => {
    var commit = { id: 'yay', title: 'commit title', message: 'commit message' }
    const action = {
      type: EDITOR_SET_COMMIT,
      commit
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, dataset: Object.assign({}, initialState.dataset, { commit }) }))
  })

  it('should handle EDITOR_SET_COMMIT on an existing state', () => {
    var commit = { id: 'yay', title: 'commit title', message: 'commit message' }
    const action = {
      type: EDITOR_SET_COMMIT,
      commit
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, dataset: Object.assign({}, state.dataset, { commit }) }))
  })

  it('should handle EDITOR_SET_META on an initial state', () => {
    var meta = { title: 'new meta' }
    const action = {
      type: EDITOR_SET_META,
      meta
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, dataset: Object.assign({}, initialState.dataset, { meta }) }))
  })

  it('should handle EDITOR_SET_META on an existing state', () => {
    var meta = { title: 'new meta' }
    const action = {
      type: EDITOR_SET_META,
      meta
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, dataset: Object.assign({}, state.dataset, { meta }) }))
  })

  it('should handle EDITOR_SET_STRUCTURE on an initial state', () => {
    var structure = { format: 'csv' }
    const action = {
      type: EDITOR_SET_STRUCTURE,
      structure
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, dataset: Object.assign({}, initialState.dataset, { structure }) }))
  })

  it('should handle EDITOR_SET_STRUCTURE on an existing state, staying as json', () => {
    var structure = { format: 'csv' }
    const action = {
      type: EDITOR_SET_STRUCTURE,
      structure
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, dataset: Object.assign({}, state.dataset, { structure }) }))
  })

  it('should handle EDITOR_SET_SCHEMA on an initial state', () => {
    var schema = { type: 'array' }
    const action = {
      type: EDITOR_SET_SCHEMA,
      schema
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, dataset: assignSchemaToDataset(initialState.dataset, schema) }))
  })

  it('should handle EDITOR_SET_SCHEMA on an existing state', () => {
    var schema = { type: 'array' }
    const action = {
      type: EDITOR_SET_SCHEMA,
      schema
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, dataset: assignSchemaToDataset(state.dataset, schema) }))
  })

  it('should handle EDITOR_SET_TRANSFORM on an initial state', () => {
    var transform = { config: { url: 'http://www.yay.com' } }
    const action = {
      type: EDITOR_SET_TRANSFORM,
      transform
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, dataset: Object.assign({}, initialState.dataset, { transform }) }))
  })

  it('should handle EDITOR_SET_TRANSFORM on an existing state', () => {
    var transform = { config: { url: 'http://www.yay.com' } }
    const action = {
      type: EDITOR_SET_TRANSFORM,
      transform
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, dataset: Object.assign({}, state.dataset, { transform }) }))
  })

  it('should handle EDITOR_SET_VIZ on an initial state', () => {
    var viz = { format: 'html' }
    const action = {
      type: EDITOR_SET_VIZ,
      viz
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, dataset: Object.assign({}, initialState.dataset, { viz }) }))
  })

  it('should handle EDITOR_SET_VIZ on an existing state', () => {
    var viz = { format: 'html' }
    const action = {
      type: EDITOR_SET_VIZ,
      viz
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, dataset: Object.assign({}, state.dataset, { viz }) }))
  })

  it('should handle EDITOR_SET_BODY on an initial state', () => {
    var body = [ { first: 1 }, { second: 2 } ]
    const action = {
      type: EDITOR_SET_BODY,
      body
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, body }))
  })

  it('should handle EDITOR_SET_BODY on an existing state', () => {
    var body = [ { first: 1 }, { second: 2 } ]
    const action = {
      type: EDITOR_SET_BODY,
      body
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, body }))
  })

  it('should handle EDITOR_SET_BODY_ERROR on an initial state', () => {
    var error = 'there was an error setting the body'
    const action = {
      type: EDITOR_SET_BODY_ERROR,
      error
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, error }))
  })

  it('should handle EDITOR_SET_BODY_ERROR on an existing state', () => {
    var error = 'there was an error setting the body'
    const action = {
      type: EDITOR_SET_BODY_ERROR,
      error
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, error }))
  })

  it('should handle EDITOR_UPDATE_BODY on an initial state', () => {
    var changes = [[0, 0, 1, 10]]
    const action = {
      type: EDITOR_UPDATE_BODY,
      changes
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, error: 'Attempting to make changes to an undefined body.' }))
  })

  it('should handle EDITOR_UPDATE_BODY on an existing state, where body is a string', () => {
    var changes = [[0, 0, 1, 10]]
    const action = {
      type: EDITOR_UPDATE_BODY,
      changes
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, error: 'Body must be parsed and in table view in order to issue an update.' }))
  })

  it('should handle EDITOR_UPDATE_BODY on an existing state, where body is a 2D array', () => {
    var changes = [[0, 0, 1, 10]]
    const action = {
      type: EDITOR_UPDATE_BODY,
      changes
    }
    const returnState = Object.assign({}, parsedState, { body: [[10, 2, 3]] })
    Reducer(EditorReducer).withState(parsedState).expect(action).toReturnState(returnState)
  })

  it('should handle EDITOR_SET_VIZ_SCRIPT on an initial state', () => {
    var vizScript = '<html><body>hi!</body></html>'
    const action = {
      type: EDITOR_SET_VIZ_SCRIPT,
      vizScript
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, vizScript }))
  })

  it('should handle EDITOR_SET_VIZ_SCRIPT on an existing state', () => {
    var vizScript = '<html><body>hi!</body></html>'
    const action = {
      type: EDITOR_SET_VIZ_SCRIPT,
      vizScript
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, vizScript }))
  })

  it('should handle EDITOR_SET_TRANSFORM_SCRIPT on an initial state', () => {
    var transformScript = 'def transform(ds, ctx):\n\tds.set_body([[1, 2, 3, 4]])'
    const action = {
      type: EDITOR_SET_TRANSFORM_SCRIPT,
      transformScript
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, transformScript }))
  })

  it('should handle EDITOR_SET_TRANSFORM_SCRIPT on an existing state', () => {
    var transformScript = 'def transform(ds, ctx):\n\tds.set_body([[1, 2, 3, 4]])'
    const action = {
      type: EDITOR_SET_TRANSFORM_SCRIPT,
      transformScript
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, transformScript }))
  })

  // EDITOR_REMOVE_SECTION
  // should this be refactored to handle removing also the vizScript and vizTransform?
  // remove: structure, transform, viz, commit, meta, body
  it('should handle EDITOR_REMOVE_SECTION when trying to remove the structure of a dataset', () => {
    const action = {
      type: EDITOR_REMOVE_SECTION,
      section: 'structure'
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, dataset: Object.assign({}, state.dataset, { structure: undefined }) }))
  })

  it('should handle EDITOR_REMOVE_SECTION when trying to remove the transform of a dataset', () => {
    const action = {
      type: EDITOR_REMOVE_SECTION,
      section: 'transform'
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, dataset: Object.assign({}, state.dataset, { transform: undefined }) }))
  })

  it('should handle EDITOR_REMOVE_SECTION when trying to remove the viz of a dataset', () => {
    const action = {
      type: EDITOR_REMOVE_SECTION,
      section: 'viz'
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, dataset: Object.assign({}, state.dataset, { viz: undefined }) }))
  })

  it('should handle EDITOR_REMOVE_SECTION when trying to remove the commit of a dataset', () => {
    const action = {
      type: EDITOR_REMOVE_SECTION,
      section: 'commit'
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, dataset: Object.assign({}, state.dataset, { commit: undefined }) }))
  })

  it('should handle EDITOR_REMOVE_SECTION when trying to remove the meta of a dataset', () => {
    const action = {
      type: EDITOR_REMOVE_SECTION,
      section: 'meta'
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, dataset: Object.assign({}, state.dataset, { meta: undefined }) }))
  })

  it('should handle EDITOR_REMOVE_SECTION when trying to remove the body (stringify)', () => {
    const action = {
      type: EDITOR_REMOVE_SECTION,
      section: 'body'
    }
    const bodyBytesState = Object.assign({}, state, { dataset: Object.assign({}, state.dataset, { bodyBytes: 'wooo bodyBytes!!!' }) })
    Reducer(EditorReducer).withState(bodyBytesState).expect(action).toReturnState(Object.assign({}, state, { dirty: true, body: undefined, dataset: state.dataset }))
  })

  it('should handle EDITOR_REMOVE_SECTION when trying to remove the body (parsed)', () => {
    const action = {
      type: EDITOR_REMOVE_SECTION,
      section: 'body'
    }

    const returnState = Object.assign({}, parsedState, { body: undefined, dirty: true, colOrder: undefined, rowOrder: undefined, bodyView: 'json' })

    Reducer(EditorReducer).withState(parsedState).expect(action).toReturnState(returnState)
  })

  it('should handle EDITOR_SET_ROW_ORDER on an initial state', () => {
    var order = [0, 1, 2, 3]
    const action = {
      type: EDITOR_SET_ROW_ORDER,
      order
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, rowOrder: order }))
  })

  it('should handle EDITOR_SET_ROW_ORDER on an existing state', () => {
    var order = [0, 1, 2, 3]
    const action = {
      type: EDITOR_SET_ROW_ORDER,
      order
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, rowOrder: order }))
  })

  it('should handle EDITOR_SET_COL_ORDER on an initial state', () => {
    var order = [0, 1, 2, 3]
    const action = {
      type: EDITOR_SET_COL_ORDER,
      order
    }
    Reducer(EditorReducer).expect(action).toReturnState(Object.assign({}, initialState, { dirty: true, colOrder: order }))
  })

  it('should handle EDITOR_SET_COL_ORDER on an existing state', () => {
    var order = [0, 1, 2, 3]
    const action = {
      type: EDITOR_SET_COL_ORDER,
      order
    }
    Reducer(EditorReducer).withState(state).expect(action).toReturnState(Object.assign({}, state, { dirty: true, colOrder: order }))
  })
})
