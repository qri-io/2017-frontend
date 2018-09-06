/* globals __BUILD__ fetch */
import 'isomorphic-fetch'

export const API_ROOT = `${__BUILD__.API_URL}`

// Fetches a content addressed response off the distributed web
// returns an ArrayBuffer that can be added to the state tree
function getCAD (method, hash) {
  let fullUrl = (hash.indexOf(API_ROOT) === -1) ? API_ROOT + hash : hash

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
export const GET_CAD = Symbol('Get Content Addressed Data')

// A Redux middleware that interprets actions with GET_CAD info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const cad = action[GET_CAD]
  if (typeof cad === 'undefined') {
    return next(action)
  }

  let { hash } = cad
  const { types, method = 'GET', silentError = false } = cad

  if (typeof hash === 'function') {
    hash = hash(store.getState())
  }

  if (typeof hash !== 'string') {
    throw new Error('Specify a string hash URL.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith (data) {
    const finalAction = Object.assign({}, action, data, { hash })
    delete finalAction[GET_CAD]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types

  // fire an action indicating a request has been made
  next(actionWith({ type: requestType }))

  // make the request
  return getCAD(method, hash)
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
