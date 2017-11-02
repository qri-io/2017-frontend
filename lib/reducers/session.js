import { SESSION_USER_SUCCESS, SESSION_USER_FAILURE, SESSION_LOGIN_SUCCESS, SESSION_ADD_HISTORY_ENTRY } from '../constants/session'

const initialState = {
  requestedSession: false,
  history: []
}

export default function sessionReducer (state = initialState, action) {
  switch (action.type) {
    case SESSION_USER_SUCCESS:
    case SESSION_USER_FAILURE:
    case SESSION_LOGIN_SUCCESS:
      return Object.assign({}, state, { requestedSession: true })
    case SESSION_ADD_HISTORY_ENTRY:
      return Object.assign({}, state, { history: [action.value].concat(state.history) })
  }

  return state
}
