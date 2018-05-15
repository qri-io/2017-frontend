import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'

import {
  HISTORY_REQUEST,
  HISTORY_SUCCESS,
  HISTORY_FAILURE
} from '../constants/history'

export function fetchHistoryByName (peername, name, page = 1, pageSize = 30) {
  return {
    [CALL_API]: {
      types: [HISTORY_REQUEST, HISTORY_SUCCESS, HISTORY_FAILURE],
      endpoint: `/history/${peername}/${name}`,
      data: { page, pageSize },
      schema: Schemas.DATASET_ARRAY
    },
    page,
    pageSize,
    path: `/${peername}/${name}`
  }
}

export function loadHistoryByName (peername, name, page = 1, pageSize = 30) {
  return (dispatch, getState) => {
    // TODO - check pagination
    return dispatch(fetchHistoryByName(peername, name, page, pageSize))
  }
}

export function fetchHistory (path, page = 1, pageSize = 30) {
  return {
    [CALL_API]: {
      types: [HISTORY_REQUEST, HISTORY_SUCCESS, HISTORY_FAILURE],
      endpoint: `/history/at${path}`,
      data: { page, pageSize },
      schema: Schemas.DATASET_ARRAY
    },
    page,
    pageSize,
    path
  }
}

export function loadHistory (path, page = 1, pageSize = 30) {
  return (dispatch, getState) => {
    // TODO - check pagination
    return dispatch(fetchHistory(path, page, pageSize))
  }
}
