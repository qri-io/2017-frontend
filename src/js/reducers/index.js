import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
// import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import sessionReducer from './session'
import deviceReducer from './device'
import consoleReducer from './console'
import { combineReducers } from 'redux'

const initialState = {
  session : {},
  users : {},

  datasets : {},
  changes : {},
  migrations : {},
  
  queries : {},
  results : {}
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

// updates an entity cache in response to any actuion with response.local.
// see local middleware
function locals(state = initialState, action) {
  if (action.locals && action.locals.entities) {
    return merge({}, state, action.locals.entities)
  }

  if (action.type === ActionTypes.REMOVE_MODEL) {
    const newState = merge({}, state);
    newState[action.schema.getKey()] = merge({}, newState[action.schema.getKey()])
    delete newState[action.schema.getKey()][action.id]
    return newState
  }

  return state;
}

//
function message (state = null, action) {
  const { type, message } = action

  if (type === ActionTypes.SET_MESSAGE) {
    return null;
  } else if (message) {
    return message;
  }

  return state;
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

// Updates the pagination data for different actions.
// const pagination = combineReducers({
//   starredByUser: paginate({
//     mapActionToKey: action => action.login,
//     types: [
//       ActionTypes.STARRED_REQUEST,
//       ActionTypes.STARRED_SUCCESS,
//       ActionTypes.STARRED_FAILURE
//     ]
//   }),
//   stargazersByRepo: paginate({
//     mapActionToKey: action => action.fullName,
//     types: [
//       ActionTypes.STARGAZERS_REQUEST,
//       ActionTypes.STARGAZERS_SUCCESS,
//       ActionTypes.STARGAZERS_FAILURE
//     ]
//   })
// })

const rootReducer = combineReducers({
  entities,
  locals,
  // pagination,
  errorMessage,
  message,
  session : sessionReducer,
  console: consoleReducer,
  device : deviceReducer,
  routing
})

export default rootReducer