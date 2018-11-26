import { CALL_API } from '../middleware/api'

import Schemas from '../schemas'

import {
  REGISTRY_LIST_REQUEST,
  REGISTRY_LIST_SUCCESS,
  REGISTRY_LIST_FAILURE
} from '../constants/registry'

export function fetchRegistryList (page = 1, pageSize = 25) {
  return {
    [CALL_API]: {
      types: [REGISTRY_LIST_REQUEST, REGISTRY_LIST_SUCCESS, REGISTRY_LIST_FAILURE],
      endpoint: `/registry/list`,
      data: { page, pageSize },
      schema: Schemas.REGISTRY_DATASET_ARRAY
    },
    page,
    pageSize
  }
}

export function loadRegistryList (page = 1, pageSize = 25) {
  return (dispatch, getState) => {
    // TODO - check pagination
    return dispatch(fetchRegistryList(page, pageSize))
  }
}
