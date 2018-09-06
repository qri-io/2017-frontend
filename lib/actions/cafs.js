import {
  CAFS_TRANSFORM_REQUEST,
  CAFS_TRANSFORM_SUCCESS,
  CAFS_TRANSFORM_FAILURE
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
