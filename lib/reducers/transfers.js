// transfering -1 for err
//  0 nothing transfered yet
// btw 0 & 1 percentage
// if greater than 1, loading complete

// see if id is in object
// get status of transfer
// add transfer to object
// update transfer progress
// remove transfer

import {
  ADD_TRANSFER,
  UPDATE_TRANSFER,
  REMOVE_TRANSFER
} from '../constants/transfers'

const initialState = {
}

export default function transfersReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_TRANSFER:
      if (!Object.keys(state).find(e => e === action.id)) {
        return Object.assign({}, state, {[action.id]: 0})
      }
      break
    case UPDATE_TRANSFER:
      if (Object.keys(state).find(e => e === action.id)) {
        return Object.assign({}, state, {[action.id]: action.status})
      }
      break
    case REMOVE_TRANSFER:
      return Object.keys(state)
        .filter(e => e !== action.id)
        .reduce((obj, key) => {
          obj[key] = state[key]
          return obj
        }, {})
  }

  return state
}
