import {
  CAFS_TRANSFORM_REQUEST,
  CAFS_TRANSFORM_SUCCESS,
  CAFS_TRANSFORM_FAILURE,
  CAFS_VIZ_REQUEST,
  CAFS_VIZ_SUCCESS,
  CAFS_VIZ_FAILURE
} from '../constants/cafs'

import { GET_CAF } from '../middleware/caf'

export function loadTransform (hash) {
  return (dispatch) => {
    return dispatch({
      [GET_CAF]: {
        types: [CAFS_TRANSFORM_REQUEST, CAFS_TRANSFORM_SUCCESS, CAFS_TRANSFORM_FAILURE],
        hash
      }
    })
  }
}

export function loadViz (hash) {
  return (dispatch) => {
    return dispatch({
      [GET_CAF]: {
        types: [CAFS_VIZ_REQUEST, CAFS_VIZ_SUCCESS, CAFS_VIZ_FAILURE],
        hash
      }
    })
  }
}
