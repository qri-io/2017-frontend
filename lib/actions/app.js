import { PING_API } from '../middleware/api'
import {
  APP_TOGGLE_MENU,
  APP_HIDE_MENU,
  APP_SHOW_MODAL,
  APP_HIDE_MODAL,
  RESET_ERROR_MESSAGE,
  SET_MESSAGE,
  REMOVE_MODEL,
  SET_SEARCH,
  SET_LOCATION,
  CLEAR_PAGINATION,
  CLEAR_PAGINATION_IDS,
  API_CONNECTION_FAILURE,
  SET_VIEW_MODE
} from '../constants/app'

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

export function setAppLocation (location) {
  return {
    type: SET_LOCATION,
    location
  }
}

export function setViewMode (viewMode) {
  return {
    type: SET_VIEW_MODE,
    viewMode
  }
}
