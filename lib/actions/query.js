/* globals analytics */
import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'

import Schemas from '../schemas'
import { addHistoryEntry } from './session'

import { selectQueryBySlug } from '../selectors/query'
import { loadDatasetData } from './dataset'

import {
  QUERY_SET,
  QUERY_SET_RESULTS,
  QUERY_RESET_RESULTS,
  QUERY_RUN_REQUEST,
  QUERY_RUN_SUCCESS,
  QUERY_RUN_FAILURE,
  QUERY_REQUEST,
  QUERY_SUCCESS,
  QUERY_FAILURE,
  QUERIES_REQUEST,
  QUERIES_SUCCESS,
  QUERIES_FAILURE
} from '../constants/query'

export function setQuery (value) {
  return {
    type: QUERY_SET,
    value: value
  }
}

export function setQueryResults (path) {
  return {
    type: QUERY_SET_RESULTS,
    value: path
  }
}

export function resetQueryResults () {
  return {
    type: QUERY_RESET_RESULTS
  }
}

export function runQuery (request, callback) {
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
    }
    dispatch(addHistoryEntry(request.queryString))
    return dispatch({
      [CALL_API]: {
        types: [ QUERY_RUN_REQUEST, QUERY_RUN_SUCCESS, QUERY_RUN_FAILURE ],
        endpoint: '/run',
        method: 'POST',
        schema: Schemas.QUERY,
        silentError: true,
        data
      }
    }).then(action => {
      // Dismiss errors after 3.8 seconds
      if (action.type === QUERY_RUN_FAILURE) {
        console.log(`QUERY_RUN_FAILURE: ${action.error}`)
        callback(action.error)
      } else if (action.type === QUERY_RUN_SUCCESS) {
        dispatch(setQueryResults(action.response.result.data))
        dispatch(loadDatasetData(action.response.result.data, callback))
      }

      return null
    })
  }
}

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

export function fetchQueries (page = 1, pageSize = 30) {
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

export function loadQueries (page = 1, pageSize = 30) {
  return (dispatch, getState) => {
    // TODO - check pagination
    return dispatch(fetchQueries(page, pageSize))
  }
}

export function toConsoleQuery (query) {
  return (dispatch, getState) => {
    dispatch(setQuery(query))
    return dispatch(push(`/console?q=${query.slug}`))
  }
}
