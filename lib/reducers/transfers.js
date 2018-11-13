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
  SET_TRANSFER_STATUS,
  REMOVE_TRANSFER_STATUS
} from '../constants/transfers'

const initialState = {
}

export default function transfersReducer (state = initialState, action) {
  switch (action.type) {
    case SET_TRANSFER_STATUS:
      return Object.assign({}, state, { [action.id]: action.status })
    case REMOVE_TRANSFER_STATUS:
      return Object.keys(state)
        .filter(e => e !== action.id)
        .reduce((obj, key) => {
          obj[key] = state[key]
          return obj
        }, {})
  }

  return state
}
