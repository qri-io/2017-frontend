import { PING_API_SUCCESS } from '../middleware/api'
import {
  APP_TOGGLE_MENU,
  APP_HIDE_MENU,
  APP_SHOW_MODAL,
  APP_HIDE_MODAL,
  SET_SEARCH,
  SET_MESSAGE } from '../constants/app'

const initialState = {
  // apiConnection:
  // 0 = never connected
  // 1 = successfully connected
  // -1 = connection failed
  apiConnection: 0,
  showMenu: false,
  modal: undefined,
  search: {},
  message: ''
}

export default function appReducer (state = initialState, action) {
  switch (action.type) {
    case PING_API_SUCCESS:
      return Object.assign({}, state, { apiConnection: 1 })
    case APP_TOGGLE_MENU:
      return Object.assign({}, state, { showMenu: !state.showMenu })
    case APP_HIDE_MENU:
      return Object.assign({}, state, { showMenu: false })
    case APP_SHOW_MODAL:
      return Object.assign({}, state, { modal: action.modal })
    case APP_HIDE_MODAL:
      return Object.assign({}, state, { modal: undefined })
    case SET_MESSAGE:
      return Object.assign({}, state, { message: action.message })
    case SET_SEARCH:
      return Object.assign({}, state, {search: action.search})
    // whenever the route changes, close the menu
    case '@@router/LOCATION_CHANGE':
      return Object.assign({}, state, { showMenu: false })
  }

  return state
}
