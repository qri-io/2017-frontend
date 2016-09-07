import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'

import { selectChangeByNumber, selectChangeById } from '../selectors/change'
import { setMessage, resetMessage, removeModel } from './index'
import { updateLocalModel, newLocalModel, editModel } from './locals'

const CHANGE_NEW = 'CHANGE_NEW';
export function newChange (author, dataset, attributes={}) {
	attributes = Object.assign({
		author,
		dataset,
	}, attributes);
	return newLocalModel(Schemas.CHANGE, CHANGE_NEW, attributes);
}

const CHANGE_UPDATE = 'CHANGE_UPDATE';
export function updateChange(change) {
	return updateLocalModel(Schemas.CHANGE, CHANGE_UPDATE, change);
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
	if (!change.id || change.id == "new") {
		return createChange(change);
	} else {
		return (dispatch, getState) => {
			return dispatch({
				[CALL_API] : {
					types : [ CHANGE_SAVE_REQUEST, CHANGE_SAVE_SUCCESS, CHANGE_SAVE_FAIL ],
					endpoint : `/changes/${id}`,
					method : 'PUT',
					schema : Schemas.CHANGE,
					data : change
				}
			}).then(action => {
				if (action.type === CHANGE_SAVE_REQUEST) {
					dispatch(setMessage('change saved'));
					setTimeout(() => dispatch(resetMessage()), 5000);
					// TODO - determine proper URL for change redirection
					return dispatch(push("/console"))
				}

				return null;
			});
		}
	}
}

export const CHANGE_CREATE_REQUEST = 'CHANGE_CHANGE_REQUEST';
export const CHANGE_CREATE_SUCCESS = 'CHANGE_CHANGE_SUCCESS';
export const CHANGE_CREATE_FAIL = 'CHANGE_CHANGE_FAIL';

export function createChange(change) {
	return (dispatch, getState) => {
		return dispatch({
			[CALL_API] : {
				types : [CHANGE_CREATE_SUCCESS, CHANGE_CREATE_SUCCESS, CHANGE_CREATE_FAIL ],
				endpoint : "/changes",
				method : "POST",
				schema : Schemas.CHANGE,
				data : Object.assign({}, change, { id : undefined })
			}
		}).then(action => {
			if (action.type === CHANGE_CREATE_SUCCESS) {
				const dataset = action.response.entities.datasets[Object.keys(action.response.entities.datasets)[0]]
				const path = "/" + dataset.address.replace(".","/",-1);
				// TODO - redirect properly
				return dispatch(push(path));
			}

			return null;
		});
	}
}

export const CHANGE_EXECUTE_REQUEST = 'CHANGE_EXECUTE_REQUEST';
export const CHANGE_EXECUTE_SUCCESS = 'CHANGE_EXECUTE_SUCCESS';
export const CHANGE_EXECUTE_FAIL = 'CHANGE_EXECUTE_FAIL';

export function executeChange(change) {
	return {
		[CALL_API] : {
			types : [ CHANGE_EXECUTE_REQUEST, CHANGE_EXECUTE_SUCCESS, CHANGE_EXECUTE_FAIL ],
			endpoint : `/changes/new?execute=true`,
			method : 'POST',
			schema : Schemas.CHANGE,
			data : change
		}
	}
}

export const CHANGE_DELETE_REQUEST = 'CHANGE_DELETE_REQUEST';
export const CHANGE_DELETE_SUCCESS = 'CHANGE_DELETE_SUCCESS';
export const CHANGE_DELETE_FAIL = 'CHANGE_DELETE_FAIL';

export function deleteChange(id, redirectUrl="") {
	return (dispatch, getState) => {
		return dispatch({
			[CALL_API] : {
				types : [ CHANGE_DELETE_REQUEST, CHANGE_DELETE_SUCCESS, CHANGE_DELETE_FAIL ],
				endpoint : `/changes/${id}`,
				method : 'DELETE',
				schema : Schemas.CHANGE
			}
		}).then(action => {
			if (action.type === CHANGE_DELETE_SUCCESS) {
				// remove the model locally
				dispatch(removeModel(Schemas.CHANGE, id));

				// on successful delete, redirect
				if (redirectUrl != "") {
					dispatch(push(redirectUrl));
				}

				// and set a message with a timeout
				dispatch(setMessage('dataset deleted'))
				setTimeout(() => dispatch(resetMessage()), 5000);
			}

			return null
		});
	}
}

export const EDIT_CHANGE = 'EDIT_CHANGE';

export function editChange(address, id) {
	return (dispatch, getState) => {
		const change = selectChangeByNumber(getState(), address, id)
		if (!change) {
			return dispatch(fetchDatasetByAddress(address)).then(action => {
				if (action.type === CHANGE_FETCH_SUCCESS) {
					const change = selectChangeByNumber(getState(), address, id)
					return dispatch(editModel(Schemas.CHANGE, EDIT_CHANGE, change));
				}
			})
		} else {
			return dispatch(editModel(Schemas.CHANGE, EDIT_CHANGE, change))
		}

	}
}