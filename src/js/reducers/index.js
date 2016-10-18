import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'

import * as ActionTypes from '../actions/app'

import pagination from './pagination'
import sessionReducer from './session'
import deviceReducer from './device'
import consoleReducer from './console'
import appReducer from './app'
import resultsReducer from './results'
import locals from './locals'

const initialState = {
  app : {},

  session : {},
  users : {},

  datasets : {},
  changes : {},
  migrations : {},
  
  queries : {},
}

// Updates an entity cache in response to any action with response.entities.
// see api middleware
function entities(state = initialState, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  if (action.type === ActionTypes.REMOVE_MODEL) {
    const newState = merge({}, state);
    newState[action.schema.getKey()] = merge({}, newState[action.schema.getKey()])
    delete newState[action.schema.getKey()][action.id]
    return newState
  }

  return state
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error, silentError } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error && !silentError) {
    return error
  }

  return state
}

function message(state = null, action) {
  const { type, message } = action

  if (type === ActionTypes.RESET_MESSAGE) {
    return null
  } else if (message) {
    return message;
  }

  return state
}

const rootReducer = combineReducers({
  entities,
  locals,
  pagination,
  errorMessage,
  message,

  session : sessionReducer,
  console: consoleReducer,
  device : deviceReducer,
  app : appReducer,
  results : resultsReducer,
  routing
})

export default rootReducer