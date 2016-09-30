import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'
import { RUN_QUERY } from '../middleware/runQuery'
import Schemas from '../schemas'
import { setBottomPanel } from './console'
import { addHistoryEntry } from './session'

export const QUERY_SET = 'QUERY_SET'

export function setQuery(value) {
	return {
		type : QUERY_SET,
		value : value
	}
}

export const QUERY_RUN_REQUEST = 'QUERY_RUN_REQUEST'
export const QUERY_RUN_SUCCESS = 'QUERY_RUN_SUCCESS'
export const QUERY_RUN_FAILURE = 'QUERY_RUN_FAILURE'

export function runQuery(request) {
  // add in defaults
  request = Object.assign({
    page : 1,
    pageSize : 200
  }, request);

  return (dispatch, getState) => {

    analytics.track("Submitted Query", request);

    if (!request.download) {
      dispatch(setBottomPanel(0));
    }
    
    dispatch(addHistoryEntry(request.query));
    return dispatch({
      [RUN_QUERY]: {
        types: [ QUERY_RUN_REQUEST, QUERY_RUN_SUCCESS, QUERY_RUN_FAILURE ],
        request,
      }
    });
  }
}

export const QUERIES_REQUEST = 'QUERIES_REQUEST'
export const QUERIES_SUCCESS = 'QUERIES_SUCCESS'
export const QUERIES_FAILURE = 'QUERIES_FAILURE'

export function fetchQueryPage(page=1, pageSize=30) {
  return {
    [CALL_API] : {
      types : [QUERIES_REQUEST, QUERIES_SUCCESS, QUERIES_FAILURE],
      endpoint : '/queries',
      data : { page, pageSize },
      schema : Schemas.QUERY_ARRAY
    },
    page,
    pageSize
  }
}

export function loadQueryPage(page=1, pageSize=30) {
  return (dispatch, getState) => {
    // TODO - check pagination
    return dispatch(fetchQueryPage(page, pageSize));
  }
}

export function toConsoleQuery(query) {
  return (dispatch, getState) => {
    dispatch(setQuery(query));
    return dispatch(push('/console'))
  }
}


