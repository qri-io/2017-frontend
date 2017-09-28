import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'
import { selectDatasetByPath } from '../selectors/dataset'
import { newLocalModel, updateLocalModel, editModel } from './locals'
import { setMessage, resetMessage, removeModel } from './app'

const blankMetadata = {
  title: '',
  description: '',
  keyword: [],
  rights: '',
  landingPage: '',
  theme: [],
  identifier: '',
  accessLevel: '',
  language: '',
  license: ''
}

const DATASET_NEW = 'DATASET_NEW'
export function newDataset (attributes = {}, dataset = {}) {
  const datasetRef = Object.assign({
    name: '',
    path: '',
    dataset: Object.assign(blankMetadata, dataset)
  }, attributes)
  return newLocalModel(Schemas.DATASET, DATASET_NEW, datasetRef)
}

const DATASET_UPDATE = 'DATASET_UPDATE'
export function updateDataset (dataset) {
  return updateLocalModel(Schemas.DATASET, DATASET_UPDATE, dataset)
}

export const DATASETS_REQUEST = 'DATASETS_REQUEST'
export const DATASETS_SUCCESS = 'DATASETS_SUCCESS'
export const DATASETS_FAILURE = 'DATASETS_FAILURE'

export function fetchDatasets (page = 1, pageSize = 30) {
  return {
    [CALL_API]: {
      types: [DATASETS_REQUEST, DATASETS_SUCCESS, DATASETS_FAILURE],
      endpoint: '/datasets',
      data: { page, pageSize },
      schema: Schemas.DATASET_ARRAY
    },
    page,
    pageSize
  }
}

export function loadDatasets (page = 1, pageSize = 30) {
  return (dispatch) => {
    // const dataset = selectDatasetById(getState(), )
    // if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(fetchDatasets(page, pageSize))
  }
}

export const DATASET_REQUEST = 'DATASET_REQUEST'
export const DATASET_SUCCESS = 'DATASET_SUCCESS'
export const DATASET_FAILURE = 'DATASET_FAILURE'

export function fetchDataset (path) {
  return {
    [CALL_API]: {
      types: [DATASET_REQUEST, DATASET_SUCCESS, DATASET_FAILURE],
      endpoint: `/datasets${path}`,
      schema: Schemas.DATASET,
      path
    }
  }
}

export function loadDataset (path, requiredFields = []) {
  return (dispatch, getState) => {
    const datasetRef = selectDatasetByPath(getState(), path)
    if (datasetRef.dataset.schema != null) {
      return null
    }
    // if (dataset && requiredFields.every(key => dataset.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(fetchDataset(path, requiredFields))
  }
}

export const DATASET_DATA_REQUEST = 'DATASET_DATA_REQUEST'
export const DATASET_DATA_SUCCESS = 'DATASET_DATA_SUCCESS'
export const DATASET_DATA_FAILURE = 'DATASET_DATA_FAILURE'

export function fetchDatasetData (path, page = 1, pageSize = 100) {
  return {
    [CALL_API]: {
      types: [DATASET_DATA_REQUEST, DATASET_DATA_SUCCESS, DATASET_DATA_FAILURE],
      endpoint: `/data/${path}`,
      schema: Schemas.STRUCTURED_DATA,
      data: { page, pageSize }
    },
    path,
    page,
    pageSize
  }
}

export function loadDatasetData (path, page = 1, pageSize = 100) {
  return (dispatch) => {
    // const dataset = selectDatasetByAddress(getState(), address)
    // if (dataset.schema != null) {
    //  return null
    // }
    // if (dataset && requiredFields.every(key => dataset.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(fetchDatasetData(path, page, pageSize))
  }
}

export const DATASET_CREATE_REQUEST = 'DATASET_CREATE_REQUEST'
export const DATASET_CREATE_SUCCESS = 'DATASET_CREATE_SUCCESS'
export const DATASET_CREATE_FAILURE = 'DATASET_CREATE_FAILURE'

