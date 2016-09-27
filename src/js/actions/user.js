import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'
import { selectUserByUsername } from '../selectors/user'

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

export function fetchUserByUsername(username, requiredFields=[]) {
  return {
    [CALL_API] : {
      types : [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
      endpoint: `/users?username=${username}`,
      schema : Schemas.USER
    }
  }
}

export function loadUserByUsername(username, requiredFields=[]) {
  return (dispatch, getState) => {
    const user = selectUserByUsername(getState(), username)
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchUserByUsername(username));
  }
}

export const USER_QUERIES_REQUEST = 'USER_QUERIES_REQUEST';
export const USER_QUERIES_SUCCESS = 'USER_QUERIES_SUCCESS';
export const USER_QUERIES_FAILURE = 'USER_QUERIES_FAILURE';

export function fetchUserQueries(username, page=1, pageSize=30) {
  return {
    [CALL_API] : {
      types : [ USER_QUERIES_REQUEST, USER_QUERIES_SUCCESS, USER_QUERIES_FAILURE ],
      endpoint : `/users/${username}/queries`,
      schema: Schemas.QUERY_ARRAY
    },
    page,
    pageSize,
    username
  }
}

export function loadUserQueries(username, page=1, pageSize=30) {
  return (dispatch, getState) => {
    // TODO - prevent overfetching
    return dispatch(fetchUserQueries(username, page, pageSize));
  }
}

export const USER_DATASETS_REQUEST = 'USER_DATASETS_REQUEST';
export const USER_DATASETS_SUCCESS = 'USER_DATASETS_SUCCESS';
export const USER_DATASETS_FAILURE = 'USER_DATASETS_FAILURE';

export function fetchUserDatasets(username, page=1, pageSize=30) {
  return {
    [CALL_API] : {
      types : [ USER_DATASETS_REQUEST, USER_DATASETS_SUCCESS, USER_DATASETS_FAILURE ],
      endpoint : `/users/${username}/datasets`,
      schema: Schemas.DATASET_ARRAY
    },
    page,
    pageSize,
    username
  }
}

export function loadUserDatasets(username, page=1, pageSize=30) {
  return (dispatch, getState) => {
    // TODO - prevent overfetching
    return dispatch(fetchUserDatasets(username, page, pageSize));
  }
}