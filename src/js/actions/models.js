import { MODEL_ACTION, CREATE_MODEL, UPDATE_MODEL, CLEAR_NEW_MODEL } from '../middleware/models';


export function createModel(schema, model={}) {
	return {
		[MODEL_ACTION] : {
			type : CREATE_MODEL,
			schema,
			model
		}
	}
}

export function clearNewModel(schema) {
	return {
		[MODEL_ACTION] : {
			type : CLEAR_NEW_MODEL,
			schema
		}
	}
}

export function updateModel(schema, model={}) {
	return {
		[MODEL_ACTION] : {
			type : UPDATE_MODEL,
			schema,
			model
		}
	}
}