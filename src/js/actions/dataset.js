import { CALL_API, Schemas } from '../middleware/api'
import { selectDatasetBySlug } from '../selectors/dataset'

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
    // const user = getState().entities.users[login]
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
    const dataset = getState().entities.datasets[id]
    if (dataset.schema != null) {
    	return null
    }
    // if (dataset && requiredFields.every(key => dataset.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(fetchDataset(id, requiredFields))
  }
}

export function fetchDatasetBySlug(handle, slug, requiredFields=[]) {
	return {
		[CALL_API] : {
			types : [ DATASET_REQUEST, DATASET_SUCCESS, DATASET_FAILURE ],
			endpoint : `/datasets?handle=${handle}&slug=${slug}`,
			schema : Schemas.DATASET,
			handle,
			slug
		}
	}
}

export function loadDatasetBySlug(handle, slug, requiredFields=[]) {
	return (dispatch, getState) => {
		const dataset = selectDatasetBySlug(getState(), handle, slug)
		if (dataset && requiredFields.every(key => dataset.hasOwnProperty(key))) {
			return null
		}

		return dispatch(fetchDatasetBySlug(handle, slug, requiredFields))
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
