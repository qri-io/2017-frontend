/* global describe, it, expect */
import { Reducer } from 'redux-testkit'
import SessionReducer from '../session'
import { SESSION_USER_SUCCESS, SESSION_USER_FAILURE, SESSION_LOGIN_SUCCESS, SESSION_ADD_HISTORY_ENTRY } from '../../constants/session'

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

  it('should handle SESSION_LOGIN_SUCCESS on an initial state', () => {
    const action = { type: SESSION_LOGIN_SUCCESS }

    Reducer(SessionReducer).expect(action).toChangeInState({ requestedSession: true })
  })

  it('should handle SESSION_LOGIN_SUCCESS on an existing state', () => {
    const action = { type: SESSION_LOGIN_SUCCESS }
    const state = Object.assign({}, initialState, { requestedSession: true })

    Reducer(SessionReducer).expect(action).toReturnState(state)
  })

  it('should handle adding a query (SESSION_ADD_HISTORY_ENTRY) on an initial state', () => {
    const action = {
      type: SESSION_ADD_HISTORY_ENTRY,
      value: 'select * from us_cen_fam limit 10'
    }
    const result = {
      requestedSession: false,
      history: [
        'select * from us_cen_fam limit 10'
      ]
    }
    Reducer(SessionReducer).expect(action).toReturnState(result)
  })

  it('should handle adding a query (SESSION_ADD_HISTORY_ENTRY) on an existing state', () => {
    const action = {
      type: SESSION_ADD_HISTORY_ENTRY,
      value: 'select * from us_cen_fam limit 15'
    }
    const state = {
      requestedSession: true,
      history: [
        'select * from us_cen_fam limit 10'
      ]
    }
    const result = {
      requestedSession: true,
      history: [
        'select * from us_cen_fam limit 15',
        'select * from us_cen_fam limit 10'
      ]
    }
    Reducer(SessionReducer).withState(state).expect(action).toReturnState(result)
  })

  it('should handle attempting to add no query (SESSION_ADD_HISTORY_ENTRY) on an initial state', () => {
    const action = { type: SESSION_ADD_HISTORY_ENTRY }
    Reducer(SessionReducer).expect(action).toReturnState(initialState)
  })

  it('should handle attempting to add no query (SESSION_ADD_HISTORY_ENTRY) on an existing state', () => {
    const action = { type: SESSION_ADD_HISTORY_ENTRY }
    const state = {
      requestedSession: true,
      history: [
        'select * from us_cen_fam limit 10'
      ]
    }
    Reducer(SessionReducer).withState(state).expect(action).toReturnState(state)
  })

  it('should handle adding an empty query (SESSION_ADD_HISTORY_ENTRY) on an initial state', () => {
    const action = {
      type: SESSION_ADD_HISTORY_ENTRY,
      value: ''
    }
    Reducer(SessionReducer).expect(action).toReturnState(initialState)
  })

  it('should handle adding an empty query (SESSION_ADD_HISTORY_ENTRY) on an existing state', () => {
    const action = {
      type: SESSION_ADD_HISTORY_ENTRY,
      value: ''
    }
    const state = {
      requestedSession: true,
      history: [
        'select * from us_cen_fam limit 10'
      ]
    }
    Reducer(SessionReducer).withState(state).expect(action).toReturnState(state)
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
