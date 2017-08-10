

export const LAYOUT_RESIZE = 'LAYOUT_RESIZE'

export function layoutResize(width,height) {
	return {
		type : LAYOUT_RESIZE,
		stage : { width, height }
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

export const LAYOUT_HIDE_COMMANDBAR = "LAYOUT_HIDE_COMMANDBAR";

export function hideCommandBar() {
	return {
		type: LAYOUT_HIDE_COMMANDBAR,
	}
}

export const LAYOUT_SHOW_COMMANDBAR = "LAYOUT_SHOW_COMMANDBAR";

export function showCommandBar() {
	
}


export const LAYOUT_SET = "LAYOUT_SET";
export function setLayout({ navbar=false, sidebar=false, commandbar=true}) {
	return {
		type : LAYOUT_SET,
		navbar : { navbar },
		sidebar : { sidebar },
		commandbar : { commandbar },
	}
}