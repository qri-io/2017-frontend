import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'
import { setMessage, resetMessage, removeModel } from './index'
import { newLocalModel, updateLocalModel, editModel } from './locals'
import { selectMigrationByNumber, selectMigrationById } from '../selectors/migration'

import { selectDatasetByAddress } from '../selectors/dataset'
import { DATASET_SUCCESS, fetchDatasetByAddress } from './dataset'

const MIGRATION_NEW = 'MIGRATION_NEW';
export function newMigration (address, attributes={}) {
	return (dispatch, getState) => {
		// check for the dataset we're trying to add to
		const dataset = selectDatasetByAddress(getState(), address);
		
		// if we have it, create a new migration using the loaded dataset
		if (dataset) {
			attributes = Object.assign({
				dataset,
				sql : "",
				description : ""
			}, attributes);
		 return dispatch(newLocalModel(Schemas.MIGRATION, MIGRATION_NEW, attributes));

		} else {
			// otherwise, do a fetch first to make sure the dataset actually exists &
			// stuff
			dispatch(fetchDatasetByAddress(address)).then(action => {
				const dataset = selectDatasetByAddress(getState(), address);

				if (action.type === DATASET_SUCCESS) {
					attributes = Object.assign({
						sql : "",
						description : ""
					}, attributes, { dataset });
					return dispatch(newLocalModel(Schemas.MIGRATION, MIGRATION_NEW, attributes))
				}

				return null;
			});
		}
	}
}

const MIGRATION_UPDATE = 'MIGRATION_UPDATE';
export function updateMigration(migration) {
	return updateLocalModel(Schemas.MIGRATION, MIGRATION_UPDATE, migration);
}


export const MIGRATION_FETCH_REQUEST = 'MIGRATION_FETCH_REQUEST';
export const MIGRATION_FETCH_SUCCESS = 'MIGRATION_FETCH_SUCCESS';
export const MIGRATION_FETCH_FAIL = 'MIGRATION_FETCH_FAIL';

export function fetchMigration(id, requiredFields=[]) {
	return {
		[CALL_API] : {
			types : [ MIGRATION_FETCH_REQUEST, MIGRATION_FETCH_SUCCESS, MIGRATION_FETCH_FAIL ],
			endpoint : `/migrations/${id}`,
			schema : Schemas.MIGRATION
		}
	}
}

export function loadMigration(id, requiredFields=[]) {
	return (dispatch, getState) => {
		const migration = selectMigrationById(getState(), id);
		if (migration && requiredFields.every(key => migration.hasOwnProperty(key))) {
			return null
		}

		return fetchMigration(id, requiredFields)
	}
}

export function fetchMigrationByNumber(address, number, requiredFields=[]) {
	return {
		[CALL_API] : {
			types : [ MIGRATION_FETCH_REQUEST, MIGRATION_FETCH_SUCCESS, MIGRATION_FETCH_FAIL ],
			endpoint : `/migrations?address=${address}&number=${number}`,
			schema : Schemas.MIGRATION
		}
	}
}

export function loadMigrationByNumber(address, number, requiredFields=[]) {
	return (dispatch, getState) => {
		const migration = selectMigrationByNumber(getState(), address, number);
		if (migration && requiredFields.every(field => (migration.hasOwnProperty(field)))) {
			return null
		}

		return dispatch(fetchMigrationByNumber(address, number, requiredFields));
	}
}

export const MIGRATION_SAVE_REQUEST = 'MIGRATION_SAVE_REQUEST';
export const MIGRATION_SAVE_SUCCESS = 'MIGRATION_SAVE_SUCCESS';
export const MIGRATION_SAVE_FAIL = 'MIGRATION_SAVE_FAIL';

export function saveMigration(migration) {
	if (!migration.id || migration.id == "new") {
		return createMigration(migration);
	} else {
		return (dispatch, getState) => {
			return dispatch({
				[CALL_API] : {
					types : [ MIGRATION_SAVE_REQUEST, MIGRATION_SAVE_SUCCESS, MIGRATION_SAVE_FAIL ],
					endpoint : `/migrations/${migration.id}`,
					method : 'PUT',
					schema : Schemas.MIGRATION,
					data : migration
				}
			}).then(action => {
				if (action.type == MIGRATION_SAVE_SUCCESS) {
					dispatch(setMessage("migration updated"));
					setTimeout(() => dispatch(resetMessage()), 5000);
					// TODO - construct proper URL to send user to
					return dispatch(push("/console"));
				}
			});
		}
		
	}
}

export const MIGRATION_CREATE_REQUEST = 'MIGRATION_CREATE_REQUEST';
export const MIGRATION_CREATE_SUCCESS = 'MIGRATION_CREATE_SUCCESS';
export const MIGRATION_CREATE_FAIL = 'MIGRATION_CREATE_FAIL';

