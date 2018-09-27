/* global alert, File */
import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'
import { GET_CAF } from '../middleware/caf'

import Schemas from '../schemas'
import { selectDatasetByPath, selectDatasetByName, selectDatasetBody } from '../selectors/dataset'
import { selectSessionProfileId } from '../selectors/session'
// import { newLocalModel, updateLocalModel, removeLocalModel } from './localModels'
import { setMessage, resetMessage, clearPagination } from './app'
import { setTransferStatus, removeTransferStatus } from './transfers'

import {
  // DATASET_NEW,
  // DATASET_UPDATE,
  // DATASET_CANCEL_EDIT,
  DATASETS_REQUEST,
  DATASETS_SUCCESS,
  DATASETS_FAILURE,
  DATASET_REQUEST,
  DATASET_SUCCESS,
  DATASET_FAILURE,
  DATASET_BODY_REQUEST,
  DATASET_BODY_SUCCESS,
  DATASET_BODY_FAILURE,
  DATASET_SAVE_REQUEST,
  DATASET_SAVE_SUCCESS,
  DATASET_SAVE_FAILURE,
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
  DATASET_RENAME_FAILURE,
  DATASET_DRY_RUN_REQUEST,
  DATASET_DRY_RUN_SUCCESS,
  DATASET_DRY_RUN_FAILURE
} from '../constants/dataset'

import {
  CAFS_TRANSFORM_REQUEST,
  CAFS_TRANSFORM_SUCCESS,
  CAFS_TRANSFORM_FAILURE,
  CAFS_VIZ_REQUEST,
  CAFS_VIZ_SUCCESS,
  CAFS_VIZ_FAILURE
} from '../constants/cafs'

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
    // if (user && requiredFields.every(key => hasOwnNestedProperty(user, key))) {
    //   return null
    // }

    return dispatch(fetchDatasets(id, page, pageSize))
  }
}

export function fetchDatasetByPath (path, peername, name) {
  const namedPath = peername && name ? `/${peername}/${name}/at${path}` : `/at${path}`
  return {
    [CALL_API]: {
      types: [DATASET_REQUEST, DATASET_SUCCESS, DATASET_FAILURE],
      endpoint: namedPath,
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
    if (datasetRef && datasetRef.dataset && requiredFields.every(key => hasOwnNestedProperty(datasetRef.dataset, key))) {
      return null
    }
    return dispatch(fetchDatasetByName(peername, name))
  }
}

export function loadDatasetByPath (path, peername, name, requiredFields = []) {
  return (dispatch, getState) => {
    const datasetRef = selectDatasetByPath(getState(), path)
    // datasets are stored with their structure as a hash reference
    // ensure dataset structure is dereferenced
    if (datasetRef && datasetRef.dataset && typeof datasetRef.dataset.structure === 'string') {
      return dispatch(fetchDatasetByPath(path, requiredFields))
    }
    if (datasetRef && datasetRef.dataset && requiredFields.every(key => hasOwnNestedProperty(datasetRef.dataset, key))) {
      return null
    }
    return dispatch(fetchDatasetByPath(path, peername, name))
  }
}

export function fetchDatasetBody (path, bodypath, page = 1, pageSize = 100) {
  return {
    [CALL_API]: {
      types: [DATASET_BODY_REQUEST, DATASET_BODY_SUCCESS, DATASET_BODY_FAILURE],
      endpoint: `/body/at${path}`,
      schema: Schemas.STRUCTURED_DATA,
      data: { page, pageSize }
    },
    bodypath,
    page,
    pageSize
  }
}

export function loadDatasetBody (path, bodypath, page = 1, pageSize = 100) {
  return (dispatch, getState) => {
    if (selectDatasetBody(getState(), bodypath)) {
      return null
    }
    return dispatch(fetchDatasetBody(path, bodypath, page, pageSize))
  }
}

export function saveMetaDataset (datasetRef, message) {
  if (!(datasetRef.dataset && datasetRef.dataset.meta)) {
    setMessage('error: no metadata in datasetRef')
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

export function datasetRefToDatasetPod (datasetRef) {
  const datasetPod = datasetRef && datasetRef.dataset
  datasetPod.name = datasetRef.name
  datasetPod.peername = datasetRef.peername
  datasetPod.path = datasetRef.path
  datasetPod.profileID = datasetRef.profileID
  return datasetPod
}

// export function saveDataset (datasetRef) {
//   return (dispatch) => {
//     return dispatch({
//       [CALL_API]: {
//         types: [DATASET_SAVE_REQUEST, DATASET_SAVE_SUCCESS, DATASET_SAVE_FAILURE],
//         endpoint: `/save/${datasetRef.peername}/${datasetRef.name}`,
//         method: 'POST',
//         schema: Schemas.DATASET,
//         data: datasetRefToDatasetPod(datasetRef)
//       }
//     })
//   }
// }

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
        dispatch(setMessage('dataset removed from your qri node'))
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

// prepFiles turns strings into File objects for submission via  a form/multipart API request
function prepFiles (dataset = {}, transformScript = '', vizScript = '', bodyString = '') {
  let viz, transform, body

  let file = new File([JSON.stringify(dataset)], 'dataset.json', {
    type: 'text/plain'
  })

  if (transformScript) {
    transform = new File([transformScript], 'transform', {
      type: 'text/plain'
    })
  }

  if (vizScript) {
    viz = new File([vizScript], 'viz', {
      type: 'text/plain'
    })
  }

  if (bodyString) {
    body = new File([bodyString], 'body', {
      type: 'text/plain'
    })
  }

  return { file, transform, viz, body }
}

export function dryRunDataset (name = '', dataset = {}, transformScript = '', vizScript = '', body = '') {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_DRY_RUN_REQUEST, DATASET_DRY_RUN_SUCCESS, DATASET_DRY_RUN_FAILURE],
        endpoint: '/new',
        method: 'POST',
        schema: Schemas.DATASET_DRY_RUN,
        silentError: true,
        data: { name, peername: 'me', dry_run: true, return_body: true },
        files: prepFiles(dataset, transformScript, vizScript, body)
      }
    }).then(action => {
      if (action.type === DATASET_DRY_RUN_FAILURE) {
        // alert(`dry run error: ${action.error}`)
        throw action.error
      }
      return action
    })
  }
}

