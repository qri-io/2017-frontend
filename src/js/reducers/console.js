import { QUERY_SET } from '../actions/query'

const initialState = {
	context : "",
	query : ""
}

export default function consoleReducer (state=initialState, action) {
	switch (action.type) {
		case QUERY_SET:
			return Object.assign({}, state, { query : action.value });
	}

	return state;
}