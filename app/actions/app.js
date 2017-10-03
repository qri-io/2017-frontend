export const APP_TOGGLE_MENU = 'APP_TOGGLE_MENU'
export function toggleMenu () {
  return {
    type: APP_TOGGLE_MENU
  }
}

export const APP_HIDE_MENU = 'APP_HIDE_MENU'
export function hideMenu () {
  return {
    type: APP_HIDE_MENU
  }
}

export const APP_SHOW_MODAL = 'APP_SHOW_MODAL'
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

export const APP_HIDE_MODAL = 'APP_HIDE_MODAL'
export function hideModal () {
  return {
    type: APP_HIDE_MODAL
  }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
// Resets the currently visible error message.
export function resetErrorMessage () {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export const SET_MESSAGE = 'SET_MESSAGE'
export function setMessage (message) {
  return {
    type: SET_MESSAGE,
    message
  }
}

export const RESET_MESSAGE = 'RESET_MESSAGE'
export function resetMessage () {
  return {
    type: RESET_MESSAGE
  }
}

// Remove a remote model from state.entities
export const REMOVE_MODEL = 'REMOVE_MODEL'
export function removeModel (schema, id) {
  return {
    type: REMOVE_MODEL,
    schema,
    id
  }
}

export const SET_SEARCH = 'SET_SEARCH'
export function setSearch (search) {
  return {
    type: SET_SEARCH,
    search
  }
}
