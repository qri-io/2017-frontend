/* global describe, it, expect */
import { Reducer } from 'redux-testkit'
import BodyPaginationReducer, { initialPage } from '../BodyPagination'
import {
  DATASET_BODY_REQUEST,
  DATASET_BODY_SUCCESS,
  DATASET_BODY_FAILURE
} from '../../constants/dataset'

describe('Body Pagination Reducer', () => {
  // var testBody = [[1, 2, 3]]
  // var testBodyString = JSON.stringify(testBody, null, 2)

  // var state = Object.assign({}, initialState, {
  //   dirty: true,
  //   name: 'test name',
  //   body: testBodyString,
  //   dataset: {
  //     commit: { id: '1', title: 'title', message: 'message' },
  //     meta: { title: 'dataset title', description: 'woo description' },
  //     structure: { format: 'json' },
  //     transform: 'yay transform',
  //     viz: 'yay viz'
  //   },
  //   transformScript: 'yay transformScript',
  //   vizScript: 'yay vizScript'
  // })

  // const gen = generateMatchingSchemaAndBody('table', undefined, state.body, undefined, undefined, undefined)
  // const dataset = assignSchemaToDataset(state.dataset, gen.schema)
  // var parsedState = Object.assign({}, state, { colOrder: gen.colOrder, rowOrder: gen.rowOrder, body: gen.body, dataset, bodyView: 'table' })

  it('should have an initialState (@@INIT)', () => {
    expect(BodyPaginationReducer(undefined, { type: '@@INIT' })).toEqual({})
  })

  it('should handle DATASET_BODY_REQUEST with on an initial state', () => {
    const action = {
      type: DATASET_BODY_REQUEST,
      bodypath: '/foo/Qm..bar',
      selector: 'foo',
      pageSize: 20
    }
    const state = {
      '/foo/Qm..bar': {
        selector: 'foo',
        pageSize: 20,
        fetchedAll: false,
        loading: true,
        error: ''
      }
    }
    Reducer(BodyPaginationReducer).expect(action).toReturnState(state)
  })

  it('should handle EDITOR_BODY_REQUEST for a new pagination on an existing state', () => {
    const state = {
      '/foo/Qm..bar': {
        selector: 'foo',
        pageSize: 20,
        fetchedAll: false,
        loading: true,
        error: ''
      }
    }

    const action = {
      type: DATASET_BODY_REQUEST,
      bodypath: '/foo/Qm..yay'
    }

    const newState = {
      '/foo/Qm..bar': {
        selector: 'foo',
        pageSize: 20,
        fetchedAll: false,
        loading: true,
        error: ''
      },
      '/foo/Qm..yay': {
        selector: '',
        pageSize: 100,
        fetchedAll: false,
        loading: true,
        error: ''
      }
    }
    Reducer(BodyPaginationReducer).withState(state).expect(action).toReturnState(newState)
  })

  it('should handle DATASET_BODY_REQUEST for an existing pagination on an existing state', () => {
    const state = {
      '/foo/Qm..bar': {
        selector: 'foo',
        pageSize: 20,
        fetchedAll: false,
        loading: true,
        error: ''
      }
    }
    const action = {
      type: DATASET_BODY_REQUEST,
      bodypath: '/foo/Qm..bar',
      selector: 'yay',
      pageSize: 100
    }

    const newState = {
      '/foo/Qm..bar': {
        selector: 'yay',
        pageSize: 100,
        fetchedAll: false,
        loading: true,
        error: ''
      }
    }

    Reducer(BodyPaginationReducer).withState(state).expect(action).toReturnState(newState)
  })

  it('should handle DATASET_BODY_SUCCESS where we have fetchedAll on an existing state', () => {
    const state = {
      '/foo/Qm..bar': {
        selector: 'foo',
        pageSize: 20,
        fetchedAll: false,
        loading: true,
        error: ''
      }
    }

    const action = {
      type: DATASET_BODY_SUCCESS,
      bodypath: '/foo/Qm..bar',
      response: { entities: { body: { '/foo/Qm..bar': { data: [
        1, 2, 3, 4, 5, 6
      ] } } } }
    }

    const newState = {
      '/foo/Qm..bar': {
        selector: 'foo',
        pageSize: 20,
        fetchedAll: true,
        loading: false,
        error: ''
      }
    }

    Reducer(BodyPaginationReducer).withState(state).expect(action).toReturnState(newState)
  })

  it('should handle DATASET_BODY_FAILURE on an existing state', () => {
    const state = {
      '/foo/Qm..bar': {
        selector: 'foo',
        pageSize: 20,
        fetchedAll: false,
        loading: true,
        error: ''
      }
    }

    const action = {
      type: DATASET_BODY_FAILURE,
      bodypath: '/foo/Qm..bar',
      error: 'oh no!!'
    }

    const newState = {
      '/foo/Qm..bar': {
        selector: 'foo',
        pageSize: 20,
        fetchedAll: false,
        loading: false,
        error: 'oh no!!'
      }
    }

    Reducer(BodyPaginationReducer).withState(state).expect(action).toReturnState(newState)
  })
})
