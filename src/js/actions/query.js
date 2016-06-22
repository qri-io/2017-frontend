import { CALL_API, Schemas } from '../middleware/api'
import { setBottomPanel } from './console'
import { addHistoryEntry } from './user'

export const QUERY_SET = 'QUERY_SET'

export function setQuery(value) {
	return {
		type : QUERY_SET,
		value : value
	}
}

export const QUERY_REQUEST = 'QUERY_REQUEST'
export const QUERY_SUCCESS = 'QUERY_SUCCESS'
export const QUERY_FAILURE = 'QUERY_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function runQuery(query) {
  return (dispatch, getState) => {
    dispatch(setBottomPanel(0));
    dispatch(addHistoryEntry(query));
    return dispatch({
      [CALL_API]: {
        types: [ QUERY_REQUEST, QUERY_SUCCESS, QUERY_FAILURE ],
        endpoint: `/select`,
        method: 'POST',
        data : query,
        schema: Schemas.RESULT
      }
    });
  }
}


export const QUERIES_REQUEST = 'QUERIES_REQUEST'
export const QUERIES_SUCCESS = 'QUERIES_SUCCESS'
export const QUERIES_FAILURE = 'QUERIES_FAILURE'

export function fetchQueryPage(page=1, pageSize=20) {
  return {
    [CALL_API] : {
      types : [QUERIES_REQUEST, QUERIES_SUCCESS, QUERIES_FAILURE],
      endpoint : '/queries',
      data : { page, pageSize },
      schema : Schemas.QUERY_ARRAY
    }
  }
}

export function loadQueryPage(page, pageSize) {
  return (dispatch, getState) => {
    // TODO - check pagination
    return dispatch(fetchQueryPage(page, pageSize));
  }
}


