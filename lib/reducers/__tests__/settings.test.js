/* global describe, it, expect */
import SettingsReducer from '../settings'
import { PROFILE_LOAD_SUCCESS, SETTINGS_SET_PANEL_INDEX } from '../../constants/settings'

describe('Settings Reducer', () => {
  it('@@INIT', () => {
    const initialState = {
      panelIndex: 0,
      profile: undefined
    }
    const state = SettingsReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual(initialState)
  })

  it('PROFILE_LOAD_SUCCESS', () => {
    const user = { id: 'id', username: 'test_user' }
    const action = {
      type: PROFILE_LOAD_SUCCESS,
      response: {
        entities: {
          profile: {
            user
          }
        }
      }
    }
    const state = SettingsReducer(undefined, action)
    expect(state.profile).toEqual(user)
  })

  it('SETTINGS_SET_PANEL_INDEX', () => {
    const action = {
      type: SETTINGS_SET_PANEL_INDEX,
      value: 25
    }
    const state = SettingsReducer(undefined, action)
    expect(state.panelIndex).toEqual(25)
  })
})
