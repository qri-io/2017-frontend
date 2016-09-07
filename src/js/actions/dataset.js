import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'
import { selectDatasetByAddress, selectDatasetById } from '../selectors/dataset'
import { newLocalModel, updateLocalModel, editModel, clearLocalModel } from './locals'
import { setMessage, resetMessage, removeModel } from './index'

const DATASET_NEW = 'DATASET_NEW';
export function newDataset(attributes={}) {
	attributes = Object.assign({
		name : "",
		handle : "",
		source_url : "",
		description : ""
	}, attributes);
	return newLocalModel(Schemas.DATASET, DATASET_NEW, attributes)
}

const DATASET_UPDATE = 'DATASET_UPDATE';
export function updateDataset(dataset) {
	return updateLocalModel(Schemas.DATASET, DATASET_UPDATE, dataset)
}

export const DATASETS_REQUEST = 'DATASETS_REQUEST'
export const DATASETS_SUCCESS = 'DATASETS_SUCCESS'
export const DATASETS_FAILURE = 'DATASETS_FAILURE'

export function fetchDatasets(query, page, pageSize) {
	return {
		[CALL_API] : {
			types : [ DATASETS_REQUEST, DATASETS_SUCCESS, DATASETS_FAILURE ],
			endpoint : '/datasets',
			data : { query, page, pageSize },
			schema : Schemas.DATASET_ARRAY
		}
	}
}

export function loadDatasets(query, page, pageSize) {
	return (dispatch, getState) => {
    // const dataset = selectDatasetById(getState(), )
    // if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(fetchDatasets(query, page, pageSize))
  }
}


export const DATASET_REQUEST = 'DATASET_REQUEST'
export const DATASET_SUCCESS = 'DATASET_SUCCESS'
export const DATASET_FAILURE = 'DATASET_FAILURE'

export function fetchDataset(id, requiredFields=[]) {
	return {
		[CALL_API] : {
			types : [ DATASET_REQUEST, DATASET_SUCCESS, DATASET_FAILURE ],
			endpoint : `/datasets/${id}`,
			schema : Schemas.DATASET,
			id,
		}
	}
}

export function loadDataset(id, requiredFields=[]) {
	return (dispatch, getState) => {
    const dataset = selectDatasetById(getState(), id)
    if (dataset.schema != null) {
    	return null
    }
    // if (dataset && requiredFields.every(key => dataset.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(fetchDataset(id, requiredFields))
  }
}

export const DATASET_SAVE_REQUEST = 'DATASET_SAVE_REQUEST'
export const DATASET_SAVE_SUCCESS = 'DATASET_SAVE_SUCCESS'
export const DATASET_SAVE_FAILURE = 'DATASET_SAVE_FAILURE'

export function saveDataset(dataset) {
	if (dataset.id == "new") {
		return createDataset(dataset)
	} else {
		return (dispatch, getState) => {
			return dispatch({
				[CALL_API] : {
					types : [ DATASET_SAVE_REQUEST, DATASET_SAVE_SUCCESS, DATASET_SAVE_FAILURE ],
					endpoint : `/datasets/${dataset.id}`,
					method : "PUT",
					schema : Schemas.DATASET,
					data : dataset
				}
			}).then(action => {
				if (action.type == DATASET_SAVE_SUCCESS) {
					const dataset = action.response.entities.datasets[Object.keys(action.response.entities.datasets)[0]]
					const path = "/" + dataset.address.replace(".","/",-1);
					dispatch(setMessage("dataset updated"));
					setTimeout(() => dispatch(resetMessage()), 5000);
					return dispatch(push(path))
				}

				return null;
			});
		}
	}
}

export const DATASET_CREATE_REQUEST = "DATASET_CREATE_REQUEST"
export const DATASET_CREATE_SUCCESS = "DATASET_CREATE_SUCCESS"
export const DATASET_CREATE_FAILURE = "DATASET_CREATE_FAILURE"

function createDataset(dataset) {
	return (dispatch, getState) => {
		return dispatch({
			[CALL_API] : {
				types : [ DATASET_CREATE_REQUEST, DATASET_CREATE_SUCCESS, DATASET_CREATE_FAILURE ],
				endpoint : "/datasets",
				method : "POST",
				schema : Schemas.DATASET,
				data : Object.assign({}, dataset, { id : undefined, address : `${dataset.address}.${dataset.handle}` })
			}
		}).then(action => {
			if (action.type == DATASET_CREATE_SUCCESS && action.response.entities.datasets) {
				const dataset = action.response.entities.datasets[Object.keys(action.response.entities.datasets)[0]]
				const path = "/" + dataset.address.replace(".","/",-1);
				return dispatch(push(path));
			}

			return null;
		})
	}
}

export const DATASET_DELETE_REQUEST = 'DATASET_DELETE_REQUEST'
export const DATASET_DELETE_SUCCESS = 'DATASET_DELETE_SUCCESS'
export const DATASET_DELETE_FAILURE = 'DATASET_DELETE_FAILURE'

