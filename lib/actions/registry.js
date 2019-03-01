import { CALL_API } from '../middleware/api'

import Schemas from '../schemas'

import {
  REGISTRY_LIST_REQUEST,
  REGISTRY_LIST_SUCCESS,
  REGISTRY_LIST_FAILURE,
  REGISTRY_DATASET_REQUEST,
  REGISTRY_DATASET_SUCCESS,
  REGISTRY_DATASET_FAILURE
} from '../constants/registry'

export function fetchRegistryDatasets (page = 1, pageSize = 25) {
  return {
    [CALL_API]: {
      types: [REGISTRY_LIST_REQUEST, REGISTRY_LIST_SUCCESS, REGISTRY_LIST_FAILURE],
      endpoint: `/registry/datasets`,
      data: { page, pageSize },
      schema: Schemas.DATASET_ARRAY
    },
    page,
    pageSize
  }
}

export function loadRegistryDatasets (page = 1, pageSize = 25) {
  return (dispatch, getState) => {
    // TODO - check pagination
    return dispatch(fetchRegistryDatasets(page, pageSize))
  }
}

export function fetchRegistryDatasetByName (handle, name) {
  return {
    [CALL_API]: {
      types: [REGISTRY_DATASET_REQUEST, REGISTRY_DATASET_SUCCESS, REGISTRY_DATASET_FAILURE],
      endpoint: `/registry/${handle}/${name}`,
      schema: Schemas.DATASET,
      method: 'GET',
      silentError: true
    }
  }
}

export function fetchRegistryDatasetByPath (path, handle, name) {
  const namedPath = handle && name ? `/${handle}/${name}/at${path}` : `/at${path}`
  return {
    [CALL_API]: {
      types: [REGISTRY_DATASET_REQUEST, REGISTRY_DATASET_SUCCESS, REGISTRY_DATASET_FAILURE],
      endpoint: namedPath,
      schema: Schemas.DATASET,
      path,
      silentError: true
    }
  }
}

// TODO: look through registry and see if we already have this registry dataset before fetching
export function loadRegistryDatasetByName (handle, name, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(fetchRegistryDatasetByName(handle, name))
  }
}

// TODO: look through registry and see if we already have this registry dataset before fetching
export function loadRegistryDatasetByPath (path, handle, name, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(fetchRegistryDatasetByPath(path, handle, name))
  }
}