export function newDataset (name = '', dataset = {}, transformScript = '', vizScript = '', body = '') {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_INIT_REQUEST, DATASET_INIT_SUCCESS, DATASET_INIT_FAILURE],
        endpoint: '/new',
        method: 'POST',
        schema: Schemas.DATASET,
        silentError: true,
        data: { name, peername: 'me', return_body: true },
        files: prepFiles(dataset, transformScript, vizScript, body)
      }
    }).then(action => {
      if (action.type === DATASET_INIT_FAILURE) {
        throw action.error
      }
      return action
    })
  }
}

export function saveDataset (name = '', dataset = {}, transformScript = '', vizScript = '', body = '') {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_SAVE_REQUEST, DATASET_SAVE_SUCCESS, DATASET_SAVE_FAILURE],
        endpoint: '/save',
        method: 'POST',
        schema: Schemas.DATASET,
        silentError: true,
        data: { name, peername: 'me', return_body: true },
        files: prepFiles(dataset, transformScript, vizScript, body)
      }
    }).then(action => {
      if (action.type === DATASET_SAVE_FAILURE) {
        throw action.error
      }
      return action
    })
  }
}

// export function initDataset (name, file, body, viz, transform, url) {
//   return (dispatch) => {
//     return dispatch({
//       [CALL_API]: {
//         types: [DATASET_INIT_REQUEST, DATASET_INIT_SUCCESS, DATASET_INIT_FAILURE],
//         endpoint: '/new',
//         method: 'POST',
//         schema: Schemas.DATASET,
//         silentError: true,
//         data: { name, url, peername: 'me' },
//         files: { file, body, viz, transform }
//       }
//     }).then(action => {
//       if (action.type === DATASET_INIT_FAILURE) {
//         alert(`Error creating dataset: ${action.error}`)
//       }
//       return action
//     })
//   }
// }

export function runDatasetSearch (searchString, page = 1, pageSize = 50) {
  return {
    [CALL_API]: {
      types: [DATASET_SEARCH_REQUEST, DATASET_SEARCH_SUCCESS, DATASET_SEARCH_FAILURE],
      endpoint: '/search',
      method: 'GET',
      data: { page, pageSize, q: searchString },
      schema: Schemas.SEARCH_ARRAY
    },
    page,
    pageSize,
    searchString
  }
}

export function addDataset (peername, name, id) {
  return (dispatch) => {
    setTransferStatus(id)
    return dispatch({
      [CALL_API]: {
        types: [DATASET_ADD_REQUEST, DATASET_ADD_SUCCESS, DATASET_ADD_FAILURE],
        endpoint: `/add/${peername}/${name}`,
        method: 'POST',
        schema: Schemas.DATASET
      }
    }).then(action => {
      if (action.type === DATASET_ADD_SUCCESS) {
        alert('Peer dataset added to your local datasets!')
        removeTransferStatus(id)
      } else {
        alert('Error adding this dataset to your local datasets')
        setTransferStatus(id, -1)
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
        alert(`Error renaming dataset: ${action.error}`)
      }
      return action
    })
  }
}

export function hasOwnNestedProperty (obj, arg) {
  const keys = arg.split('.')
  var o = obj
  return keys.every(key => {
    o = o[key]
    return !!o
  })
}

// cafs actions

export function loadTransform (key) {
  return (dispatch) => {
    // TODO - bail early if key is already in state tree
    // if (getState())
    return dispatch({
      [GET_CAF]: {
        types: [CAFS_TRANSFORM_REQUEST, CAFS_TRANSFORM_SUCCESS, CAFS_TRANSFORM_FAILURE],
        key
      }
    })
  }
}

export function loadViz (key) {
  return (dispatch) => {
    return dispatch({
      [GET_CAF]: {
        types: [CAFS_VIZ_REQUEST, CAFS_VIZ_SUCCESS, CAFS_VIZ_FAILURE],
        key
      }
    })
  }
}
