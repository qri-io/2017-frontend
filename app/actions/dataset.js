import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'
import { selectDatasetByPath } from '../selectors/dataset'
import { newLocalModel, updateLocalModel, removeLocalModel, editModel } from './locals'
import { setMessage, resetMessage, removeModel, setSearch } from './app'

import {
  DATASET_NEW,
  DATASET_UPDATE,
  DATASET_CANCEL_EDIT,
  DATASETS_REQUEST,
  DATASETS_SUCCESS,
  DATASETS_FAILURE,
  DATASET_REQUEST,
  DATASET_SUCCESS,
  DATASET_FAILURE,
  DATASET_DATA_REQUEST,
  DATASET_DATA_SUCCESS,
  DATASET_DATA_FAILURE,
  DATASET_CREATE_REQUEST,
  DATASET_CREATE_SUCCESS,
  DATASET_CREATE_FAILURE,
  DATASET_SAVE_REQUEST,
  DATASET_SAVE_SUCCESS,
  DATASET_SAVE_FAILURE,
  DATASET_DELETE_REQUEST,
  DATASET_DELETE_SUCCESS,
  DATASET_DELETE_FAILURE,
  EDIT_DATASET,
  DATASET_README_REQUEST,
  DATASET_README_SUCCESS,
  DATASET_README_FAILURE,
  DATASET_MIGRATIONS_REQUEST,
  DATASET_MIGRATIONS_SUCCESS,
  DATASET_MIGRATIONS_FAIL,
  DATASET_CHANGES_REQUEST,
  DATASET_CHANGES_SUCCESS,
  DATASET_CHANGES_FAIL,
  DATASET_DOWNLOAD_REQUEST,
  DATASET_DOWNLOAD_SUCCESS,
  DATASET_DOWNLOAD_FAIL,
  DATASET_INIT_REQUEST,
  DATASET_INIT_SUCCESS,
  DATASET_INIT_FAILURE,
  DATASET_SET_SEARCH,
  DATASET_SEARCH_REQUEST,
  DATASET_SEARCH_SUCCESS,
  DATASET_SEARCH_FAILURE,
  DATASET_ADD_REQUEST,
  DATASET_ADD_SUCCESS,
  DATASET_ADD_FAILURE
} from '../constants/dataset'

const blankMetadata = {
  title: '',
  description: '',
  keyword: [],
  rights: '',
  landingPage: '',
  theme: [],
  identifier: '',
  accessLevel: '',
  language: [],
  license: ''
}

export function newDataset (attributes = {}, dataset = {}) {
  const datasetRef = Object.assign({
    name: '',
    path: '',
    dataset: Object.assign(blankMetadata, dataset)
  }, attributes)
  return newLocalModel(Schemas.DATASET, DATASET_NEW, datasetRef)
}

export function updateDataset (dataset) {
  return updateLocalModel(Schemas.DATASET, DATASET_UPDATE, dataset)
}

export function cancelDatasetEdit (path) {
  return removeLocalModel(Schemas.DATASET, DATASET_CANCEL_EDIT, path)
}

export function fetchDatasets (page = 1, pageSize = 30) {
  return {
    [CALL_API]: {
      types: [DATASETS_REQUEST, DATASETS_SUCCESS, DATASETS_FAILURE],
      endpoint: '/datasets',
      data: { page, pageSize },
      schema: Schemas.DATASET_ARRAY,
      silentError: true
    },
    page,
    pageSize
  }
}

export function loadDatasets (callback = () => {}, page = 1, pageSize = 30) {
  return (dispatch) => {
    // const dataset = selectDatasetById(getState(), )
    // if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(
      fetchDatasets(page, pageSize)
      ).then(action => {
        if (action.type === 'DATASETS_FAILURE' && typeof callback === 'function') {
          console.log(`DATASET_FAILURE: ${action.error}`)
          callback(action.error)
        } else {
          callback()
        }
      })
  }
}

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