export function deleteDataset(id, redirectUrl="") {
	return (dispatch, getState) => {
		return dispatch({
			[CALL_API] : {
				types : [ DATASET_DELETE_REQUEST, DATASET_DELETE_SUCCESS, DATASET_DELETE_FAILURE ],
				endpoint : `/datasets/${id}`,
				method : "DELETE",
				schema : Schemas.DATASET,
				id
			}
		}).then(action => {
			if (action.type == DATASET_DELETE_SUCCESS) {
				// remove the model locally
				dispatch(removeModel(Schemas.DATASET, id))

				// on successful delete, redirect
				if (redirectUrl != "") {
					dispatch(push(redirectUrl))
				}

				// and set a message with a timeout
				dispatch(setMessage('dataset deleted'))
				setTimeout(() => { 
					dispatch(resetMessage()); 
				}, 5000);
			}
			
			return null;
		});
	}
}

export const EDIT_DATASET = 'DATASET_EDIT';

export function editDataset(address) {
	return (dispatch, getState) => {
		const dataset = selectDatasetByAddress(getState(), address)
		if (!dataset) {
			return dispatch(fetchDatasetByAddress(address)).then(action => {
				if (action.type === DATASET_SUCCESS) {
					const dataset = selectDatasetByAddress(getState(), address)
					return dispatch(editModel(Schemas.DATASET, EDIT_DATASET, dataset));
				}
			})
		} else {
			return dispatch(editModel(Schemas.DATASET, EDIT_DATASET, dataset))
		}

	}
}

export function fetchDatasetByAddress(address, requiredFields=[]) {
	return {
		[CALL_API] : {
			types : [ DATASET_REQUEST, DATASET_SUCCESS, DATASET_FAILURE ],
			endpoint : `/datasets?address=${address}`,
			schema : Schemas.DATASET,
			address
		}
	}
}

export function loadDatasetByAddress(address, requiredFields=[]) {
	return (dispatch, getState) => {
		const dataset = selectDatasetByAddress(getState(), address)
		if (dataset && requiredFields.every(key => dataset.hasOwnProperty(key))) {
			return null
		}

		return dispatch(fetchDatasetByAddress(address, requiredFields))
	}
}

export const DATASET_SCHEMA_REQUEST = 'DATASET_SCHEMA_REQUEST'
export const DATASET_SCHEMA_SUCCESS = 'DATASET_SCHEMA_SUCCESS'
export const DATASET_SCHEMA_FAILURE = 'DATASET_SCHEMA_FAILURE'

export function fetchDatasetSchema(id) {
	return {
		[CALL_API] : {
			types : [ DATASET_SCHEMA_REQUEST, DATASET_SCHEMA_SUCCESS, DATASET_SCHEMA_FAILURE ],
			endpoint : `/datasets/${id}/schema'`,
			schema : Schemas.DATASET,
			id,
		}
	}
}

export function loadDatasetSchema(id) {
	return (dispatch, getState) => {
    const dataset = getState().entities.datasets[id];
    if (dataset.hasOwnProperty(schema)) {
    	return null
    }

    return dispatch(fetchDatasetSchema(id))
  }
}

export const DATASET_MIGRATIONS_REQUEST = 'DATASET_MIGRATIONS_REQUEST';
export const DATASET_MIGRATIONS_SUCCESS = 'DATASET_MIGRATIONS_SUCCESS';
export const DATASET_MIGRATIONS_FAIL = 'DATASET_MIGRATIONS_FAIL';

export function fetchDatasetChanges(datasetId, page=1, pageSize=50) {
	return {
		[CALL_API] : {
			types : [ DATASET_MIGRATIONS_REQUEST, DATASET_MIGRATIONS_SUCCESS, DATASET_MIGRATIONS_FAIL ],
			endpoint : `/datasets/${datasetId}/migrations?page=${page}&pageSize=${pageSize}`,
			schema : Schemas.MIGRATION_ARRAY,
			page,
			pageSize
		}
	}
}

export function loadDatasetChanges(datasetId, page=1, pageSize=50) {
	return (dispatch, getState) => {
		return fetchDatasetChanges(datasetId, page, pageSize);
	}
}

export const DATASET_CHANGES_REQUEST = 'DATASET_CHANGES_REQUEST';
export const DATASET_CHANGES_SUCCESS = 'DATASET_CHANGES_SUCCESS';
export const DATASET_CHANGES_FAIL = 'DATASET_CHANGES_FAIL';

export function fetchDatasetChanges(datasetId, page=1, pageSize=50) {
	return {
		[CALL_API] : {
			types : [ DATASET_CHANGES_REQUEST, DATASET_CHANGES_SUCCESS, DATASET_CHANGES_FAIL ],
			endpoint : `/datasets/${datasetId}/changes?page=${page}&pageSize=${pageSize}`,
			schema : Schemas.CHANGE_ARRAY,
			page,
			pageSize
		}
	}
}

export function loadDatasetChanges(datasetId, page=1, pageSize=50) {
	return (dispatch, getState) => {
		return fetchDatasetChanges(datasetId, page, pageSize);
	}
}
