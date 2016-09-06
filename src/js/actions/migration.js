import { CALL_API } from '../middleware/api'
import { newModel, updateModel } from '../middleware/models'
import Schemas from '../schemas'

const MIGRATION_NEW = 'MIGRATION_NEW';
export function newMigration (attributes={}) {
	return newModel(Schemas.MIGRATION, MIGRATION_NEW, attributes);
}

const MIGRATION_UPDATE = 'MIGRATION_UPDATE';
export function updateMigration(migration) {
	return updateMigration(Schemas.MIGRATION, MIGRATION_UPDATE, migration);
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
		const migration = getState().entities.migrations[id];

		return fetchMigration(id, requiredFields)
	}
}

export function fetchMigrationByNumber(handle, slug, number, requiredFields=[]) {
	return {
		[CALL_API] : {
			types : [ MIGRATION_FETCH_REQUEST, MIGRATION_FETCH_SUCCESS, MIGRATION_FETCH_FAIL ],
			endpoint : `/migrations?dataset=${slug}&number=${number}`,
			schema : Schemas.MIGRATION
		}
	}
}

export function loadMigrationByNumber(handle, slug, number, requiredFields=[]) {
	return (dispatch, getState) => {
		const migration = selectMigrationByNumber(getState(), handle, slug, number);

		if (migration && requiredFields.every(field => (migration.hasOwnProperty(field)))) {
			return null
		}

		return fetchMigrationByNumber(handle, slug, number, requiredFields);
	}
}

export const MIGRATION_SAVE_REQUEST = 'MIGRATION_SAVE_REQUEST';
export const MIGRATION_SAVE_SUCCESS = 'MIGRATION_SAVE_SUCCESS';
export const MIGRATION_SAVE_FAIL = 'MIGRATION_SAVE_FAIL';

export function saveMigration(migration) {
	return {
		[CALL_API] : {
			types : [ MIGRATION_SAVE_REQUEST, MIGRATION_SAVE_SUCCESS, MIGRATION_SAVE_FAIL ],
			endpoint : migration.id ? `/migrations/${id}` : '/migrations',
			method : 'POST',
			schema : Schemas.MIGRATION,
		}
	}
}

export const MIGRATION_DELETE_REQUEST = 'MIGRATION_DELETE_REQUEST';
export const MIGRATION_DELETE_SUCCESS = 'MIGRATION_DELETE_SUCCESS';
export const MIGRATION_DELETE_FAIL = 'MIGRATION_DELETE_FAIL';

export function deleteMigration(id) {
	return {
		[CALL_API] : {
			types : [ MIGRATION_DELETE_REQUEST, MIGRATION_DELETE_SUCCESS, MIGRATION_DELETE_FAIL ],
			endpoint : `/migrations/${id}`,
			method : 'DELETE',
			schema : Schemas.MIGRATION
		}
	}
}