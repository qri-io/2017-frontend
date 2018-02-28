import { REMOVE_MODEL } from '../constants/app'

const initialState = {
  datasets: {}
}

// updates an entity cache in response to any actuion with response.local.
// see local middleware
export default function locals (state = initialState, action) {
  if (action.locals && action.locals.entities) {
    for (const key in action.locals.entities) {
      if (!action.locals.entities[key]) {
        return state
      }
    }
    return Object.assign({}, state, action.locals.entities)
  }

  if (action.type === REMOVE_MODEL && action.schema && action.id) {
    const newState = Object.assign({}, state)
    newState[action.schema.key] = Object.assign({}, newState[action.schema.key])
    delete newState[action.schema.key][action.id]
    return newState
  }
  // TODO - remove local model action?

  return state
}
