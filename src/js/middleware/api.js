import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

// Extracts the next page URL from Github API response.
// function getNextPageUrl(response) {
//   const link = response.headers.get('link')
//   if (!link) {
//     return null
//   }

//   const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
//   if (!nextLink) {
//     return null
//   }

//   return nextLink.split(';')[0].slice(1, -1)
// }

// const API_ROOT = 'https://api.github.com/'

const API_ROOT = __BUILD__.API_URL

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(method, endpoint, schema, data) {
  let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  let body

  // add query params to GET requests listed on data
  if (data && method == "GET") {
    let addedFirst = false
    Object.keys(data).forEach((key, i) => {
      const val = encodeURIComponent(data[key])
      if (val != "") {
        fullUrl += (addedFirst) ? `&${key}=${val}` : `?${key}=${val}`
        addedFirst = true
      }
    })
  } else if (data) {
    body = JSON.stringify(data)
  }

  return fetch(fullUrl, {
    method : method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body
  })
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json)
      // TODO - remove this uglyness
      const data = (schema._key == resultSchema._key) ? camelizedJson : camelizedJson.data
      // const nextPageUrl = getNextPageUrl(response)

      return Object.assign({},
        normalize(data, schema)
        // { nextPageUrl }
      )
    })
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

const userSchema = new Schema('users');
const organizationSchema = new Schema('organizations');
const datasetSchema = new Schema('datasets');
// const schemaSchema = new Schema('schemas');
const querySchema = new Schema('query');
const resultSchema = new Schema('results', {
  idAttribute : (result) => "result"
});

organizationSchema.define({
  datasets : datasetSchema
});

datasetSchema.define({
  owner: userSchema
});

// Schemas for Github API responses.
export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  ORGANIZATION: organizationSchema,
  ORGANIZATION_ARRAY: arrayOf(organizationSchema),
  DATASET : datasetSchema,
  DATASET_ARRAY : arrayOf(datasetSchema),
  QUERY : querySchema,
  QUERY_ARRAY: arrayOf(querySchema),
  RESULT : resultSchema
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types, data, method="GET" } = callAPI

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

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(method, endpoint, schema, data).then(
    response => next(actionWith({
      type: successType,
      response
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}