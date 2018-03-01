import { CALL_API } from '../middleware/api'

import Schemas from '../schemas'
import { selectSessionUser } from '../selectors/session'
import { editModel } from './locals'

import {
  SESSION_USER_REQUEST,
  SESSION_USER_SUCCESS,
  SESSION_USER_FAILURE,
  EDIT_SESSION_USER
} from '../constants/session'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchSessionUser () {
  return {
    [CALL_API]: {
      types: [ SESSION_USER_REQUEST, SESSION_USER_SUCCESS, SESSION_USER_FAILURE ],
      endpoint: `/profile`,
      schema: Schemas.SESSION_USER,
      silentError: true
    }
  }
}

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadSessionUser () {
  return (dispatch, getState) => {
    return dispatch(fetchSessionUser())
  }
}
export function editSessionUser () {
  return (dispatch, getState) => {
    const user = selectSessionUser(getState())
    if (!user) {
      return null
    }

    return dispatch(editModel(Schemas.SESSION_USER, EDIT_SESSION_USER, user))
  }
}
