/* global describe, it, expect */
import { Reducer } from 'redux-testkit'
import SessionReducer from '../session'
import { SESSION_PROFILE_SUCCESS, SESSION_PROFILE_FAILURE } from '../../constants/session'

describe('Session Reducer', () => {
  const initialState = ''

  it('should have an initialState (@@INIT)', () => {
    expect(SessionReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle SESSION_PROFILE_SUCCESS on an initial state', () => {
    const action = {
      type: SESSION_PROFILE_SUCCESS,
      response: {
        result: {
          data: 'profileid'
        }
      }
    }
    const state = 'profileid'

    Reducer(SessionReducer).expect(action).toReturnState(state)
  })

  it('should handle SESSION_PROFILE_SUCCESS on an existing state', () => {
    const state = 'profileid'
    const action = {
      type: SESSION_PROFILE_SUCCESS,
      response: {
        result: {
          data: 'newProfileid'
        }
      }
    }
    const newState = 'newProfileid'

    Reducer(SessionReducer).withState(state).expect(action).toReturnState(newState)
  })

  it('should handle SESSION_PROFILE_FAILURE on an initial state', () => {
    const action = { type: SESSION_PROFILE_FAILURE }

    Reducer(SessionReducer).expect(action).toChangeInState(initialState)
  })

  it('should handle SESSION_PROFILE_FAILURE on an existing state', () => {
    const action = { type: SESSION_PROFILE_FAILURE }
    const state = 'profileid'

    Reducer(SessionReducer).withState(state).expect(action).toReturnState(state)
  })

  it('should return the same state after accepting a non existing action on an initial state', () => {
    const action = { type: 'NON_EXISTING' }
    Reducer(SessionReducer).expect(action).toReturnState(initialState)
  })

  it('should return the same state after accepting a non existing action on an existing state', () => {
    const action = { type: 'NON_EXISTING' }
    const state = 'profileid'
    Reducer(SessionReducer).withState(state).expect(action).toReturnState(state)
  })
})
