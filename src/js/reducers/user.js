import {  USER_ADD_HISTORY_ENTRY } from '../actions/user'

const initialState = {
	history : [],
}

export default function userReducer(state=initialState, action) {
	switch (action.type) {
		case USER_ADD_HISTORY_ENTRY:
			return Object.assign({}, state, { history : [action.value].concat(state.history) });
	}

	return state
}