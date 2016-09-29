import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'
import { setBottomPanel } from './console'
import { addHistoryEntry } from './session'


let queryId = 1

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
export function runQuery(query, page=1, pageSize=200) {
  return (dispatch, getState) => {

    analytics.track("Submitted Query", {
      query : query,
      page : page,
      pageSize : pageSize
    });

    dispatch(setBottomPanel(0));
    dispatch(addHistoryEntry(query));
    return dispatch({
      [CALL_API]: {
        types: [ QUERY_REQUEST, QUERY_SUCCESS, QUERY_FAILURE ],
        endpoint: `/select`,
        method: 'POST',
        data : { query, page, pageSize },
        schema: Schemas.RESULT
      },
      statement : query.statement,
      page,
      pageSize
    });
  }
}

export const QUERY_DOWNLOAD_REQUEST = 'QUERY_DOWNLOAD_REQUEST'
export const QUERY_DOWNLOAD_SUCCESS = 'QUERY_DOWNLOAD_SUCCESS'
export const QUERY_DOWNLOAD_FAILURE = 'QUERY_DOWNLOAD_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function downloadQuery(query) {
  return (dispatch, getState) => {

    analytics.track("Download Query", {
      query,
    });

    dispatch(setBottomPanel(0));
    dispatch(addHistoryEntry(query));
    return dispatch({
      [CALL_API]: {
        types: [ QUERY_DOWNLOAD_REQUEST, QUERY_DOWNLOAD_SUCCESS, QUERY_DOWNLOAD_FAILURE ],
        endpoint: `/select`,
        method: 'POST',
        data : { query, format : 'csv', download : true },
        schema: Schemas.RESULT
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