// TODO - old code.
function createDataset (dataset) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_CREATE_REQUEST, DATASET_CREATE_SUCCESS, DATASET_CREATE_FAILURE],
        endpoint: '/datasets',
        method: 'POST',
        schema: Schemas.DATASET,
        data: Object.assign({}, dataset, { id: undefined, address: dataset.address })
      }
    }).then((action) => {
      if (action.type === DATASET_CREATE_SUCCESS && action.response.entities.datasets) {
        const ds = action.response.entities.datasets[Object.keys(action.response.entities.datasets)[0]]
        // TODO - remove address ref
        const adr = ds.address.replace('.', '/', -1)
        const path = `/${adr}`
        return dispatch(push(path))
      }

      return null
    })
  }
}

export const DATASET_SAVE_REQUEST = 'DATASET_SAVE_REQUEST'
export const DATASET_SAVE_SUCCESS = 'DATASET_SAVE_SUCCESS'
export const DATASET_SAVE_FAILURE = 'DATASET_SAVE_FAILURE'

export function saveDataset (dataset) {
  if (dataset.id === 'new') {
    return createDataset(dataset)
  }

  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_SAVE_REQUEST, DATASET_SAVE_SUCCESS, DATASET_SAVE_FAILURE],
        endpoint: `/datasets/${dataset.id}`,
        method: 'PUT',
        schema: Schemas.DATASET,
        data: dataset
      }
    }).then((action) => {
      if (action.type === DATASET_SAVE_SUCCESS) {
        const ds = action.response.entities.datasets[Object.keys(action.response.entities.datasets)[0]]
        // TODO - outdated code
        const adr = ds.address.replace('.', '/', -1)
        const path = `/${adr}`
        dispatch(setMessage('dataset updated'))
        setTimeout(() => dispatch(resetMessage()), 5000)
        return dispatch(push(path))
      }

      return null
    })
  }
}

export const DATASET_DELETE_REQUEST = 'DATASET_DELETE_REQUEST'
export const DATASET_DELETE_SUCCESS = 'DATASET_DELETE_SUCCESS'
export const DATASET_DELETE_FAILURE = 'DATASET_DELETE_FAILURE'

export function deleteDataset (id, redirectUrl = '') {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_DELETE_REQUEST, DATASET_DELETE_SUCCESS, DATASET_DELETE_FAILURE],
        endpoint: `/datasets/${id}`,
        method: 'DELETE',
        schema: Schemas.DATASET,
        id
      }
    }).then((action) => {
      if (action.type === DATASET_DELETE_SUCCESS) {
        // remove the model locally
        dispatch(removeModel(Schemas.DATASET, id))

        // on successful delete, redirect
        if (redirectUrl !== '') {
          dispatch(push(redirectUrl))
        }

        // and set a message with a timeout
        dispatch(setMessage('dataset deleted'))
        setTimeout(() => {
          dispatch(resetMessage())
        }, 5000)
      }

      return null
    })
  }
}

// TODO - remove address references.
export function fetchDatasetByAddress (address) {
  return {
    [CALL_API]: {
      types: [DATASET_REQUEST, DATASET_SUCCESS, DATASET_FAILURE],
      endpoint: `/datasets?address=${address}`,
      schema: Schemas.DATASET,
      address
    }
  }
}

// TODO - remove address references.
export function loadDatasetByAddress (address, requiredFields = []) {
  return (dispatch, getState) => {
    const dataset = selectDatasetByAddress(getState(), address)
    if (dataset && requiredFields.every(key => Object.prototype.hasOwnProperty.call(dataset, key))) {
      return null
    }

    return dispatch(fetchDatasetByAddress(address, requiredFields))
  }
}

export const EDIT_DATASET = 'DATASET_EDIT'

export function editDataset (address) {
  return (dispatch, getState) => {
    const dataset = selectDatasetByAddress(getState(), address)
    if (!dataset) {
      return dispatch(fetchDatasetByAddress(address)).then((action) => {
        if (action.type === DATASET_SUCCESS) {
          const ds = selectDatasetByAddress(getState(), address)
          return dispatch(editModel(Schemas.DATASET, EDIT_DATASET, ds))
        }

        return null
      })
    }

    return dispatch(editModel(Schemas.DATASET, EDIT_DATASET, dataset))
  }
}

