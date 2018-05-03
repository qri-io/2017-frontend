import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'

import {
  SESSION_PROFILE_REQUEST,
  SESSION_PROFILE_SUCCESS,
  SESSION_PROFILE_FAILURE,
  SET_PROFILE_PHOTO_REQUEST,
  SET_PROFILE_PHOTO_SUCCESS,
  SET_PROFILE_PHOTO_FAILURE,
  SET_PROFILE_POSTER_REQUEST,
  SET_PROFILE_POSTER_SUCCESS,
  SET_PROFILE_POSTER_FAILURE
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

export function setProfilePhoto (files) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [SET_PROFILE_PHOTO_REQUEST, SET_PROFILE_PHOTO_SUCCESS, SET_PROFILE_PHOTO_FAILURE],
        endpoint: '/profile/photo',
        method: 'PUT',
        schema: Schemas.PROFILE,
        data: {},
        files
      }
    }).then(() => {
      dispatch(loadSessionProfile())
    })
  }
}

export function setProfilePoster (files) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [SET_PROFILE_POSTER_REQUEST, SET_PROFILE_POSTER_SUCCESS, SET_PROFILE_POSTER_FAILURE],
        endpoint: '/profile/poster',
        method: 'PUT',
        schema: Schemas.PROFILE,
        data: {},
        files
      }
    }).then(() => {
      dispatch(loadSessionProfile())
    })
  }
}
