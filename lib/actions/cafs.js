import {
  CAFS_TRANSFORM_REQUEST,
  CAFS_TRANSFORM_SUCCESS,
  CAFS_TRANSFORM_FAILURE
} from '../constants/cafs'

export function loadTransform (scriptPath) {
  return (dispatch) => {
    return dispatch({
      [GET_CAD]: {
        types: [CAFS_TRANSFORM_REQUEST, CAFS_TRANSFORM_SUCCESS, CAFS_TRANSFORM_FAILURE],
        endpoint: scriptPath
      }
    })
  }
}
