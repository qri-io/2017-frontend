import { SELECT, DESELECT } from '../actions/selection'

const initialState = {
}

export default function selectionReducer(state=initialState, action) {
	switch (action.type) {
		case SELECT:
			return Object.assign(action.selection);
		case DESELECT:
			return Object.assign({});
	}

	return state;
}
