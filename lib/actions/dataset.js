/* global alert */
import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'
import { selectDatasetByPath, selectDatasetByName, selectDatasetData } from '../selectors/dataset'
import { selectSessionProfileId } from '../selectors/session'
import { newLocalModel, updateLocalModel, removeLocalModel } from './locals'
import { setMessage, setErrorMessage, resetMessage, clearPagination } from './app'

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
  DATASET_SAVE_META_REQUEST,
  DATASET_SAVE_META_SUCCESS,
  DATASET_SAVE_META_FAILURE,
  DATASET_DELETE_REQUEST,
  DATASET_DELETE_SUCCESS,
  DATASET_DELETE_FAILURE,
  DATASET_DOWNLOAD_REQUEST,
  DATASET_DOWNLOAD_SUCCESS,
  DATASET_DOWNLOAD_FAIL,
  DATASET_INIT_REQUEST,
  DATASET_INIT_SUCCESS,
  DATASET_INIT_FAILURE,
  DATASET_SEARCH_REQUEST,
  DATASET_SEARCH_SUCCESS,
  DATASET_SEARCH_FAILURE,
  DATASET_ADD_REQUEST,
  DATASET_ADD_SUCCESS,
  DATASET_ADD_FAILURE,
  DATASET_RENAME_REQUEST,
  DATASET_RENAME_SUCCESS,
  DATASET_RENAME_FAILURE
} from '../constants/dataset'

export function newDataset (datasetRef = {}) {
  return newLocalModel(Schemas.DATASET, DATASET_NEW, datasetRef)
}

export function updateDataset (dataset) {
  return updateLocalModel(Schemas.DATASET, DATASET_UPDATE, dataset)
}

export function cancelDatasetEdit (path) {
  return removeLocalModel(Schemas.DATASET, DATASET_CANCEL_EDIT, path)
}

export function fetchDatasets (id, page = 1, pageSize = 30) {
  return {
    [CALL_API]: {
      types: [DATASETS_REQUEST, DATASETS_SUCCESS, DATASETS_FAILURE],
      endpoint: `/list/${id}`,
      data: { page, pageSize },
      schema: Schemas.DATASET_ARRAY,
      silentError: true
    },
    id,
    page,
    pageSize
  }
}

export function loadDatasets (id, page = 1, pageSize = 30) {
  return (dispatch) => {
    // const dataset = selectDatasetById(getState(), )
    // if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(fetchDatasets(id, page, pageSize))
  }
}

export function fetchDatasetByPath (path) {
  return {
    [CALL_API]: {
      types: [DATASET_REQUEST, DATASET_SUCCESS, DATASET_FAILURE],
      endpoint: `/at${path}`,
      schema: Schemas.DATASET,
      path
    }
  }
}

export function fetchDatasetByName (peername, name) {
  return {
    [CALL_API]: {
      types: [DATASET_REQUEST, DATASET_SUCCESS, DATASET_FAILURE],
      endpoint: `/${peername}/${name}`,
      schema: Schemas.DATASET,
      method: 'GET'
    }
  }
}

export function loadDatasetByName (peername, name, requiredFields = []) {
  return (dispatch, getState) => {
    const datasetRef = selectDatasetByName(getState(), peername, name)
    // datasets are stored with their structure as a hash reference
    // ensure dataset structure is dereferenced
    if (datasetRef && datasetRef.dataset && typeof datasetRef.dataset.structure === 'string') {
      return dispatch(fetchDatasetByName(peername, name, requiredFields))
    }
    if (datasetRef && datasetRef.dataset && requiredFields.every(key => datasetRef.dataset.hasOwnProperty(key))) {
      return null
    }
    return dispatch(fetchDatasetByName(peername, name))
  }
}

export function loadDatasetByPath (path, requiredFields = []) {
  return (dispatch, getState) => {
    const datasetRef = selectDatasetByPath(getState(), path)
    // datasets are stored with their structure as a hash reference
    // ensure dataset structure is dereferenced
    if (datasetRef && datasetRef.dataset && typeof datasetRef.dataset.structure === 'string') {
      return dispatch(fetchDatasetByPath(path, requiredFields))
    }
    if (datasetRef && datasetRef.dataset && requiredFields.every(key => datasetRef.dataset.hasOwnProperty(key))) {
      return null
    }
    return dispatch(fetchDatasetByPath(path))
  }
}

