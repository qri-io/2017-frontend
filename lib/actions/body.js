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

export function fetchBodyByPage (path, bodypath, page = 1, pageSize = 100) {
  return {
    [CALL_API]: {
      types: [BODY_REQUEST, BODY_SUCCESS, BODY_FAILURE],
      endpoint: `/body/at${path}`,
      schema: Schemas.STRUCTURED_DATA,
      data: { page, pageSize, format: 'json' }
    },
    bodypath,
    page,
    pageSize
  }
}

export function loadBodyByPage (path, bodypath, page = 1, pageSize = 100) {
  return (dispatch, getState) => {
    // TODO - need to match pageSize / all checking from pagination before we can use this
    // const body = selectDatasetBody(getState(), bodypath)
    // if (body) {
    //   // dispatch a matching structure to DATSET_BODY_SUCCESS for easier
    //   // consumption by other actions
    //   return dispatch({
    //     type: GET_BODY,
    //     repsonse: {
    //       entities: {
    //         body: {
    //           [bodypath]: { data: body }
    //         }
    //       }
    //     }
    //   })
    // }
    return dispatch(fetchBodyByPage(path, bodypath, page, pageSize))
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
