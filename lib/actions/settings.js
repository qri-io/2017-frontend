import { CALL_API } from '../middleware/api'

import Schemas from '../schemas'

import { updateLocalModel } from './locals'

import {
	PROFILE_UPDATE,
	PROFILE_LOAD_REQUEST,
	PROFILE_LOAD_SUCCESS,
	PROFILE_LOAD_FAILURE,
	PROFILE_SAVE_REQUEST,
	PROFILE_SAVE_SUCCESS,
	PROFILE_SAVE_FAILURE,
	SETTINGS_SET_PANEL_INDEX
} from '../constants/settings'

export function updateProfile (profile) {
  return updateLocalModel(Schemas.PROFILE, PROFILE_UPDATE, profile)
}

export function loadProfile () {
  return {
    [CALL_API]: {
      types: [PROFILE_LOAD_REQUEST, PROFILE_LOAD_SUCCESS, PROFILE_LOAD_FAILURE],
      endpoint: '/profile',
      method: 'GET',
      schema: Schemas.PROFILE,
      data: {}
    }
  }
}

export function saveProfile (profile) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [	PROFILE_SAVE_REQUEST, PROFILE_SAVE_SUCCESS, PROFILE_SAVE_FAILURE],
        endpoint: '/profile',
        method: 'POST',
        schema: Schemas.DATASET,
        data: profile
      }
    }).then((action) => {
      if (action.type === PROFILE_SAVE_SUCCESS) {
        alert('Profile saved')
      } else {
        console.log(action.error)
        alert('Error saving profile')
      }
    })
  }
}

export function loadSettings () {
  return (dispatch) => {
  	return dispatch(loadProfile())
  }
}

export function setPanelIndex (index) {
  return {
    type: SETTINGS_SET_PANEL_INDEX,
    value: index
  }
}
