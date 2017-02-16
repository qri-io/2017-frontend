import { LAYOUT_RESIZE } from '../actions/layout'

const COLLAPSED_W = 0;

const initialState = {
	size : 'xs',
	stage : { w : 0, h : 0 },
	navbar : { w : 0, h : 80, l : 0, t : 0 },
	main : { w : 0, h : 0, l : 0, t : 0 },
	sidebar : {  w : COLLAPSED_W, h : 0, l : 0, t : 0, collapsed : true, pct_w : 0.35 },
}

export default function deviceReducer(state=initialState, action) {
	switch (action.type) {
		case LAYOUT_RESIZE:
			return layout(Object.assign({}, state, action));
	}

	return state;
}

function layout(state) {
	const { stage, navbar, main, sidebar } = state;

	return {
		size : sizeClass(state.stage.w),
		stage,
		navbar : { w : stage.w, h : navbar.h, l : 0, t : 0 },
		main : { 
			w : sidebar.collapsed ? stage.w - COLLAPSED_W : stage.w * (1 - sidebar.pct_W),
			h : stage.h - navbar.h, 
			l : 0, t : 0
		},
		sidebar : {
			w : sidebar.collapsed ? COLLAPSED_W : stage.w * sidebar.pct_W, 
			h : stage.h - navbar.h,
			l : sidebar.collapsed ? stage.w - COLLAPSED_W : stage.w * (1 - sidebar.pct_W), 
			t : navbar.h,
			collapsed : sidebar.collapsed,
			pct : state.pct_W
		},
	}
}

// @return {string} string representation of window size class
function sizeClass(w) {
	if (w >= 1200) {
		return 'xl';
	} else if (w >= 992) {
		return 'lg';
	} else if (w >= 768) {
		return 'md';
	} else if (w >= 544) {
		return 'sm'
	} else {
		return 'xs'
	}
}