import {  SESSION_USER_SUCCESS, SESSION_USER_FAILURE, SESSION_LOGIN_SUCCESS } from '../actions/session'

const initialState = {
	requestedSession : false,
}

export default function sessionReducer(state=initialState, action) {
	switch (action.type) {
		case SESSION_USER_SUCCESS:
		case SESSION_USER_FAILURE:
		case SESSION_LOGIN_SUCCESS:
			return Object.assign({}, state, { requestedSession : true });
	}

	return state
}