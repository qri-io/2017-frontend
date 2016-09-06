import { MODEL_ACTION, NEW_MODEL, UPDATE_MODEL, EDIT_MODEL, CLEAR_NEW_MODEL } from '../middleware/models';


export function newModel(schema, type, attributes={}) {
	return {
		[MODEL_ACTION] : {
			method : NEW_MODEL,
			type,
			schema,
			attributes
		}
	}
}

export function clearNewModel(schema, type) {
	return {
		[MODEL_ACTION] : {
			method : CLEAR_NEW_MODEL,
			type,
			schema
		}
	}
}

export function updateModel(schema, type, attributes) {
	return {
		[MODEL_ACTION] : {
			method : UPDATE_MODEL,
			type,
			schema,
			attributes,
		}
	}
}

export function editModel(schema, type, id) {
	return {
		[MODEL_ACTION] : {
			method : EDIT_MODEL,
			type,
			id
		}
	}
}