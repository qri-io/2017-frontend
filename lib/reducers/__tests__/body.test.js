/* global describe, it, expect */
import { Reducer } from 'redux-testkit'
import BodyReducer, { initialState } from '../body'
import {
  CLEAR_BODY,
  BODY_REQUEST,
  BODY_SUCCESS,
  BODY_FAILURE
} from '../../constants/body'

describe('Body Reducer', () => {
  it('should have an initialState (@@INIT)', () => {
    expect(BodyReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle BODY_REQUEST with on an initial state', () => {
    const action = {
      type: BODY_REQUEST,
      bodypath: 'foo',
      selector: 'bar',
      pageSize: 20
    }
    const resultState = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: false,
      loading: true,
      error: '',
      data: undefined
    }
    Reducer(BodyReducer).expect(action).toReturnState(resultState)
  })

  it('should handle BODY_REQUEST on an existing state with the same id and different selector', () => {
    const state = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: false,
      loading: false,
      error: '',
      data: [[ 1, 2, 3 ]]
    }

    const action = {
      type: BODY_REQUEST,
      bodypath: 'foo',
      selector: '',
      pageSize: 30
    }

    const resultState = {
      id: 'foo',
      selector: '',
      pageSize: 30,
      fetchedAll: false,
      loading: true,
      error: '',
      data: undefined
    }
    Reducer(BodyReducer).withState(state).expect(action).toReturnState(resultState)
  })

  it('should handle BODY_REQUEST on an existing state with a different id', () => {
    const state = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: false,
      loading: false,
      error: '',
      data: [[ 1, 2, 3 ]]
    }

    const action = {
      type: BODY_REQUEST,
      bodypath: 'baz',
      selector: '',
      pageSize: 30
    }

    const resultState = {
      id: 'baz',
      selector: '',
      pageSize: 30,
      fetchedAll: false,
      loading: true,
      error: '',
      data: undefined
    }
    Reducer(BodyReducer).withState(state).expect(action).toReturnState(resultState)
  })

  it('should handle BODY_REQUEST on an existing state with the same id and same selector', () => {
    const state = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: false,
      loading: false,
      error: '',
      data: [[ 1, 2, 3 ]]
    }

    const action = {
      type: BODY_REQUEST,
      bodypath: 'foo',
      selector: 'bar',
      pageSize: 30
    }

    const resultState = {
      id: 'foo',
      selector: 'bar',
      pageSize: 30,
      fetchedAll: false,
      loading: true,
      error: '',
      data: [[ 1, 2, 3 ]]
    }
    Reducer(BodyReducer).withState(state).expect(action).toReturnState(resultState)
  })

  it('should handle BODY_SUCCESS where we have not fetchedAll on initial array fetch', () => {
    const state = {
      id: 'foo',
      selector: 'bar',
      pageSize: 2,
      fetchedAll: false,
      loading: true,
      error: '',
      data: undefined
    }

    const action = {
      type: BODY_SUCCESS,
      bodypath: 'foo',
      bodybodypath: 'bar',
      data: [[1, 2, 3], [1, 2, 3]]
    }

    const resultState = {
      id: 'foo',
      selector: 'bar',
      pageSize: 2,
      fetchedAll: false,
      loading: false,
      error: '',
      data: [[1, 2, 3], [1, 2, 3]]
    }

    Reducer(BodyReducer).withState(state).expect(action).toReturnState(resultState)
  })

  it('should handle BODY_SUCCESS where we have fetchedAll on initial array fetch', () => {
    const state = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: false,
      loading: true,
      error: '',
      data: undefined
    }

    const action = {
      type: BODY_SUCCESS,
      bodypath: 'foo',
      bodybodypath: 'bar',
      data: [[1, 2, 3], [1, 2, 3]]
    }

    const resultState = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: true,
      loading: false,
      error: '',
      data: [[1, 2, 3], [1, 2, 3]]
    }

    Reducer(BodyReducer).withState(state).expect(action).toReturnState(resultState)
  })

  it('should handle BODY_SUCCESS where we have fetchedAll on an existing array fetch', () => {
    const state = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: true,
      loading: true,
      error: '',
      data: [[1, 2, 3]]
    }

    const action = {
      type: BODY_SUCCESS,
      bodypath: 'foo',
      bodybodypath: 'bar',
      data: [[
        1, 2, 3], [1, 2, 3]]
    }

    const resultState = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: true,
      loading: false,
      error: '',
      data: [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
    }

    Reducer(BodyReducer).withState(state).expect(action).toReturnState(resultState)
  })

  it('should handle BODY_SUCCESS where we have not fetchedAll on initial object fetch', () => {
    const state = {
      id: 'foo',
      selector: 'bar',
      pageSize: 3,
      fetchedAll: false,
      loading: true,
      error: '',
      data: undefined
    }

    const action = {
      type: BODY_SUCCESS,
      bodypath: 'foo',
      bodybodypath: 'bar',
      data: { 'a': 1, 'b': 2, 'c': 3 }
    }

    const resultState = {
      id: 'foo',
      selector: 'bar',
      pageSize: 3,
      fetchedAll: false,
      loading: false,
      error: '',
      data: { 'a': 1, 'b': 2, 'c': 3 }
    }

    Reducer(BodyReducer).withState(state).expect(action).toReturnState(resultState)
  })

  it('should handle BODY_SUCCESS where we have fetchedAll on initial object fetch', () => {
    const state = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: false,
      loading: true,
      error: '',
      data: undefined
    }

    const action = {
      type: BODY_SUCCESS,
      bodypath: 'foo',
      bodybodypath: 'bar',
      data: { 'a': 1, 'b': 2, 'c': 3 }
    }

    const resultState = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: true,
      loading: false,
      error: '',
      data: { 'a': 1, 'b': 2, 'c': 3 }
    }

    Reducer(BodyReducer).withState(state).expect(action).toReturnState(resultState)
  })

  it('should handle BODY_SUCCESS where we have fetchedAll on an existing object fetch', () => {
    const state = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: true,
      loading: true,
      error: '',
      data: { 'a': [1, 2], 'b': [1, 2], 'c': [1, 2] }
    }

    const action = {
      type: BODY_SUCCESS,
      bodypath: 'foo',
      bodybodypath: 'bar',
      data: { 'd': [1, 2], 'e': [1, 2], 'f': [1, 2, 3] }
    }

    const resultState = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: true,
      loading: false,
      error: '',
      data: { 'a': [1, 2], 'b': [1, 2], 'c': [1, 2], 'd': [1, 2], 'e': [1, 2], 'f': [1, 2, 3] }
    }

    Reducer(BodyReducer).withState(state).expect(action).toReturnState(resultState)
  })

  it('should handle BODY_FAILURE on an existing state', () => {
    const state = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: true,
      loading: true,
      error: '',
      data: { 'a': [1, 2], 'b': [1, 2], 'c': [1, 2] }
    }

    const action = {
      type: BODY_FAILURE,
      bodybodypath: 'foo',
      error: 'oh no!!'
    }

    const resultState = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: true,
      loading: false,
      error: 'oh no!!',
      data: { 'a': [1, 2], 'b': [1, 2], 'c': [1, 2] }
    }

    Reducer(BodyReducer).withState(state).expect(action).toReturnState(resultState)
  })

  it('should handle CLEAR_BODY on an existing state', () => {
    const state = {
      id: 'foo',
      selector: 'bar',
      pageSize: 20,
      fetchedAll: true,
      loading: true,
      error: '',
      data: { 'a': [1, 2], 'b': [1, 2], 'c': [1, 2] }
    }

    const action = {
      type: CLEAR_BODY
    }

    Reducer(BodyReducer).withState(state).expect(action).toReturnState(initialState)
  })
})
