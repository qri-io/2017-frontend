import {
  CAFS_TRANSFORM_REQUEST,
  CAFS_TRANSFORM_SUCCESS,
  CAFS_TRANSFORM_FAILURE
} from '../constants/cafs'

import { GET_CAD } from '../middleware/cad'

export function loadTransform (hash) {
  return (dispatch) => {
    return dispatch({
      [GET_CAD]: {
        types: [CAFS_TRANSFORM_REQUEST, CAFS_TRANSFORM_SUCCESS, CAFS_TRANSFORM_FAILURE],
        hash
      }
    })
  }
}
