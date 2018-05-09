import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'
import { selectProfileById, selectProfileByName } from '../selectors/profiles'

import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,

  PROFILES_REQUEST,
  PROFILES_SUCCESS,
  PROFILES_FAILURE
} from '../constants/profiles'

export function fetchProfiles (page = 1, pageSize = 30) {
  return {
    [CALL_API]: {
      types: [PROFILES_REQUEST, PROFILES_SUCCESS, PROFILES_FAILURE],
      endpoint: '/peers',
      data: { page, pageSize },
      schema: Schemas.PROFILE_ARRAY
    },
    page,
    pageSize
  }
}

export function loadProfiles (page = 1, pageSize = 30) {
  return (dispatch, getState) => {
    // TODO - check pagination
    return dispatch(fetchProfiles(page, pageSize))
  }
}

export function fetchProfileById (id) {
  return {
    [CALL_API]: {
      types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE],
      endpoint: `/connect/${id}`,
      schema: Schemas.PROFILE
    }
  }
}

export function loadProfileById (id) {
  return (dispatch, getState) => {
    if (selectProfileById(getState(), id)) {
      return new Promise((resolve, reject) => { resolve() })
    }
    return dispatch(fetchProfileById(id))
  }
}

export function fetchProfileByName (name) {
  return {
    [CALL_API]: {
      types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE],
      endpoint: `/${name}`,
      schema: Schemas.PROFILE
    }
  }
}

export function loadProfileByName (name) {
  return (dispatch, getState) => {
    if (selectProfileByName(getState(), name)) {
      return new Promise((resolve, reject) => {})
    }
    return dispatch(
      fetchProfileByName(name)
    )
  }
}