function createMigration(migration) {
	return (dispatch, getState) => {
		return dispatch({
			[CALL_API] : {
				types : [ MIGRATION_CREATE_REQUEST, MIGRATION_CREATE_SUCCESS, MIGRATION_CREATE_FAIL ],
				endpoint : "/migrations",
				method : "POST",
				schema : Schemas.MIGRATION,
				data : Object.assign({}, migration, { id : undefined })
			}
		}).then(action => {
			if (action.type === MIGRATION_CREATE_SUCCESS && action.response.entities.migrations) {
				
				dispatch(setMessage("migration created"));
				setTimeout(() => { 
					dispatch(resetMessage()) 
				}, 3500);

				const { datasets, migrations } = action.response.entities;
				let address = datasets[Object.keys(datasets)[0]].address
				const migration = migrations[Object.keys(migrations)[0]]
				const number = migration.number || migration.id;
				address = address.replace(".", "/", -1)
				
				return dispatch(push(`/${address}/migrations/${number}`));
			}
		})

		return null;
	}
}


export const MIGRATION_EXECUTE_REQUEST = 'MIGRATION_EXECUTE_REQUEST';
export const MIGRATION_EXECUTE_SUCCESS = 'MIGRATION_EXECUTE_SUCCESS';
export const MIGRATION_EXECUTE_FAIL = 'MIGRATION_EXECUTE_FAIL';

export function executeMigration(migration) {
	return (dispatch, getState) => {
		return dispatch({
			[CALL_API] : {
				types : [ MIGRATION_EXECUTE_REQUEST, MIGRATION_EXECUTE_SUCCESS, MIGRATION_EXECUTE_FAIL ],
				endpoint : migration.id ? `/migrations/${migration.id}/execute` : `/migrations?execute=true`,
				method : 'POST',
				schema : Schemas.MIGRATION,
				data : migration
			}
		}).then(action => {
			if (action.type === MIGRATION_EXECUTE_SUCCESS) {
				dispatch(setMessage("migration executed"));
				setTimeout(() => dispatch(resetMessage()), 5000);
				// TODO - redirect to a proper location, like, say the dataset address
				return dispatch(push('/console'))
			}

			return null
		});
	}
}

export const MIGRATION_DECLINE_REQUEST = 'MIGRATION_DECLINE_REQUEST';
export const MIGRATION_DECLINE_SUCCESS = 'MIGRATION_DECLINE_SUCCESS';
export const MIGRATION_DECLINE_FAIL = 'MIGRATION_DECLINE_FAIL';

export function declineMigration(migration) {
	return (dispatch, getState) => {
		return dispatch({
			[CALL_API] : {
				types : [ MIGRATION_DECLINE_REQUEST, MIGRATION_DECLINE_SUCCESS, MIGRATION_DECLINE_FAIL ],
				endpoint : migration.id ? `/migrations/${migration.id}/decline` : `/migrations?decline=true`,
				method : 'POST',
				schema : Schemas.MIGRATION,
				data : migration
			}
		}).then(action => {
			if (action.type == MIGRATION_DECLINE_SUCCESS) {
				dispatch(setMessage("migration declined"));
				setTimeout(() => dispatch(resetMessage()), 5000);
				
				// TODO - redirect to a proper location, like, say the dataset address
				return dispatch(push('/console'));
			}

			return null
		});
	}
}

export const MIGRATION_DELETE_REQUEST = 'MIGRATION_DELETE_REQUEST';
export const MIGRATION_DELETE_SUCCESS = 'MIGRATION_DELETE_SUCCESS';
export const MIGRATION_DELETE_FAIL = 'MIGRATION_DELETE_FAIL';

export function deleteMigration(id, redirectUrl="") {
	return (dispatch, getState) => {
		return dispatch({
			[CALL_API] : {
				types : [ MIGRATION_DELETE_REQUEST, MIGRATION_DELETE_SUCCESS, MIGRATION_DELETE_FAIL ],
				endpoint : `/migrations/${id}`,
				method : 'DELETE',
				schema : Schemas.MIGRATION
			}
		}).then(action => {
			if (action.type === MIGRATION_DELETE_SUCCESS) {
				dispatch(removeModel(Schemas.MIGRATION, id))

				if (redirectUrl != "") {
					dispatch(push(redirectUrl));
				}

				dispatch(setMessage('migration deleted'))
				setTimeout(() => dispatch(resetMessage()), 5000);
			}

			return null;
		});
	}
}

export const EDIT_MIGRATION = 'EDIT_MIGRATION';

export function editMigration(address, number) {
	return (dispatch, getState) => {
		const migration = selectMigrationByNumber(getState(), address, number);
		if (!migration) {
			return dispatch(fetchMigrationByNumber(address, number)).then(action => {
				if (action.type === MIGRATION_FETCH_SUCCESS) {
					const migration = selectMigrationByNumber(getState(), address, number);
					return dispatch(editModel(Schemas.MIGRATION, EDIT_MIGRATION, migration));
				}

				return null
			})
		} else {
			return dispatch(editModel(Schemas.MIGRATION, EDIT_MIGRATION, migration));
		}
	}
}
