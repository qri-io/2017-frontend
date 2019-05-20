import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'

import {
  CLEAR_BODY,
  BODY_REQUEST,
  BODY_SUCCESS,
  BODY_FAILURE
} from '../constants/body'

export function clearBody () {
  return {
    type: CLEAR_BODY
  }
}

export function loadBody (path, bodypath, offset = 0, limit = 100) {
  return (dispatch, getState) => {
    return dispatch(fetchBody(path, bodypath, offset, limit))
  }
}

export function fetchBody (path, bodypath, offset = 0, limit = 100) {
  return {
    [CALL_API]: {
      types: [BODY_REQUEST, BODY_SUCCESS, BODY_FAILURE],
      endpoint: `/body/at${path}`,
      schema: Schemas.STRUCTURED_DATA,
      data: { offset, limit, format: 'json' }
    },
    path,
    bodypath,
    pageSize: limit
  }
}
