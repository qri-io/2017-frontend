import { PING_API } from '../middleware/api'
import {
  APP_ACCEPT_TOS,
  APP_HAS_SET_PEERNAME,
  APP_TOGGLE_MENU,
  APP_HIDE_MENU,
  APP_SHOW_MODAL,
  APP_HIDE_MODAL,
  APP_AT_BOTTOM,
  RESET_ERROR_MESSAGE,
  SET_ERROR_MESSAGE,
  SET_MESSAGE,
  REMOVE_MODEL,
  SET_SEARCH,
  SET_LOCATION_TEXT,
  CLEAR_PAGINATION,
  CLEAR_PAGINATION_IDS,
  API_CONNECTION_FAILURE,
  SET_VIEW_MODE
} from '../constants/app'

export function acceptTos () {
  return {
    type: APP_ACCEPT_TOS
  }
}

export function hasSetPeername () {
  return {
    type: APP_HAS_SET_PEERNAME
  }
}

export function toggleMenu () {
  return {
    type: APP_TOGGLE_MENU
  }
}

export function hideMenu () {
  return {
    type: APP_HIDE_MENU
  }
}

export function pingApi () {
  return {
    [PING_API]: true
  }
}

export function setApphitBottom (hitBottom) {
  return {
    type: APP_AT_BOTTOM,
    hitBottom
  }
}

export function apiConnectionFail () {
  return {
    type: API_CONNECTION_FAILURE
  }
}

export function showModal (name = '', element, data, large = false, thin = false) {
  return {
    type: APP_SHOW_MODAL,
    modal: {
      name,
      element,
      data,
      large,
      thin
    }
  }
}

export function hideModal () {
  return {
    type: APP_HIDE_MODAL
  }
}

export function setErrorMessage (message) {
  return {
    type: SET_ERROR_MESSAGE,
    message: message
  }
}

// Resets the currently visible error message.
export function resetErrorMessage () {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export function setMessage (message) {
  return {
    type: SET_MESSAGE,
    message: message
  }
}

export function resetMessage () {
  return {
    type: SET_MESSAGE,
    message: ''
  }
}

// Remove a remote model from state.entities
export function removeModel (schema, id) {
  return {
    type: REMOVE_MODEL,
    schema,
    id
  }
}

export function clearPagination (reducerName) {
  return {
    type: CLEAR_PAGINATION,
    name: reducerName
  }
}

export function clearPaginationIds (section, id) {
  return {
    type: CLEAR_PAGINATION_IDS,
    section,
    id
  }
}

export function setSearch (search) {
  return {
    type: SET_SEARCH,
    search
  }
}

// this tracks the text of the location bar, it does not
// cause the location of the app to change
export function setLocationBarText (location) {
  return {
    type: SET_LOCATION_TEXT,
    location
  }
}

export function setViewMode (viewMode) {
  return {
    type: SET_VIEW_MODE,
    viewMode
  }
}
