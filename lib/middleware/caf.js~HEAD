/* globals __BUILD__ fetch */
import 'isomorphic-fetch'

export const API_ROOT = `${__BUILD__.API_URL}`

// Fetches a content addressed response off the distributed web
// returns an ArrayBuffer that can be added to the state tree
function getCAF (method, key) {
  let fullUrl = (key.indexOf(API_ROOT) === -1) ? API_ROOT + key : key

  return fetch(fullUrl, {
    method: method,
    credentials: 'include'
  }).then(response => {
    return response.arrayBuffer().then(buffer => ({ buffer, response }))
  }).then(({ buffer, response }) => {
    if (!response.ok) {
      return Promise.reject(buffer)
    } else if (response.status === 204) {
      return {}
    }

    return buffer
  })
}

// Action key that carries API call info interpreted by this Redux middleware.
export const GET_CAF = Symbol('Get Content Addressed Data')

// A Redux middleware that interprets actions with GET_CAF info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const caf = action[GET_CAF]
  if (typeof caf === 'undefined') {
    return next(action)
  }

  let { key } = caf
  const { types, method = 'GET', silentError = false } = caf

  if (typeof key === 'function') {
    key = key(store.getState())
  }

  if (typeof key !== 'string') {
    throw new Error('Specify a string key URL.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith (data) {
    const finalAction = Object.assign({}, action, data, { key })
    delete finalAction[GET_CAF]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types

  // fire an action indicating a request has been made
  next(actionWith({ type: requestType }))

  // make the request
  return getCAF(method, key)
    .then(
      data => next(actionWith({
        type: successType,
        data
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
