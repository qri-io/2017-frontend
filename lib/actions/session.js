import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'

import {
  SESSION_PROFILE_REQUEST,
  SESSION_PROFILE_SUCCESS,
  SESSION_PROFILE_FAILURE
} from '../constants/session'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchSessionProfile () {
  return {
    [CALL_API]: {
      types: [ SESSION_PROFILE_REQUEST, SESSION_PROFILE_SUCCESS, SESSION_PROFILE_FAILURE ],
      endpoint: `/me`,
      schema: Schemas.PROFILE,
      silentError: true
    }
  }
}

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadSessionProfile () {
  return (dispatch, getState) => {
    return dispatch(fetchSessionProfile())
  }
}
