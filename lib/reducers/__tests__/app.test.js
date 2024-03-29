/* global describe, it, expect */
import { Reducer } from 'redux-testkit'
import AppReducer from '../app'

import { PING_API_SUCCESS } from '../../middleware/api'
import {
  APP_ACCEPT_TOS,
  APP_HAS_SET_PEERNAME,
  APP_TOGGLE_MENU,
  APP_HIDE_MENU,
  APP_SHOW_MODAL,
  APP_HIDE_MODAL,
  SET_SEARCH,
  SET_MESSAGE,
  SET_LOCATION_TEXT,
  API_CONNECTION_FAILURE } from '../../constants/app'

describe('App Reducer', () => {
  const initialState = {
    // apiConnection:
    // 0 = never connected
    // 1 = successfully connected
    // -1 = connection failed
    apiConnection: 0,
    showMenu: false,
    modal: undefined,
    search: '',
    location: '',
    message: '',
    viewMode: 'dataset',
    acceptedTOS: false,
    hasSetPeername: false,
    hitBottom: false
  }

  const state = {
    apiConnection: -1,
    showMenu: true,
    modal: {
      name: 'RENAME_DATASET_MODAL',
      large: false,
      thin: false,
      data: {}
    },
    search: 'test search',
    location: '/test',
    viewMode: 'viz',
    message: 'YAY',
    hitBottom: false
  }

  it('should have an initial state', () => {
    expect(AppReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle accept TOS (APP_ACCEPT_TOS) on initial state', () => {
    const action = {
      type: APP_ACCEPT_TOS
    }
    Reducer(AppReducer).expect(action).toChangeInState({ acceptedTOS: true })
  })

  it('should handle accept APP_HAS_SET_PEERNAME on initial state', () => {
    const action = {
      type: APP_HAS_SET_PEERNAME
    }
    Reducer(AppReducer).expect(action).toChangeInState({ hasSetPeername: true })
  })

  it('should handle ping success (PING_API_SUCCESS) on initial state', () => {
    const action = {
      type: PING_API_SUCCESS
    }
    Reducer(AppReducer).expect(action).toChangeInState({ apiConnection: 1 })
  })

  it('should handle ping success (PING_API_SUCCESS) on existing state', () => {
    const action = {
      type: PING_API_SUCCESS
    }
    const state = { apiConnection: -1, showMenu: true, modal: undefined, search: '', message: 'YAY', location: '' }
    Reducer(AppReducer).withState(state).expect(action).toChangeInState({ apiConnection: 1 })
  })

  it('should handle toggle menu (APP_TOGGLE_MENU) on initial state', () => {
    const action = {
      type: APP_TOGGLE_MENU
    }
    Reducer(AppReducer).expect(action).toChangeInState({ showMenu: true })
  })

  it('should handle toggle menu (APP_TOGGLE_MENU) on existing state', () => {
    const action = {
      type: APP_TOGGLE_MENU
    }
    Reducer(AppReducer).withState(state).expect(action).toChangeInState({ showMenu: false })
  })

  it('should handle hiding the menu (APP_HIDE_MENU) on initial state', () => {
    const action = {
      type: APP_HIDE_MENU
    }
    Reducer(AppReducer).expect(action).toReturnState(initialState)
  })

  it('should handle hiding the menu (APP_HIDE_MENU) on existing state', () => {
    const action = {
      type: APP_HIDE_MENU
    }
    Reducer(AppReducer).withState(state).expect(action).toChangeInState({ showMenu: false })
  })

  it('should handle the apiConnection failure (API_CONNECTION_FAILURE) on initial state', () => {
    const action = {
      type: API_CONNECTION_FAILURE
    }
    Reducer(AppReducer).expect(action).toChangeInState({ apiConnection: -1 })
  })

  it('should handle hiding the menu (APP_HIDE_MENU) on existing state', () => {
    const action = {
      type: API_CONNECTION_FAILURE
    }
    Reducer(AppReducer).withState(state).expect(action).toChangeInState({ apiConnection: -1 })
  })

  it('should handle showing the modal (APP_SHOW_MODAL) on initial state', () => {
    const action = {
      type: APP_SHOW_MODAL,
      modal: {
        name: 'RENAME_DATASET_MODAL',
        large: false,
        thin: false,
        data: {}
      }
    }
    Reducer(AppReducer).expect(action).toChangeInState({
      modal: {
        name: 'RENAME_DATASET_MODAL',
        large: false,
        thin: false,
        data: {}
      }
    })
  })

  it('should handle showing the modal (APP_SHOW_MODAL) on existing state', () => {
    const action = {
      type: APP_SHOW_MODAL,
      modal: {
        name: 'RENAME_DATASET_MODAL',
        large: false,
        thin: false,
        data: {}
      }
    }
    Reducer(AppReducer).withState(state).expect(action).toChangeInState({
      modal: {
        name: 'RENAME_DATASET_MODAL',
        large: false,
        thin: false,
        data: {}
      }
    })
  })

  it('should handle hiding the modal (APP_HIDE_MODAL) on initial state', () => {
    const action = {
      type: APP_HIDE_MODAL
    }
    Reducer(AppReducer).expect(action).toReturnState(initialState)
  })

  it('should handle hiding the modal (APP_HIDE_MODAL) on existing state', () => {
    const action = {
      type: APP_HIDE_MODAL
    }
    const result = {
      apiConnection: -1,
      showMenu: true,
      modal: undefined,
      search: 'test search',
      message: 'YAY',
      viewMode: 'viz',
      location: '/test',
      hitBottom: false
    }
    Reducer(AppReducer).withState(state).expect(action).toReturnState(result)
  })

  it('should handle setting the message (SET_MESSAGE) on initial state', () => {
    const action = {
      type: SET_MESSAGE,
      message: 'yay message'
    }
    Reducer(AppReducer).expect(action).toChangeInState({ message: 'yay message' })
  })

  it('should handle setting the message (SET_MESSAGE) on existing state', () => {
    const action = {
      type: SET_MESSAGE,
      message: 'yay message'
    }
    Reducer(AppReducer).withState(state).expect(action).toChangeInState({ message: 'yay message' })
  })

  it('should handle setting search (SET_SEARCH) on initial state', () => {
    const action = {
      type: SET_SEARCH,
      search: 'searching dataset'
    }
    Reducer(AppReducer).expect(action).toChangeInState({ search: 'searching dataset' })
  })

  it('should handle setting search (SET_SEARCH) on existing state', () => {
    const action = {
      type: SET_SEARCH,
      search: 'searching dataset' }
    Reducer(AppReducer).withState(state).expect(action).toChangeInState({ search: 'searching dataset' })
  })

  it('should handle setting location (SET_LOCATION_TEXT) on initial state', () => {
    const action = {
      type: SET_LOCATION_TEXT,
      location: '/collection'
    }
    Reducer(AppReducer).expect(action).toChangeInState({ location: '/collection' })
  })

  it('should handle setting location (SET_LOCATION_TEXT) on existing state', () => {
    const action = {
      type: SET_LOCATION_TEXT,
      location: '/collection' }
    Reducer(AppReducer).withState(state).expect(action).toChangeInState({ location: '/collection' })
  })

  it('should handle hiding the menu on location change (@@router/LOCATION_CHANGE) on initial state', () => {
    const action = {
      type: '@@router/LOCATION_CHANGE'
    }
    Reducer(AppReducer).expect(action).toReturnState(initialState)
  })

  it('should handle hiding the menu on location change (@@router/LOCATION_CHANGE) on existing state', () => {
    const action = {
      type: '@@router/LOCATION_CHANGE'
    }
    Reducer(AppReducer).withState(state).expect(action).toChangeInState({ showMenu: false })
  })

  it('should return the same state after accepting an non existing action on an initial state', () => {
    const action = { type: 'NON_EXISTING' }
    Reducer(AppReducer).expect(action).toReturnState(initialState)
  })

  it('should return the same state after accepting an non existing action on an existing state', () => {
    const action = { type: 'NON_EXISTING' }
    Reducer(AppReducer).withState(state).expect(action).toReturnState(state)
  })
})