export function fetchDatasetData (path, datapath, page = 1, pageSize = 100) {
  return {
    [CALL_API]: {
      types: [DATASET_DATA_REQUEST, DATASET_DATA_SUCCESS, DATASET_DATA_FAILURE],
      endpoint: `/data/at${path}`,
      schema: Schemas.STRUCTURED_DATA,
      data: { page, pageSize }
    },
    datapath,
    page,
    pageSize
  }
}

export function loadDatasetData (path, datapath, page = 1, pageSize = 100) {
  return (dispatch, getState) => {
    // const dataset = selectDatasetByAddress(getState(), address)
    // if (dataset.schema != null) {
    //  return null
    // }
    // if (dataset && requiredFields.every(key => dataset.hasOwnProperty(key))) {
    //   return null
    // }
    if (selectDatasetData(getState(), path)) {
      return null
    }
    return dispatch(fetchDatasetData(path, datapath, page, pageSize))
  }
}

export function saveMetaDataset (datasetRef, message) {
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
        data: { meta: datasetRef.dataset.meta, message }
      }
    })
  }
}

export function deleteDataset (datasetRef, redirectUrl = '/') {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_DELETE_REQUEST, DATASET_DELETE_SUCCESS, DATASET_DELETE_FAILURE],
        endpoint: `/remove/${datasetRef.peername}/${datasetRef.name}`,
        method: 'DELETE',
        schema: Schemas.DATASET
      }
    }).then((action) => {
      if (action.type === DATASET_DELETE_SUCCESS) {
        // on successful delete:
        // remove all ids from pagination
        dispatch(clearPagination('popularDatasets'))
        // load datasets fresh
        const id = selectSessionProfileId(getState())
        dispatch(loadDatasets(id))
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

export function downloadDataset (datasetRef) {
  return {
    [CALL_API]: {
      types: [DATASET_DOWNLOAD_REQUEST, DATASET_DOWNLOAD_SUCCESS, DATASET_DOWNLOAD_FAIL],
      endpoint: `/export/${datasetRef.peername}/${datasetRef.name}`,
      schema: Schemas.DATASET
      // data: { path }
    }
  }
}

export function initDataset (name, files, url) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_INIT_REQUEST, DATASET_INIT_SUCCESS, DATASET_INIT_FAILURE],
        endpoint: '/add',
        method: 'POST',
        schema: Schemas.DATASET,
        silentError: true,
        data: { name, url, peername: 'me' },
        files
      }
    }).then(action => {
      if (action.type === DATASET_INIT_FAILURE) {
        console.log(`DATASET_INIT_FAILURE: ${action.error}`)
        alert(`Error creating dataset dataset: ${action.error}`)
      }
      return action
    })
  }
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

export function addDataset (peername, name, description, message) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_ADD_REQUEST, DATASET_ADD_SUCCESS, DATASET_ADD_FAILURE],
        endpoint: `/add/${peername}/${name}`,
        method: 'POST',
        data: { description, message },
        schema: Schemas.DATASET
      }
    }).then(action => {
      if (action.type === DATASET_ADD_SUCCESS) {
        alert('Peer dataset added to your local datasets!')
      } else {
        console.log(`DATASET_ADD_FAILURE: ${action.error}`)
        alert('Error adding this dataset to your local datasets')
      }
      return action
    })
  }
}

export function renameDataset (datasetRef, newName) {
  const current = `${datasetRef.peername}/${datasetRef.name}`
  const name = `${datasetRef.peername}/${newName}`
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_RENAME_REQUEST, DATASET_RENAME_SUCCESS, DATASET_RENAME_FAILURE],
        endpoint: '/rename',
        method: 'POST',
        data: { current, 'new': name },
        schema: Schemas.DATASET,
        silentError: true
      }
    }).then(action => {
      if (action.type === DATASET_RENAME_SUCCESS) {
        dispatch(push(`/${datasetRef.peername}/${newName}`))
      } else if (action.type === DATASET_RENAME_FAILURE) {
        console.log(`DATASET_RENAME_FAILURE: ${action.error}`)
        alert(`Error renaming dataset: ${action.error}`)
      }
      return action
    })
  }
}
