import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'

import {
  SESSION_PEER_REQUEST,
  SESSION_PEER_SUCCESS,
  SESSION_PEER_FAILURE
} from '../constants/session'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchSessionPeer () {
  return {
    [CALL_API]: {
      types: [ SESSION_PEER_REQUEST, SESSION_PEER_SUCCESS, SESSION_PEER_FAILURE ],
      endpoint: `/me`,
      schema: Schemas.PEER,
      silentError: true
    }
  }
}

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadSessionPeer () {
  return (dispatch, getState) => {
    return dispatch(fetchSessionPeer())
  }
}