export const DATASET_README_REQUEST = 'DATASET_README_REQUEST'
export const DATASET_README_SUCCESS = 'DATASET_README_SUCCESS'
export const DATASET_README_FAILURE = 'DATASET_README_FAILURE'

// TODO - outdated code. dont' use until updated.
export function fetchDatasetReadme (address) {
  return {
    [CALL_API]: {
      types: [DATASET_README_REQUEST, DATASET_README_SUCCESS, DATASET_README_FAILURE],
      endpoint: `/datasets/readme?address=${address}`,
      schema: Schemas.README,
      address
    }
  }
}

// TODO - outdated code. dont' use until updated.
export function loadDatasetReadme (address) {
  return (dispatch, getState) => {
    if (getState().entities.readmes[address]) {
      return null
    }
    return dispatch(fetchDatasetReadme(address))
  }
}

export const DATASET_MIGRATIONS_REQUEST = 'DATASET_MIGRATIONS_REQUEST'
export const DATASET_MIGRATIONS_SUCCESS = 'DATASET_MIGRATIONS_SUCCESS'
export const DATASET_MIGRATIONS_FAIL = 'DATASET_MIGRATIONS_FAIL'

// TODO - outdated code. dont' use until updated.
export function fetchDatasetMigrations (datasetId, page = 1, pageSize = 50) {
  return {
    [CALL_API]: {
      types: [DATASET_MIGRATIONS_REQUEST, DATASET_MIGRATIONS_SUCCESS, DATASET_MIGRATIONS_FAIL],
      endpoint: `/datasets/${datasetId}/migrations?page=${page}&pageSize=${pageSize}`,
      schema: Schemas.MIGRATION_ARRAY
    },
    datasetId,
    page,
    pageSize
  }
}

export function loadDatasetMigrations (datasetId, page = 1, pageSize = 50) {
  return (dispatch) => {
    return dispatch(fetchDatasetMigrations(datasetId, page, pageSize))
  }
}

export const DATASET_CHANGES_REQUEST = 'DATASET_CHANGES_REQUEST'
export const DATASET_CHANGES_SUCCESS = 'DATASET_CHANGES_SUCCESS'
export const DATASET_CHANGES_FAIL = 'DATASET_CHANGES_FAIL'

// TODO - outdated code. dont' use until updated.
export function fetchDatasetChanges (datasetId, page = 1, pageSize = 50) {
  return {
    [CALL_API]: {
      types: [DATASET_CHANGES_REQUEST, DATASET_CHANGES_SUCCESS, DATASET_CHANGES_FAIL],
      endpoint: `/datasets/${datasetId}/changes?page=${page}&pageSize=${pageSize}`,
      schema: Schemas.CHANGE_ARRAY
    },
    // needed for pagination
    page,
    pageSize
  }
}

// TODO - outdated code. dont' use until updated.
export function loadDatasetChanges (datasetId, page = 1, pageSize = 50) {
  return (dispatch) => {
    return dispatch(fetchDatasetChanges(datasetId, page, pageSize))
  }
}

export const DATASET_DOWNLOAD_REQUEST = 'DATASET_DOWNLOAD_REQUEST'
export const DATASET_DOWNLOAD_SUCCESS = 'DATASET_DOWNLOAD_SUCCESS'
export const DATASET_DOWNLOAD_FAIL = 'DATASET_DOWNLOAD_FAIL'

export function downloadDataset (address = '') {
  return {
    [CALL_API]: {
      types: [DATASET_CHANGES_REQUEST, DATASET_CHANGES_SUCCESS, DATASET_CHANGES_FAIL],
      endpoint: `/datasets/package`,
      schema: Schemas.DATASET,
      data: { address }
    }
  }
}

export const DATASET_INIT_REQUEST = 'DATASET_INIT_REQUEST'
export const DATASET_INIT_SUCCESS = 'DATASET_INIT_SUCCESS'
export const DATASET_INIT_FAILURE = 'DATASET_INIT_FAILURE'

export function initDataset (name, files, callback) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_INIT_REQUEST, DATASET_INIT_SUCCESS, DATASET_INIT_FAILURE],
        endpoint: '/datasets',
        method: 'POST',
        schema: Schemas.DATASET,
        data: { name },
        files
      }
    }).then(callback)
  }
}
