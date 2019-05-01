
import { PING_API_SUCCESS } from '../middleware/api'
import store from '../utils/localStore'
import {
  APP_ACCEPT_TOS,
  APP_HAS_SET_PEERNAME,
  APP_TOGGLE_MENU,
  APP_HIDE_MENU,
  APP_SHOW_MODAL,
  APP_HIDE_MODAL,
  APP_AT_BOTTOM,
  SET_SEARCH,
  SET_MESSAGE,
  SET_LOCATION_TEXT,
  API_CONNECTION_FAILURE,
  SET_VIEW_MODE } from '../constants/app'

const acceptedTOSKey = 'accepted_tos'
const hasSetPeernameKey = 'hasSetPeername'
const initialState = {
  // apiConnection:
  // 0 = never connected
  // 1 = successfully connected
  // -1 = connection failed
  apiConnection: 0,
  showMenu: false,
  modal: undefined,
  search: '',
  message: '',
  viewMode: 'dataset',
  location: '',
  acceptedTOS: !!store().getItem(acceptedTOSKey),
  hasSetPeername: !!store().getItem(hasSetPeernameKey),
  hitBottom: false
}

export default function appReducer (state = initialState, action) {
  switch (action.type) {
    case APP_ACCEPT_TOS:
      store().setItem(acceptedTOSKey, 'true')
      return Object.assign({}, state, { acceptedTOS: true })
    case APP_HAS_SET_PEERNAME:
      store().setItem(hasSetPeernameKey, 'true')
      return Object.assign({}, state, { hasSetPeername: true })
    case PING_API_SUCCESS:
      return Object.assign({}, state, { apiConnection: 1 })
    case API_CONNECTION_FAILURE:
      return Object.assign({}, state, { apiConnection: -1 })
    case APP_TOGGLE_MENU:
      return Object.assign({}, state, { showMenu: !state.showMenu })
    case APP_HIDE_MENU:
      return Object.assign({}, state, { showMenu: false })
    case APP_SHOW_MODAL:
      return Object.assign({}, state, { modal: action.modal })
    case APP_HIDE_MODAL:
      return Object.assign({}, state, { modal: undefined })
    case APP_AT_BOTTOM:
      return Object.assign({}, state, { hitBottom: action.hitBottom })
    case SET_MESSAGE:
      return Object.assign({}, state, { message: action.message })
    case SET_LOCATION_TEXT:
      return Object.assign({}, state, { location: action.location })
    case SET_SEARCH:
      return Object.assign({}, state, { search: action.search })
    case SET_VIEW_MODE:
      return Object.assign({}, state, { viewMode: action.viewMode })
    // whenever the route changes, close the menu
    case '@@router/LOCATION_CHANGE':
      return Object.assign({}, state, { showMenu: false })
  }

  return state
}
