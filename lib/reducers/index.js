import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import merge from 'lodash/merge'

import * as ActionTypes from '../constants/app'

import pagination from './pagination'
import sessionReducer from './session'
import transfersReducer from './transfers'
import layoutReducer from './layout'
import appReducer from './app'
import cafsReducer from './cafs'
import locals from './locals'
import editor from './editor'
import body from './body'

const initialEntitiesState = {
  app: {},
  session: {},
  datasets: {},
  body: {},
  search: {},
  transfers: {},
  cafs: {},
  datasetDryRuns: {}
}

// Updates an entity cache in response to any action with response.entities.
// see api middleware
function entities (state = initialEntitiesState, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  if (action.type === ActionTypes.REMOVE_MODEL) {
    const newState = merge({}, state)
    newState[action.schema.getKey()] = merge({}, newState[action.schema.getKey()])
    delete newState[action.schema.getKey()][action.id]
    return newState
  }

  return state
}

// Updates error message to notify about the failed fetches.
function errorMessage (state = null, action) {
  const { type, error, silentError } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error && !silentError) {
    return error
  }

  return state
}

function message (state = null, action) {
  const { type, message } = action

  if (type === ActionTypes.RESET_MESSAGE) {
    return null
  } else if (message) {
    return message
  }

  return state
}

export default (history) => combineReducers({
  entities,
  locals,
  pagination,
  errorMessage,
  message,
  editor,
  body,

  transfers: transfersReducer,
  session: sessionReducer,
  layout: layoutReducer,
  app: appReducer,
  cafs: cafsReducer,
  router: connectRouter(history)
})
