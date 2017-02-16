import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'

import { selectRoleById } from '../selectors/role'
import { setMessage, resetMessage, removeModel } from './app'
import { updateLocalModel, newLocalModel, editModel } from './locals'

import { selectDatasetByAddress } from '../selectors/dataset'
import { DATASET_SUCCESS, fetchDatasetByAddress } from './dataset'

const ROLE_NEW = 'ROLE_NEW';
export function newRole (address, attributes={}) {
	return (dispatch, getState) => {
		attributes = Object.assign({}, attributes);
		return newLocalModel(Schemas.ROLE, ROLE_NEW, attributes);
	}
}

const ROLE_UPDATE = 'ROLE_UPDATE';
export function updateRole(role) {
	return updateLocalModel(Schemas.ROLE, ROLE_UPDATE, role);
}

export const ROLE_FETCH_REQUEST = 'ROLE_FETCH_REQUEST';
export const ROLE_FETCH_SUCCESS = 'ROLE_FETCH_SUCCESS';
export const ROLE_FETCH_FAILURE = 'ROLE_FETCH_FAILURE';
export function fetchRole(id, requiredFields=[]) {
	return {
		[CALL_API] : {
			types : [ ROLE_FETCH_REQUEST, ROLE_FETCH_SUCCESS, ROLE_FETCH_FAILURE ],
			endpoint : `/roles/${id}`,
			schema : Schemas.ROLE
		}
	}
}

export function loadRole(id, requiredFields=[]) {
	return (dispatch, getState) => {
		const role = getState().entities.roles[id];
		return fetchRole(id, requiredFields)
	}
}

export const ROLE_SAVE_REQUEST = 'ROLE_SAVE_REQUEST';
export const ROLE_SAVE_SUCCESS = 'ROLE_SAVE_SUCCESS';
export const ROLE_SAVE_FAILURE = 'ROLE_SAVE_FAILURE';

export function saveRole(role) {
	if (!role.id || role.id == "new") {
		return createRole(role);
	} else {
		return (dispatch, getState) => {
			return dispatch({
				[CALL_API] : {
					types : [ ROLE_SAVE_REQUEST, ROLE_SAVE_SUCCESS, ROLE_SAVE_FAILURE ],
					endpoint : `/roles/${role.id}`,
					method : 'PUT',
					schema : Schemas.ROLE,
					data : role
				}
			}).then(action => {
				if (action.type === ROLE_SAVE_REQUEST) {
					dispatch(setMessage('role saved'));
					setTimeout(() => dispatch(resetMessage()), 5000);
					// TODO - determine proper URL for role redirection
					return dispatch(push("/console"))
				}

				return null;
			});
		}
	}
}


export const EDIT_ROLE = 'EDIT_ROLE';

export function editRole(address, number) {
	return (dispatch, getState) => {
		const role = selectRoleById(getState(), address, number)
		if (!role) {
			return dispatch(fetchRole(address, number)).then(action => {
				if (action.type === ROLE_FETCH_SUCCESS) {
					const role = selectRoleById(getState(), address, number)
					return dispatch(editModel(Schemas.ROLE, EDIT_ROLE, role));
				}
			})
		} else {
			return dispatch(editModel(Schemas.ROLE, EDIT_ROLE, role))
		}

	}
}