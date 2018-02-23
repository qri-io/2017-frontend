/* global alert */
import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'
import { selectDatasetByPath } from '../selectors/dataset'
import { newLocalModel, updateLocalModel, removeLocalModel } from './locals'
import { setMessage, resetMessage, setSearch, clearPagination } from './app'

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
  DATASET_BY_NAME_REQUEST,
  DATASET_BY_NAME_SUCCESS,
  DATASET_BY_NAME_FAILURE,
  DATASET_DATA_REQUEST,
  DATASET_DATA_SUCCESS,
  DATASET_DATA_FAILURE,
  DATASET_CREATE_REQUEST,
  DATASET_CREATE_SUCCESS,
  DATASET_CREATE_FAILURE,
  DATASET_SAVE_REQUEST,
  DATASET_SAVE_SUCCESS,
  DATASET_SAVE_FAILURE,
  DATASET_SAVE_META_REQUEST,
  DATASET_SAVE_META_SUCCESS,
  DATASET_SAVE_META_FAILURE,
  DATASET_DELETE_REQUEST,
  DATASET_DELETE_SUCCESS,
  DATASET_DELETE_FAILURE,
  DATASET_README_REQUEST,
  DATASET_README_SUCCESS,
  DATASET_README_FAILURE,
  DATASET_CHANGES_REQUEST,
  DATASET_CHANGES_SUCCESS,
  DATASET_CHANGES_FAIL,
  DATASET_DOWNLOAD_REQUEST,
  DATASET_DOWNLOAD_SUCCESS,
  DATASET_DOWNLOAD_FAIL,
  DATASET_INIT_REQUEST,
  DATASET_INIT_SUCCESS,
  DATASET_INIT_FAILURE,
  // DATASET_SET_SEARCH,
  DATASET_SEARCH_REQUEST,
  DATASET_SEARCH_SUCCESS,
  DATASET_SEARCH_FAILURE,
  DATASET_ADD_REQUEST,
  DATASET_ADD_SUCCESS,
  DATASET_ADD_FAILURE,
  DATASET_QUERIES_REQUEST,
  DATASET_QUERIES_SUCCESS,
  DATASET_QUERIES_FAILURE,
  DATASET_RENAME_REQUEST,
  DATASET_RENAME_SUCCESS,
  DATASET_RENAME_FAILURE
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

export function newDataset (attributes = {}, dataset = {}, previous = '') {
  const datasetRef = Object.assign({
    peername: '',
    name: '',
    path: '',
    dataset: Object.assign(blankMetadata, dataset, { previous })
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
      endpoint: '/list',
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
        } else if (typeof callback === 'function') {
          callback()
        }
      })
  }
}

export function fetchDataset (path) {
  return {
    [CALL_API]: {
      types: [DATASET_REQUEST, DATASET_SUCCESS, DATASET_FAILURE],
      endpoint: `/${path}`,
      schema: Schemas.DATASET,
      path
    }
  }
}

export function fetchDatasetByName (peername, name) {
  return {
    [CALL_API]: {
      types: [DATASET_BY_NAME_REQUEST, DATASET_BY_NAME_SUCCESS, DATASET_BY_NAME_FAILURE],
      endpoint: `/${peername}/${name}`,
      schema: Schemas.DATASET,
      method: 'GET'
    }
  }
}


