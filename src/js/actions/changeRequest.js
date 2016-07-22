import Schemas from '../middleware/Schema';

export const NEW_CHANGE_REQUEST = 'NEW_CHANGE_REQUEST';

export function newChangeRequest (dataset) {
	return {
		type : NEW_CHANGE_REQUEST,
		datasetId : dataset.id
	}
}


export const CHANGE_REQUEST_SAVE_REQUEST = 'CHANGE_REQUEST_SAVE_REQUEST';
export const CHANGE_REQUEST_SAVE_SUCCESS = 'CHANGE_REQUEST_SAVE_SUCCESS';
export const CHANGE_REQUEST_SAVE_FAILURE = 'CHANGE_REQUEST_SAVE_FAILURE';

export function saveChangeRequest () {
	return {
		[CALL_API] : {
			types : [ CHANGE_REQUEST_SAVE_REQUEST, CHANGE_REQUEST_SAVE_SUCCESS, CHANGE_REQUEST_SAVE_FAILURE ],
			schema : Schemas.CHANGE_REQUEST,
		}
	}
}
