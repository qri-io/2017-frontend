import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'
import { selectUserByHandle } from '../selectors/user'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchUser(login) {
  return {
    [CALL_API]: {
      types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
      endpoint: `/users/${login}`,
      schema: Schemas.USER
    }
  }
}

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadUser(login, requiredFields = []) {
  return (dispatch, getState) => {
    const user = getState().entities.users[login]
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchUser(login))
  }
}

export function fetchUserByHandle(handle, requiredFields=[]) {
  return {
    [CALL_API] : {
      types : [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
      endpoint: `/users?handle=${handle}`,
      schema : Schemas.USER
    }
  }
}

export function loadUserByHandle(handle, requiredFields=[]) {
  return (dispatch, getState) => {
    const user = selectUserByHandle(getState(), handle)
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchUserByHandle(handle));
  }
}