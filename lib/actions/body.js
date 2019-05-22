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

export function loadBody (peername, name, path, bodypath, offset = 0, limit = 100) {
  return (dispatch, getState) => {
    return dispatch(fetchBody(peername, name, path, bodypath, offset, limit))
  }
}

export function fetchBody (peername, name, path, bodypath, offset = 0, limit = 100) {
  var endpoint
  if (peername === '' || name === '') {
    endpoint = `at${path}`
  } else {
    endpoint = `${peername}/${name}/at${path}`
  }
  return {
    [CALL_API]: {
      types: [BODY_REQUEST, BODY_SUCCESS, BODY_FAILURE],
      endpoint: `/body/${endpoint}`,
      schema: Schemas.STRUCTURED_DATA,
      data: { offset, limit, format: 'json' }
    },
    path,
    bodypath,
    pageSize: limit
  }
}
