

export const CONSOLE_SET_TOP_PANEL = 'CONSOLE_SET_TOP_PANEL';

export function setTopPanel(index) {
	return {
		type : CONSOLE_SET_TOP_PANEL,
		value : index
	}
}

export const CONSOLE_SET_BOTTOM_PANEL = 'CONSOLE_SET_BOTTOM_PANEL';

export function setBottomPanel(index) {
	return {
		type : CONSOLE_SET_BOTTOM_PANEL,
		value : index
	}
}