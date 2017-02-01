import { API_ROOT } from './api'
import 'isomorphic-fetch'
import { saveAs } from 'file-saver'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function execQuery(query, page, pageSize) {
  return fetch(`${API_ROOT}/select?page=${page}&pageSize=${pageSize}`, {
    method : 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body : JSON.stringify({ query : query.statement, page, pageSize })
  })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json;
    });
}

function fileName(query) {
  const date = new Date();
  return `qri.io-results-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}.csv`
}

function downloadQuery(query) {
  return fetch(`${API_ROOT}/select?download=true&format=csv`, {
    method : 'POST',
    headers : {
      'Accept' : 'text/csv',
      'Content-Type': 'application/json'
    },
    credentials : 'include',
    body : JSON.stringify({ query, download : true, format : 'csv' })
  })
    .then(response => response.blob().then(blob => ({ blob, response})))
    .then(({ blob, response }) => {
      if (!response.ok) {
        return Promise.reject(response)
      }
      
      saveAs(blob, fileName(query))
      return { schema : [], data : [], downloaded : true }
    })
}

// Action key that carries API call info interpreted by this Redux middleware.
export const RUN_QUERY = Symbol('RUN_QUERY')

// A Redux middleware that interprets actions with RUN_QUERY info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const runQuery = action[RUN_QUERY]
  if (typeof runQuery === 'undefined') {
    return next(action)
  }

  const { types, request } = runQuery;
  const { query, page, pageSize, download=false } = request

  if (typeof query != "object") {
    throw new Error("query must be an object")
  }
  
  if (typeof page !== 'number') {
    throw new Error('Specify a query page')
  }

  if (typeof pageSize !== 'number') {
    throw new Error('Specify a query pageSize')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[RUN_QUERY]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types

  // fire an action indicating a request has been made
  next(actionWith({ type: requestType, request }));

  if (download) {
    return downloadQuery(query).then(
      response => next(actionWith({
        type : successType,
        request,
        response
      })),
      error => {
        var msg = 'Something Bad Happened' 
        if (error.meta && error.meta.error) {
          msg = error.meta.error
        }
        return next(actionWith({
          type: failureType, 
          error: msg,
          request
        }))
      }
      )
    }

  // make the request
  return execQuery(query, page, pageSize).then(
    response => next(actionWith({
      type: successType,
      request,
      response
    })),
    error => {
      var msg = 'Something Bad Happened' 
      if (error.meta && error.meta.error) {
        msg = error.meta.error
      }
      return next(actionWith({
        type: failureType, 
        error: msg,
        request
      }))
    }
  )
}