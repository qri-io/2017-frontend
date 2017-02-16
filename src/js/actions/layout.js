

export const LAYOUT_RESIZE = 'LAYOUT_RESIZE'

export function layoutResize(w,h) {
	return {
		type : LAYOUT_RESIZE,
		stage : { w, h }
	}
}

export const LAYOUT_SHOW_SIDEBAR = "LAYOUT_SHOW_SIDEBAR";

export function showSidebar() {
	return {
		type : LAYOUT_SHOW_SIDEBAR
	}
}

export const LAYOUT_HIDE_SIDEBAR = "LAYOUT_HIDE_SIDEBAR";

export function hideSidebar() {
	return {
		type : LAYOUT_HIDE_SIDEBAR
	}
}