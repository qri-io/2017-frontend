/* globals analytics */
import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'

import Schemas from '../schemas'
import { setBottomPanel } from './console'
import { addHistoryEntry } from './session'
import { resetErrorMessage } from './app'

import { selectQueryBySlug } from '../selectors/query'
import { loadDatasetData } from './dataset'

export const QUERY_SET = 'QUERY_SET'

export function setQuery (value) {
  return {
    type: QUERY_SET,
    value: value
  }
}

export const QUERY_SET_RESULTS = 'QUERY_SET_RESULTS'

export function setQueryResults (path) {
  return {
    type: QUERY_SET_RESULTS,
    value: path
  }
}

export const QUERY_RUN_REQUEST = 'QUERY_RUN_REQUEST'
export const QUERY_RUN_SUCCESS = 'QUERY_RUN_SUCCESS'
export const QUERY_RUN_FAILURE = 'QUERY_RUN_FAILURE'

export function runQuery (request) {
  // add in defaults
  // request = Object.assign({
  //   page : 1,
  //   pageSize : 200
  // }, request);

  const data = {
    querySyntax: 'sql',
    queryString: request.queryString
  }

  return (dispatch, getState) => {
    analytics.track('Submitted Query', data)

    if (!request.download) {
      dispatch(setBottomPanel(0))
    }

    dispatch(addHistoryEntry(request.query))
    return dispatch({
      [CALL_API]: {
        types: [ QUERY_RUN_REQUEST, QUERY_RUN_SUCCESS, QUERY_RUN_FAILURE ],
        endpoint: '/run',
        method: 'POST',
        schema: Schemas.DATASET,
        data
      }
    }).then(action => {
      // Dismiss errors after 3.8 seconds
      if (action.type === QUERY_RUN_FAILURE) {
        setTimeout(() => {
          dispatch(resetErrorMessage())
        }, 3800)
      } else if (action.type === QUERY_RUN_SUCCESS) {
        dispatch(setQueryResults(action.response.result))
        dispatch(loadDatasetData(action.response.result, 1, 100))
      }

      return null
    })
  }
}

export const QUERY_REQUEST = 'QUERY_REQUEST'
export const QUERY_SUCCESS = 'QUERY_SUCCESS'
export const QUERY_FAILURE = 'QUERY_FAILURE'

export function fetchQueryBySlug (slug = '') {
  return {
    [CALL_API]: {
      types: [ QUERY_REQUEST, QUERY_SUCCESS, QUERY_FAILURE ],
      endpoint: '/queries',
      method: 'GET',
      schema: Schemas.QUERY,
      data: { slug }
    }
  }
}

export function loadQueryBySlug (slug = '', requiredFields = [], setOnLoad = false) {
  return (dispatch, getState) => {
    const q = selectQueryBySlug(getState(), slug)
    if (q && requiredFields.every(key => q.hasOwnProperty(key))) {
      if (setOnLoad) {
        return dispatch(setQuery(q))
      }
      return null
    }

    return dispatch(fetchQueryBySlug(slug))
      .then(action => {
        if (action.type === QUERY_SUCCESS && setOnLoad) {
          return dispatch(setQuery(action.response.entities.queries[action.response.result]))
        }

        return null
      })
  }
}

export const QUERIES_REQUEST = 'QUERIES_REQUEST'
export const QUERIES_SUCCESS = 'QUERIES_SUCCESS'
export const QUERIES_FAILURE = 'QUERIES_FAILURE'

export function fetchQueryPage (page = 1, pageSize = 30) {
  return {
    [CALL_API]: {
      types: [QUERIES_REQUEST, QUERIES_SUCCESS, QUERIES_FAILURE],
      endpoint: '/queries',
      data: { page, pageSize },
      schema: Schemas.QUERY_ARRAY
    },
    page,
    pageSize
  }
}

export function loadQueryPage (page = 1, pageSize = 30) {
  return (dispatch, getState) => {
    // TODO - check pagination
    return dispatch(fetchQueryPage(page, pageSize))
  }
}

export function toConsoleQuery (query) {
  return (dispatch, getState) => {
    dispatch(setQuery(query))
    return dispatch(push(`/console?q=${query.slug}`))
  }
}