export function fetchDatasetData (path, page = 1, pageSize = 100) {
  return {
    [CALL_API]: {
      types: [DATASET_DATA_REQUEST, DATASET_DATA_SUCCESS, DATASET_DATA_FAILURE],
      endpoint: `/data${path}`,
      schema: Schemas.STRUCTURED_DATA,
      data: { page, pageSize }
    },
    path,
    page,
    pageSize
  }
}

export function loadDatasetData (path, callback, page = 1, pageSize = 100) {
  return (dispatch) => {
    // const dataset = selectDatasetByAddress(getState(), address)
    // if (dataset.schema != null) {
    //  return null
    // }
    // if (dataset && requiredFields.every(key => dataset.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(
      fetchDatasetData(path, page, pageSize)
    ).then(action => {
      if (action.type === DATASET_DATA_FAILURE && typeof callback === 'function') {
        callback(action.error)
      } else {
        callback()
      }
    })
  }
}

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
      if (action.type === DATASET_CREATE_SUCCESS && action.response.entities.namespace) {
        const ds = action.response.entities.namespace[Object.keys(action.response.entities.namespace)[0]]
        // TODO - remove address ref
        const adr = ds.address.replace('.', '/', -1)
        const path = `/${adr}`
        return dispatch(push(path))
      }

      return null
    })
  }
}

export function saveDataset (datasetRef) {
  if (datasetRef.path === 'new') {
    return createDataset(datasetRef.dataset)
  }

  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_SAVE_REQUEST, DATASET_SAVE_SUCCESS, DATASET_SAVE_FAILURE],
        endpoint: `/datasets/`,
        method: 'PUT',
        schema: Schemas.DATASET,
        data: {
          prev: datasetRef.path,
          changes: datasetRef.dataset
        }
      }
    }).then((action) => {
      if (action.type === DATASET_SAVE_SUCCESS) {
        const ds = action.response.entities.namespace[Object.keys(action.response.entities.namespace)[0]]
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

export function downloadDataset (hash = '') {
  return {
    [CALL_API]: {
      types: [DATASET_DOWNLOAD_REQUEST, DATASET_DOWNLOAD_SUCCESS, DATASET_DOWNLOAD_FAIL],
      endpoint: `/download${hash}`,
      schema: Schemas.DATASET
      // data: { hash }
    }
  }
}

export function initDataset (name, files, callback) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_INIT_REQUEST, DATASET_INIT_SUCCESS, DATASET_INIT_FAILURE],
        endpoint: '/datasets',
        method: 'POST',
        schema: Schemas.DATASET,
        silentError: true,
        data: { name },
        files
      }
    }).then(action => {
      if (action.type === DATASET_INIT_SUCCESS) {
        callback()
      } else {
        console.log(`DATASET_INIT_FAILURE: ${action.error}`)
        callback(action.error)
      }
    })
  }
}

export function setDatasetSearch (searchString) {
  return setSearch({ dataset: searchString })
}

export function runDatasetSearch (searchString, page = 1, pageSize = 50) {
  return {
    [CALL_API]: {
      types: [DATASET_SEARCH_REQUEST, DATASET_SEARCH_SUCCESS, DATASET_SEARCH_FAILURE],
      endpoint: '/search',
      method: 'POST',
      data: { page, pageSize, q: searchString },
      schema: Schemas.DATASET_ARRAY
    },
    page,
    pageSize,
    searchString
  }
}

export function addDataset (path, name) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_ADD_REQUEST, DATASET_ADD_SUCCESS, DATASET_ADD_FAILURE],
        endpoint: `/add${path}?name=${name}`,
        method: 'POST',
        data: {},
        schema: Schemas.DATASET
      }
    }).then(action => {
      if (action.type === DATASET_ADD_SUCCESS) {
        alert('Peer dataset added to your local datasets!')
      } else {
        console.log(`DATASET_ADD_FAILURE: ${action.error}`)
        alert('Error adding this dataset to your local datasets')
      }
    })
  }
}