export function loadDataset (path, requiredFields = []) {
  return (dispatch, getState) => {
    const datasetRef = selectDatasetByPath(getState(), path)
    // datasets are stored with their structure as a hash reference
    // ensure dataset structure is dereferenced
    if (datasetRef && datasetRef.dataset && typeof datasetRef.dataset.structure === 'string') {
      return dispatch(fetchDataset(path, requiredFields))
    }
    if (datasetRef && datasetRef.dataset && requiredFields.every(key => datasetRef.dataset.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchDataset(path))
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

export function fetchDatasetQueries (path, page = 1, pageSize = 100) {
  return {
    [CALL_API]: {
      types: [DATASET_QUERIES_REQUEST, DATASET_QUERIES_SUCCESS, DATASET_QUERIES_FAILURE],
      endpoint: `/queries${path}`,
      schema: Schemas.DATASET,
      data: { page, pageSize }
    },
    path,
    page,
    pageSize
  }
}

export function loadDatasetQueries (path, callback, page = 1, pageSize = 100) {
  return (dispatch) => {
    return dispatch(
      fetchDatasetQueries(path, page, pageSize)
    ).then(action => {
      if (action.type === DATASET_QUERIES_FAILURE && typeof callback === 'function') {
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

export function saveDataset (datasetRef, callback) {
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
        callback()
        dispatch(setMessage('dataset updated'))
        setTimeout(() => dispatch(resetMessage()), 5000)
        const path = action.response.result.data
        return dispatch(push(`/dataset/${path.slice(6, -13)}`))
      }
      callback()
      return null
    })
  }
}

export function saveMetaDataset (datasetRef, message, callback) {
  if (!(datasetRef.dataset && datasetRef.dataset.meta)) {
    setErrorMessage('error: no metadata in datasetRef')
    return push(`/${datasetRef.peername}/${datasetRef.name}/meta/edit`)
  }
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_SAVE_META_REQUEST, DATASET_SAVE_META_SUCCESS, DATASET_SAVE_META_FAILURE],
        endpoint: `/save/${datasetRef.peername}/${datasetRef.name}`,
        method: 'POST',
        schema: Schemas.DATASET,
        data: { meta: datasetRef.dataset.meta, message: message}
      }
    }).then((action) => {
      if (action.type === DATASET_SAVE_META_SUCCESS) {
        setTimeout(() => dispatch(resetMessage()), 5000)
        dispatch(fetchDatasetByName(datasetRef.peername, datasetRef.name))
        callback()
        return dispatch(push(`/${datasetRef.peername}/${datasetRef.name}`))
      }
      dispatch(callback())
      return null
    })
  }
}

export function deleteDataset (name, path, redirectUrl = '/') {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_DELETE_REQUEST, DATASET_DELETE_SUCCESS, DATASET_DELETE_FAILURE],
        endpoint: `/datasets${path}`,
        method: 'DELETE',
        schema: Schemas.DATASET,
        data: {name, path}
      }
    }).then((action) => {
      if (action.type === DATASET_DELETE_SUCCESS) {
        // on successful delete:
        // remove all ids from pagination
        dispatch(clearPagination('popularDatasets'))
        // load datasets fresh
        dispatch(loadDatasets())
        // redirect
        dispatch(push(redirectUrl))
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

export function downloadDataset (path = '') {
  return {
    [CALL_API]: {
      types: [DATASET_DOWNLOAD_REQUEST, DATASET_DOWNLOAD_SUCCESS, DATASET_DOWNLOAD_FAIL],
      endpoint: `/download${path}`,
      schema: Schemas.DATASET
      // data: { path }
    }
  }
}

export function initDataset (name, files, url, callback) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_INIT_REQUEST, DATASET_INIT_SUCCESS, DATASET_INIT_FAILURE],
        endpoint: '/init/',
        method: 'POST',
        schema: Schemas.DATASET,
        silentError: true,
        data: { name, url },
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

export function addDataset (path, name, description, message, callback) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_ADD_REQUEST, DATASET_ADD_SUCCESS, DATASET_ADD_FAILURE],
        endpoint: `/add${path}?name=${name}`,
        method: 'POST',
        data: { description, message },
        schema: Schemas.DATASET
      }
    }).then(action => {
      if (action.type === DATASET_ADD_SUCCESS) {
        alert('Peer dataset added to your local datasets!')
        dispatch(callback())
      } else {
        console.log(`DATASET_ADD_FAILURE: ${action.error}`)
        alert('Error adding this dataset to your local datasets')
      }
    })
  }
}

export function renameDataset (current, newName, callback) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_RENAME_REQUEST, DATASET_RENAME_SUCCESS, DATASET_RENAME_FAILURE],
        endpoint: '/rename',
        method: 'POST',
        data: { current, 'new': newName },
        schema: Schemas.DATASET,
        silentError: true
      }
    }).then(action => {
      if (action.type === DATASET_RENAME_SUCCESS) {
        dispatch(callback())
      } else {
        console.log(`DATASET_RENAME_FAILURE: ${action.error}`)
        alert(`Error renaming dataset: ${action.error}`)
      }
    })
  }
}
