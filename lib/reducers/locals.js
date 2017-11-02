import * as ActionTypes from '../actions/app'

const initialState = {
  invites: {},
  queries: {},
  namespace: {},
  migrations: {},
  changes: {},
  roles: {}
}

// updates an entity cache in response to any actuion with response.local.
// see local middleware
export default function locals (state = initialState, action) {
  if (action.locals && action.locals.entities) {
    return Object.assign({}, state, action.locals.entities)
  }

  if (action.type === ActionTypes.REMOVE_MODEL) {
    const newState = Object.assign({}, state)
    newState[action.schema.getKey()] = Object.assign({}, newState[action.schema.getKey()])
    delete newState[action.schema.getKey()][action.id]
    return newState
  }
  // TODO - remove local model action?

  return state
}
