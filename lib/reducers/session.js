import { SESSION_USER_SUCCESS, SESSION_USER_FAILURE, EDIT_SESSION_USER } from '../constants/session'

const initialState = {
  requestedSession: false,
  history: []
}

export default function sessionReducer (state = initialState, action) {
  switch (action.type) {
    case SESSION_USER_SUCCESS:
    case SESSION_USER_FAILURE:
    case EDIT_SESSION_USER:
      return Object.assign({}, state, { requestedSession: true })
    default:
      return state
  }
}
