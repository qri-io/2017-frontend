import { PING_API } from '../middleware/api'
import {
  APP_TOGGLE_MENU,
  APP_HIDE_MENU,
  APP_SHOW_MODAL,
  APP_HIDE_MODAL,
  RESET_ERROR_MESSAGE,
  SET_MESSAGE,
  RESET_MESSAGE,
  REMOVE_MODEL,
  SET_SEARCH
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

export function showModal (name = '', element, data, large = false) {
  return {
    type: APP_SHOW_MODAL,
    modal: {
      name,
      element,
      data,
      large
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

export function setSearch (search) {
  return {
    type: SET_SEARCH,
    search
  }
}
