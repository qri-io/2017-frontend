/*
 Selections are "highlights", or placing focus on an object or set of objects
*/

// a list of constants for all types of things that can be selected
export const selectionTypes = {
	DATASET : "DATASET",
}

export const SELECT = "SELECT";

export function select(type, value) {
	return { 
		type : SELECT,
		selection : {
			type,
			value,
		}
	}
}

export const DESELECT = "DESELECT";

export function deselect() {
	return {
		type : DESELECT
	}
}