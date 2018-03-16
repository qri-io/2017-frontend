import { SESSION_PEER_SUCCESS } from '../constants/session'

const initialState = ''

export default function sessionReducer (state = initialState, action) {
  switch (action.type) {
    case SESSION_PEER_SUCCESS:
      return action && action.response && action.response.result && action.response.result.data
    default:
      return state
  }
}
