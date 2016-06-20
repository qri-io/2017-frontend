import { CALL_API, Schemas } from '../middleware/api'
import { setBottomPanel } from './console'

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
    dispatch({
      [CALL_API]: {
        types: [ QUERY_REQUEST, QUERY_SUCCESS, QUERY_FAILURE ],
        endpoint: `/query`,
        method: 'POST',
        data : query,
        schema: Schemas.RESULT
      }
    });
  }
}