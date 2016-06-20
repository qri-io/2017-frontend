import { QUERY_SET } from '../actions/query'
import { CONSOLE_SET_TOP_PANEL, CONSOLE_SET_BOTTOM_PANEL } from '../actions/console'

const initialState = {
	context : "",
	query : "",
	topPanelIndex : 0,
	bottomPanelIndex: 2
}

export default function consoleReducer (state=initialState, action) {
	switch (action.type) {
		case QUERY_SET:
			return Object.assign({}, state, { query : action.value });
		case CONSOLE_SET_TOP_PANEL:
			return Object.assign({}, state, { topPanelIndex : action.value });
		case CONSOLE_SET_BOTTOM_PANEL:
			return Object.assign({}, state, { bottomPanelIndex : action.value });
	}

	return state;
}