/* global describe, it, expect */
import { Reducer } from 'redux-testkit'
import TransfersReducer from '../transfers'
import {
  ADD_TRANSFER,
  UPDATE_TRANSFER,
  REMOVE_TRANSFER
} from '../../constants/transfers'

describe('Transfers Reducer', () => {
  const initialState = {}

  it('should have an initialState (@@INIT)', () => {
    expect(TransfersReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle ADD_TRANSFER on an initial state', () => {
    const action = {
      type: ADD_TRANSFER,
      id: 'id_1'
    }
    const state = {
      'id_1': 0
    }

    Reducer(TransfersReducer).expect(action).toReturnState(state)
  })

  it('should handle UPDATE_TRANSFER on an initial state', () => {
    // updating an initial state should make not change, you can only update once an
    // id has been added
    const action = {
      type: UPDATE_TRANSFER,
      id: 'id_1',
      status: 0
    }
    const state = {
    }

    Reducer(TransfersReducer).expect(action).toReturnState(state)
  })

  it('should handle REMOVE_TRANSFER on an initial state', () => {
    // updating an initial state should make not change, you can only update once an
    // id has been added
    const action = {
      type: REMOVE_TRANSFER
    }
    const state = {
    }

    Reducer(TransfersReducer).expect(action).toReturnState(state)
  })

  it('should handle ADD_TRANSFER on an existing state', () => {
    const state = {
      'id_1': 0.9
    }

    const action = {
      type: ADD_TRANSFER,
      id: 'id_2'
    }

    const newState = {
      'id_1': 0.9,
      'id_2': 0
    }

    Reducer(TransfersReducer).withState(state).expect(action).toReturnState(newState)
  })

  it('should handle ADD_TRANSFER on an existing state with the same id', () => {
    const state = {
      'id_1': 0.8
    }

    const action = {
      type: ADD_TRANSFER,
      id: 'id_1'
    }

    const newState = {
      'id_1': 0.8
    }

    Reducer(TransfersReducer).withState(state).expect(action).toReturnState(newState)
  })

  it('should handle UPDATE_TRANSFER on an existing state with the same id', () => {
    const state = {
      'id_1': 0
    }

    const action = {
      type: UPDATE_TRANSFER,
      id: 'id_1',
      status: -1
    }

    const newState = {
      'id_1': -1
    }

    Reducer(TransfersReducer).withState(state).expect(action).toReturnState(newState)
  })

  it('should handle UPDATE_TRANSFER on an existing state with an unknown id', () => {
    const state = {
      'id_1': 0
    }

    const action = {
      type: UPDATE_TRANSFER,
      id: 'id_2',
      status: -1
    }

    const newState = {
      'id_1': 0
    }

    Reducer(TransfersReducer).withState(state).expect(action).toReturnState(newState)
  })

  it('should handle REMOVE_TRANSFER on an existing state with the same id', () => {
    const state = {
      'id_1': 0
    }

    const action = {
      type: REMOVE_TRANSFER,
      id: 'id_1'
    }

    const newState = {
    }

    Reducer(TransfersReducer).withState(state).expect(action).toReturnState(newState)
  })

  it('should handle REMOVE_TRANSFER on an existing state with an unknown id', () => {
    const state = {
      'id_1': 0
    }

    const action = {
      type: REMOVE_TRANSFER,
      id: 'id_2'
    }

    const newState = {
      'id_1': 0
    }

    Reducer(TransfersReducer).withState(state).expect(action).toReturnState(newState)
  })

  it('should handle REMOVE_TRANSFER on an more populous existing state with a known id', () => {
    const state = {
      'id_1': 0,
      'id_2': -1
    }

    const action = {
      type: REMOVE_TRANSFER,
      id: 'id_2'
    }

    const newState = {
      'id_1': 0
    }

    Reducer(TransfersReducer).withState(state).expect(action).toReturnState(newState)
  })

  it('should return the same state after accepting a non existing action on an initial state', () => {
    const action = { type: 'NON_EXISTING' }
    Reducer(TransfersReducer).expect(action).toReturnState(initialState)
  })

  it('should return the same state after accepting a non existing action on an existing state', () => {
    const action = { type: 'NON_EXISTING' }
    const state = {
      'id_1': 0,
      'id_2': 1.1
    }
    Reducer(TransfersReducer).withState(state).expect(action).toReturnState(state)
  })
})
