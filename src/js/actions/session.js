import { CALL_API, Schemas } from '../middleware/api'

export const SESSION_USER_REQUEST = 'SESSION_USER_REQUEST'
export const SESSION_USER_SUCCESS = 'SESSION_USER_SUCCESS'
export const SESSION_USER_FAILURE = 'SESSION_USER_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchSessionUser() {
  return {
    [CALL_API]: {
      types: [ SESSION_USER_REQUEST, SESSION_USER_SUCCESS, SESSION_USER_FAILURE ],
      endpoint: `/session`,
      schema: Schemas.SESSION_USER,
      silentError : true
    }
  }
}

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadSessionUser() {
  return (dispatch, getState) => {
    if (getState().session.requestedSession) {
      return null
    }

    return dispatch(fetchSessionUser())
  }
}

export const SESSION_LOGIN_REQUEST = 'SESSION_LOGIN_REQUEST'
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS'
export const SESSION_LOGIN_FAILURE = 'SESSION_LOGIN_FAILURE'

export function loginUser(handle, password) {
  return {
    [CALL_API] : {
      types : [SESSION_LOGIN_REQUEST, SESSION_LOGIN_SUCCESS, SESSION_LOGIN_FAILURE],
      endpoint : '/session',
      method : 'POST',
      schema : Schemas.SESSION_USER,
      data : { handle, password }
    }
  }
}

export const SESSION_ADD_HISTORY_ENTRY = 'SESSION_ADD_HISTORY_ENTRY'

export function addHistoryEntry(query) {
  return {
    type : SESSION_ADD_HISTORY_ENTRY,
    value : query
  } 
}