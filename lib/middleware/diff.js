/* globals __BUILD__ fetch */
import 'isomorphic-fetch'

// import { groupDiffByPath } from '../utils/diff'

export const API_ROOT = `${__BUILD__.API_URL}`

// Action key that carries API call info interpreted by this Redux middleware.
export const GET_DIFF = Symbol('Get A Diff')

// A Redux middleware that interprets actions with GET_DIFF info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const req = action[GET_DIFF]
  if (typeof req === 'undefined') {
    return next(action)
  }

  let { params } = req
  const { types, method = 'GET' } = req

  // if (typeof key === 'function') {
  //   key = key(store.getState())
  // }

  if (typeof params.src !== 'string') {
    throw new Error('Specify a src URL.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith (data) {
    const finalAction = Object.assign({}, action, data, { params })
    delete finalAction[GET_DIFF]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types

  // fire an action indicating a request has been made
  next(actionWith({ type: requestType }))

  // make the request
  return getDiff(method, params.src, params.dst, params.selector)
    .then(
      data => next(actionWith({
        type: successType,
        diff: data.data,
        diffStat: data.stat
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
          error: msg
        }))
      }
    )
}

// Fetches a content addressed response off the distributed web
// returns an ArrayBuffer that can be added to the state tree
function getDiff (method, src = '', dst = '', selector = '') {
  // let fullUrl = (key.indexOf(API_ROOT) === -1) ? API_ROOT + key : key
  const fullUrl = `${API_ROOT}/diff?left_path=${src}&right_path=${dst}&selector=${selector}`

  return fetch(fullUrl, {
    method: method,
    credentials: 'include'
  }).then(response => {
    return response.json().then(json => ({ json, response }))
  }).then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json)
    } else if (response.status === 204) {
      return {}
    }

    return {
      data: json.data,
      stat: json.meta.stat
    }
  })
}
