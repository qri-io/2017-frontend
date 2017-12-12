/* global describe, it, expect */
import { Reducer } from 'redux-testkit'
import SettingsReducer from '../settings'
import { PROFILE_LOAD_SUCCESS, SETTINGS_SET_PANEL_INDEX } from '../../constants/settings'

describe('Settings Reducer', () => {
  const initialState = {
    panelIndex: 0,
    profile: undefined
  }

  const user1 = {
    'id': 'QmaufxVe684Vnm9nUX3ouxPDxTXC6q5t2ZezR5nAnvd588',
    'created': '0001-01-01T00:00:00Z',
    'updated': '0001-01-01T00:00:00Z',
    'username': 'ramfox',
    'type': 'user',
    'email': 'kasey@qri.io',
    'name': 'Kasey',
    'description': 'this is a description',
    'homeUrl': '',
    'color': '',
    'thumb': '/ipfs/QmZB6RX2QnFRWc16LRoTRPwoQoVaQupbkjmSFH7bRfjnmL',
    'profile': '/ipfs/QmZB6RX2QnFRWc16LRoTRPwoQoVaQupbkjmSFH7bRfjnmL',
    'poster': '/ipfs/QmZNv8dJRgjrELPaq72AhQ6r2DiZqCosVH75cub2mLGwAk',
    'twitter': ''
  }
  const user2 = {
    'id': 'test',
    'created': 'test',
    'updated': 'test',
    'username': 'test',
    'type': 'test',
    'email': 'test',
    'name': 'test',
    'description': 'test',
    'homeUrl': 'test',
    'color': 'test',
    'thumb': 'test',
    'profile': 'test',
    'poster': 'test',
    'twitter': 'test'
  }

  it('should have an initial state (@@INIT)', () => {
    expect(SettingsReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle PROFILE_LOAD_SUCCESS on an initial state', () => {
    const action = {
      type: PROFILE_LOAD_SUCCESS,
      response: {
        entities: {
          profile: {
            user: user1
          }
        }
      }
    }
    Reducer(SettingsReducer).expect(action).toChangeInState({ profile: user1 })
  })

  it('should handle PROFILE_LOAD_SUCCESS on an existing state', () => {
    const action = {
      type: PROFILE_LOAD_SUCCESS,
      response: {
        entities: {
          profile: {
            user: user2
          }
        }
      }
    }
    const state = Object.assign({}, initialState, { profile: user1 })
    Reducer(SettingsReducer).withState(state).expect(action).toChangeInState({ profile: user2 })
  })

  it('should handle SETTINGS_SET_PANEL_INDEX on an initial state', () => {
    const action = {
      type: SETTINGS_SET_PANEL_INDEX,
      value: 25
    }
    Reducer(SettingsReducer).expect(action).toChangeInState({ panelIndex: 25 })
  })

  it('should handle SETTINGS_SET_PANEL_INDEX on an existing state', () => {
    const action = {
      type: SETTINGS_SET_PANEL_INDEX,
      value: 25
    }
    const state = Object.assign({}, initialState, { panelIndex: 1 })
    Reducer(SettingsReducer).withState(state).expect(action).toChangeInState({ panelIndex: 25 })
  })

  it('should return the same state after accepting an non existing action on an initial state', () => {
    const action = { type: 'NON_EXISTING' }
    Reducer(SettingsReducer).expect(action).toReturnState(initialState)
  })

  it('should return the same state after accepting an non existing action on an existing state', () => {
    const action = { type: 'NON_EXISTING' }
    const state = Object.assign({}, initialState, { profile: user1 })
    Reducer(SettingsReducer).withState(state).expect(action).toReturnState(state)
  })
})
