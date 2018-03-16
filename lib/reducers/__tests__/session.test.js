/* global describe, it, expect */
import { Reducer } from 'redux-testkit'
import SessionReducer from '../session'
import { SESSION_PEER_SUCCESS, SESSION_PEER_FAILURE } from '../../constants/session'

describe('Session Reducer', () => {
  const initialState = ''

  it('should have an initialState (@@INIT)', () => {
    expect(SessionReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle SESSION_PEER_SUCCESS on an initial state', () => {
    const action = {
      type: SESSION_PEER_SUCCESS,
      response: {
        result: {
          data: 'peerid'
        }
      }
    }
    const state = 'peerid'

    Reducer(SessionReducer).expect(action).toReturnState(state)
  })

  it('should handle SESSION_PEER_SUCCESS on an existing state', () => {
    const state = 'peerid'
    const action = {
      type: SESSION_PEER_SUCCESS,
      response: {
        result: {
          data: 'newPeerid'
        }
      }
    }
    const newState = 'newPeerid'

    Reducer(SessionReducer).withState(state).expect(action).toReturnState(newState)
  })

  it('should handle SESSION_PEER_FAILURE on an initial state', () => {
    const action = { type: SESSION_PEER_FAILURE }

    Reducer(SessionReducer).expect(action).toChangeInState(initialState)
  })

  it('should handle SESSION_PEER_FAILURE on an existing state', () => {
    const action = { type: SESSION_PEER_FAILURE }
    const state = 'peerid'

    Reducer(SessionReducer).withState(state).expect(action).toReturnState(state)
  })

  it('should return the same state after accepting a non existing action on an initial state', () => {
    const action = { type: 'NON_EXISTING' }
    Reducer(SessionReducer).expect(action).toReturnState(initialState)
  })

  it('should return the same state after accepting a non existing action on an existing state', () => {
    const action = { type: 'NON_EXISTING' }
    const state = 'peerid'
    Reducer(SessionReducer).withState(state).expect(action).toReturnState(state)
  })
})
