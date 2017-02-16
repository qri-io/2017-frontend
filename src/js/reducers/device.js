import { DEVICE_RESIZE } from '../actions/device'

const initialState = {
	size : 'xs',
	width : 0,
	height : 0,
}

export default function deviceReducer(state=initialState, action) {

	switch (action.type) {
		case DEVICE_RESIZE:
			return Object.assign({}, state, { size : sizeClass(action.value.width) }, action.value);
	}

	return state;
}

// @return {string} string representation of window size class
function sizeClass(width) {
	if (width >= 1200) {
		return 'xl';
	} else if (width >= 992) {
		return 'lg';
	} else if (width >= 768) {
		return 'md';
	} else if (width >= 544) {
		return 'sm'
	} else {
		return 'xs'
	}
}