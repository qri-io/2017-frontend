/* globals FormData __BUILD__ fetch */
import { normalize } from 'normalizr'
import 'isomorphic-fetch'

export const API_ROOT = `${__BUILD__.API_URL}`

// Fetches a response and places the result into the state tree according to schema.
function getCAD (method, endpoint, schema) {
  let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl, {
    method: method,
    credentials: 'include'
  })
    .then(response => {
      console.log('in getCAD func')
      console.log(response.body)
      // if (!response.ok) {
      //   return Promise.reject(response.body)
      // } else if (response.status === 204) {
      //   return {}
      // }

      // // const { data } = json

      // return Object.assign({},
      //   normalize(json, { data: schema })
      //   // { nextPageUrl }
      // )
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

  let { endpoint } = cad
  const { schema, types, method = 'GET', silentError = false } = cad

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
    delete finalAction[GET_CAD]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types

  // fire an action indicating a request has been made
  next(actionWith({ type: requestType }))

  // make the request
  return getCAD(method, endpoint, schema)
    .then(
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
