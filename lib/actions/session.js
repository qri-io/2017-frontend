import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'

import {
  SESSION_PROFILE_REQUEST,
  SESSION_PROFILE_SUCCESS,
  SESSION_PROFILE_FAILURE,
  SESSION_DATASETS_REQUEST,
  SESSION_DATASETS_SUCCESS,
  SESSION_DATASETS_FAILURE,
  SET_SESSION_PROFILE_REQUEST,
  SET_SESSION_PROFILE_SUCCESS,
  SET_SESSION_PROFILE_FAILURE,
  SET_PROFILE_PHOTO_REQUEST,
  SET_PROFILE_PHOTO_SUCCESS,
  SET_PROFILE_PHOTO_FAILURE,
  SET_PROFILE_POSTER_REQUEST,
  SET_PROFILE_POSTER_SUCCESS,
  SET_PROFILE_POSTER_FAILURE,
  SESSION_UPDATE,
  CREATE_LOCAL_SESSION_PROFILE
} from '../constants/session'

import {
  updateLocalModel,
  newLocalModel
} from './localModels'

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

export function fetchSessionDatasets (page = 1, pageSize = 30) {
  return {
    [CALL_API]: {
      types: [SESSION_DATASETS_REQUEST, SESSION_DATASETS_SUCCESS, SESSION_DATASETS_FAILURE],
      endpoint: `/list/me`,
      data: { page, pageSize },
      schema: Schemas.DATASET_ARRAY,
      silentError: true
    },
    page,
    pageSize
  }
}

export function loadSessionDatasets (page = 1, pageSize = 30) {
  return (dispatch) => {
    // const dataset = selectDatasetById(getState(), )
    // if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(fetchSessionDatasets(page, pageSize))
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
        files: { file: files }
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
        files: { file: files }
      }
    }).then(() => {
      dispatch(loadSessionProfile())
    })
  }
}

export function saveSessionProfile (profile) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [SET_SESSION_PROFILE_REQUEST, SET_SESSION_PROFILE_SUCCESS, SET_SESSION_PROFILE_FAILURE],
        endpoint: '/profile',
        method: 'POST',
        schema: Schemas.PROFILE,
        data: profile
      }
    })
  }
}

export function updateSession (profile) {
  return updateLocalModel(Schemas.PROFILE, SESSION_UPDATE, profile)
}

export function createLocalSession (profile) {
  return newLocalModel(Schemas.PROFILE, CREATE_LOCAL_SESSION_PROFILE, profile)
}
