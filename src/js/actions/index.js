
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export const SET_MESSAGE = 'SET_MESSAGE';

export function setMessage(message) {
	return {
		type : SET_MESSAGE,
		message
	}
}

export const RESET_MESSAGE = 'RESET_MESSAGE';
export function resetMessage() {
	return {
		type : RESET_MESSAGE
	}
}

export const REMOVE_MODEL = "REMOVE_MODEL"
export function removeModel(schema, id) {
	return {
		type : REMOVE_MODEL,
		schema,
		id
	}
}