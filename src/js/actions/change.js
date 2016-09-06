import Schemas from '../schemas'
import { selectChangeByNumber } from '../selectors/change'
import { updateModel, newModel } from './models'

const CHANGE_NEW = 'CHANGE_NEW';
export function newChange (attributes={}) {
	return newModel(Schemas.CHANGE, CHANGE_NEW, attributes);
}

const CHANGE_UPDATE = 'CHANGE_UPDATE';
export function updateChange(change) {
	return updateModel(Schemas.CHANGE, CHANGE_UPDATE, change);
}

export const CHANGE_FETCH_REQUEST = 'CHANGE_FETCH_REQUEST';
export const CHANGE_FETCH_SUCCESS = 'CHANGE_FETCH_SUCCESS';
export const CHANGE_FETCH_FAIL = 'CHANGE_FETCH_FAIL';

export function fetchChange(id, requiredFields=[]) {
	return {
		[CALL_API] : {
			types : [ CHANGE_FETCH_REQUEST, CHANGE_FETCH_SUCCESS, CHANGE_FETCH_FAIL ],
			endpoint : `/changes/${id}`,
			schema : Schemas.CHANGE
		}
	}
}

export function loadChange(id, requiredFields=[]) {
	return (dispatch, getState) => {
		const change = getState().entities.changes[id];

		return fetchChange(id, requiredFields)
	}
}

export function fetchChangeByNumber(handle, slug, number, requiredFields=[]) {
	return {
		[CALL_API] : {
			types : [ CHANGE_FETCH_REQUEST, CHANGE_FETCH_SUCCESS, CHANGE_FETCH_FAIL ],
			endpoint : `/changes?dataset=${slug}&number=${number}`,
			schema : Schemas.CHANGE
		}
	}
}

export function loadChangeByNumber(handle, slug, number, requiredFields=[]) {
	return (dispatch, getState) => {
		const change = selectChangeByNumber(getState(), handle, slug, number);

		if (change && requiredFields.every(field => (change.hasOwnProperty(field)))) {
			return null
		}

		return fetchChangeByNumber(handle, slug, number, requiredFields);
	}
}

export const CHANGE_SAVE_REQUEST = 'CHANGE_SAVE_REQUEST';
export const CHANGE_SAVE_SUCCESS = 'CHANGE_SAVE_SUCCESS';
export const CHANGE_SAVE_FAIL = 'CHANGE_SAVE_FAIL';

export function saveChange(change) {
	return {
		[CALL_API] : {
			types : [ CHANGE_SAVE_REQUEST, CHANGE_SAVE_SUCCESS, CHANGE_SAVE_FAIL ],
			endpoint : change.id ? `/changes/${id}` : '/changes',
			method : 'POST',
			schema : Schemas.CHANGE,
		}
	}
}

export const CHANGE_DELETE_REQUEST = 'CHANGE_DELETE_REQUEST';
export const CHANGE_DELETE_SUCCESS = 'CHANGE_DELETE_SUCCESS';
export const CHANGE_DELETE_FAIL = 'CHANGE_DELETE_FAIL';

export function deleteChange(id) {
	return {
		[CALL_API] : {
			types : [ CHANGE_DELETE_REQUEST, CHANGE_DELETE_SUCCESS, CHANGE_DELETE_FAIL ],
			endpoint : `/changes/${id}`,
			method : 'DELETE',
			schema : Schemas.CHANGE
		}
	}
}