/* globals FormData __BUILD__ fetch */
import { normalize } from 'normalizr'
import 'isomorphic-fetch'

export const API_ROOT = `${__BUILD__.API_URL}`

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi (method, endpoint, schema, data, files = {}) {
  let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  let headers, body

  // if files is provided, let's submit via form data
  if (Object.keys(files).length !== 0 && files.constructor === Object) {
    let fd = new FormData()

    Object.keys(files).forEach((key, i) => {
      if (files[key]) {
        if (files[key][0]) {
          return fd.append(key, files[key][0])
        } else if (files[key].type) {
          // js File object
          return fd.append(key, files[key])
        }
      }
    })

    Object.keys(data).forEach((key, i) => {
      fd.append(key, data[key])
    })

    body = fd
  } else if (data && method === 'GET') {
    // add query params to GET requests listed on data
    let addedFirst = false
    Object.keys(data).forEach((key, i) => {
      const val = encodeURIComponent(data[key])
      if (val !== '') {
        fullUrl += (addedFirst) ? `&${key}=${val}` : `?${key}=${val}`
        addedFirst = true
      }
    })
  } else if (data) {
    headers = {
      'Accept': 'application/json',
      // 'Content-Type': ContentType,
      'Content-Type': 'application/json'
    }

    body = JSON.stringify(data)
  }

  return fetch(fullUrl, {
    method: method,
    credentials: 'include',
    headers,
    body
  })
    .then(response => {
      return response.json().then(json => ({ json, response }))
    }).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      } else if (response.status === 204) {
        return {}
      }

      // const { data } = json

      return Object.assign({},
        normalize(json, { data: schema })
        // { nextPageUrl }
      )
    })
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    if (action[PING_API] === true) {
      return pingMiddleware(next)
    }
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types, data, files, method = 'GET', silentError = false } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith (data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types

  // fire an action indicating a request has been made
  next(actionWith({ type: requestType }))

  // make the request
  return callApi(method, endpoint, schema, data, files).then(
    response => next(actionWith({
      type: successType,
      response
    })),
    error => {
      var msg = 'Something Bad Happened'
      if (error.meta && error.meta.error) {
        msg = error.meta.error
      } else {
        msg = error.toString()
      }
      return next(actionWith({
        type: failureType,
        error: msg,
        silentError
      }))
    }
  )
}

export const PING_API = Symbol('Ping API')
export const PING_API_REQUEST = 'PING_API_REQUEST'
export const PING_API_SUCCESS = 'PING_API_SUCCESS'
export const PING_API_FAILURE = 'PING_API_FAILURE'

function pingMiddleware (next) {
  next({ type: PING_API_REQUEST })
  return pingApi().then(
    res => next({
      type: PING_API_SUCCESS
    }),
    () => next({
      type: PING_API_FAILURE
    })
  )
}

function pingApi () {
  return fetch(`${API_ROOT}/status`, {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => {
      return response.json().then(json => ({ json, response }))
    }).then(({ json, response }) => {
      // if (!response.ok) {
      // return Promise.reject(json)
      // } else
      if (!response.ok || response.status !== 200) {
        return {}
      }
      return json
    })
}
