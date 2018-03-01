/* global describe, it, expect */
import { Reducer } from 'redux-testkit'
import SessionReducer from '../session'
import { SESSION_USER_SUCCESS, SESSION_USER_FAILURE } from '../../constants/session'

describe('Session Reducer', () => {
  const initialState = {
    requestedSession: false,
    history: []
  }

  it('should have an initialState (@@INIT)', () => {
    expect(SessionReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle SESSION_USER_SUCCESS on an initial state', () => {
    const action = { type: SESSION_USER_SUCCESS }

    Reducer(SessionReducer).expect(action).toChangeInState({ requestedSession: true })
  })

  it('should handle SESSION_USER_SUCCESS on an existing state', () => {
    const action = { type: SESSION_USER_SUCCESS }
    const state = Object.assign({}, initialState, { requestedSession: true })

    Reducer(SessionReducer).expect(action).toReturnState(state)
  })

  it('should handle SESSION_USER_FAILURE on an initial state', () => {
    const action = { type: SESSION_USER_FAILURE }

    Reducer(SessionReducer).expect(action).toChangeInState({ requestedSession: true })
  })

  it('should handle SESSION_USER_FAILURE on an existing state', () => {
    const action = { type: SESSION_USER_FAILURE }
    const state = Object.assign({}, initialState, { requestedSession: true })

    Reducer(SessionReducer).expect(action).toReturnState(state)
  })

  it('should return the same state after accepting a non existing action on an initial state', () => {
    const action = { type: 'NON_EXISTING' }
    Reducer(SessionReducer).expect(action).toReturnState(initialState)
  })

  it('should return the same state after accepting a non existing action on an existing state', () => {
    const action = { type: 'NON_EXISTING' }
    const state = {
      requestedSession: true,
      history: [
        'select * from us_cen_fam limit 10'
      ]
    }
    Reducer(SessionReducer).withState(state).expect(action).toReturnState(state)
  })
})
