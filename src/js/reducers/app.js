import { APP_TOGGLE_MENU, APP_HIDE_MENU } from '../actions/app'

const initialState = {
	showMenu : false
}

export default function appReducer (state=initialState, action) {
	switch (action.type) {
		case APP_TOGGLE_MENU:
			return Object.assign({}, state, { showMenu : !state.showMenu });
		case APP_HIDE_MENU:
			return Object.assign({}, state, { showMenu : false });
		// whenever the route changes, close the menu
		case "@@router/LOCATION_CHANGE":
			return Object.assign({}, state, { showMenu : false });
	}

	return state;
}