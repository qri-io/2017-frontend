import {
  CAFS_REQUEST,
  CAFS_SUCCESS,
  CAFS_FAILURE,
  CAFS_TRANSFORM_REQUEST,
  CAFS_TRANSFORM_SUCCESS,
  CAFS_TRANSFORM_FAILURE,
  CAFS_VIZ_REQUEST,
  CAFS_VIZ_SUCCESS,
  CAFS_VIZ_FAILURE,
  CAFS_BODY_FILE_REQUEST,
  CAFS_BODY_FILE_SUCCESS,
  CAFS_BODY_FILE_FAILURE
} from '../constants/cafs'

const initialState = {}

// mapActionType takes the given type and tries to match it to the
// cafs request, success, and failure types
// any new cafs actions that get added need to update these lists
function mapActionType (type) {
  const requestList = [
    CAFS_TRANSFORM_REQUEST,
    CAFS_VIZ_REQUEST,
    CAFS_BODY_FILE_REQUEST
  ]
  const successList = [
    CAFS_TRANSFORM_SUCCESS,
    CAFS_VIZ_SUCCESS,
    CAFS_BODY_FILE_SUCCESS
  ]
  const failureList = [
    CAFS_TRANSFORM_FAILURE,
    CAFS_VIZ_FAILURE,
    CAFS_BODY_FILE_FAILURE
  ]

  if (requestList.includes(type)) {
    return CAFS_REQUEST
  }
  if (successList.includes(type)) {
    return CAFS_SUCCESS
  }
  if (failureList.includes(type)) {
    return CAFS_FAILURE
  }
}

// Creates a reducer managing cafs, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function cafs (state = initialState, action) {
  const { type, key, data, error } = action

  switch (mapActionType(type)) {
    case CAFS_REQUEST:
      return Object.assign({}, state, {
        [key]: {
          loading: true
        }
      })
    case CAFS_SUCCESS:
      return Object.assign({}, state, {
        [key]: {
          loading: false,
          data
        }
      })
    case CAFS_FAILURE:
      return Object.assign({}, state, {
        [key]: {
          loading: false,
          data: null,
          error
        }
      })
    default:
      return state
  }
}
