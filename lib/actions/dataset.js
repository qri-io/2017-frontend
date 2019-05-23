/* global File */
import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'
import { GET_CAF } from '../middleware/caf'

import Schemas from '../schemas'
import { selectDatasetByPath, selectDatasetByName } from '../selectors/dataset'
import { selectSessionProfileId } from '../selectors/session'
import { loadRegistryDatasets } from './registry'
import { setMessage, resetMessage, clearPagination, clearPaginationIds } from './app'
import { setTransferStatus, removeTransferStatus } from './transfers'
import { makeRef } from '../utils/ref'

import {
  // DATASET_GET_BODY,
  DATASETS_REQUEST,
  DATASETS_SUCCESS,
  DATASETS_FAILURE,
  DATASET_REQUEST,
  DATASET_SUCCESS,
  DATASET_FAILURE,
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
  DATASET_DRY_RUN_FAILURE,
  DATASET_UPDATE_REQUEST,
  DATASET_UPDATE_SUCCESS,
  DATASET_UPDATE_FAILURE,
  DATASET_PUBLISH_REQUEST,
  DATASET_PUBLISH_SUCCESS,
  DATASET_PUBLISH_FAILURE
} from '../constants/dataset'

import {
  CAFS_TRANSFORM_REQUEST,
  CAFS_TRANSFORM_SUCCESS,
  CAFS_TRANSFORM_FAILURE,
  CAFS_VIZ_REQUEST,
  CAFS_VIZ_SUCCESS,
  CAFS_VIZ_FAILURE,
  CAFS_BODY_FILE_REQUEST,
  CAFS_BODY_FILE_SUCCESS,
  CAFS_BODY_FILE_FAILURE
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

export function fetchPublishedDatasets (id, page = 1, pageSize = 30) {
  return {
    [CALL_API]: {
      types: [DATASETS_REQUEST, DATASETS_SUCCESS, DATASETS_FAILURE],
      endpoint: `/list/${id}?published=true`,
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
      silentError: true,
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
      method: 'GET',
      silentError: true
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
      return new Promise(resolve => resolve())
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
      return new Promise(resolve => resolve())
    }
    return dispatch(fetchDatasetByPath(path, peername, name))
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

export function deleteDataset (datasetRef, revisions = -1) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_DELETE_REQUEST, DATASET_DELETE_SUCCESS, DATASET_DELETE_FAILURE],
        endpoint: `/remove/${datasetRef.peername}/${datasetRef.name}?revisions=${revisions}`,
        method: 'DELETE',
        schema: Schemas.DATASET
      },
      revisions,
      peername: datasetRef.peername,
      name: datasetRef.name
    }).then((action) => {
      if (action.type === DATASET_DELETE_SUCCESS) {
        // on successful delete:
        // remove all ids from pagination
        dispatch(clearPagination('popularDatasets'))
        // clear Pagination for history of this path
        // load datasets fresh
        dispatch(clearPaginationIds('datasetHistory', `/${action.peername}/${action.name}`))
        const id = selectSessionProfileId(getState())
        dispatch(loadDatasets(id))
        if (action.revisions === -1) {
        // and set a message with a timeout
          dispatch(setMessage('dataset removed from your qri node'))
        } else if (action.revisions === 1) {
          dispatch(setMessage('latest version of the dataset has been removed'))
        } else {
          dispatch(setMessage(`the ${action.revisions} most recent versions of the dataset have been removed`))
        }
        setTimeout(() => {
          dispatch(resetMessage())
        }, 2500)
      }
      return action
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
function prepFiles (dataset = {}, transformScript = '', vizScript = '', bodyData = '') {
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

  if (bodyData) {
    if (bodyData.constructor === File) {
      body = bodyData
    } else if (bodyData.length) {
      console.log(bodyData, bodyData.length)
      var name = 'body.'
      if (dataset && dataset.structure && dataset.structure.format) {
        name += dataset.structure.format
      } else {
        name += 'json'
      }
      body = new File([bodyData], name, {
        type: 'text/plain'
      })
    }
  }

  return { file, transform, viz, body }
}

export function dryRunDataset (name = '', dataset = {}, transformScript = '', vizScript = '', body) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_DRY_RUN_REQUEST, DATASET_DRY_RUN_SUCCESS, DATASET_DRY_RUN_FAILURE],
        endpoint: '/save',
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

export function saveDataset (name = '', dataset = {}, transformScript = '', vizScript = '', body) {
  return (dispatch, getState) => {
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

      // on successful save:
      // remove all ids from pagination
      dispatch(clearPagination('popularDatasets'))
      // load datasets fresh
      const id = selectSessionProfileId(getState())
      dispatch(loadDatasets(id))

      return action
    })
  }
}

export function togglePublishDataset (peername = '', name = '', path = '', published) {
  return (dispatch) => {
    // TODO - should be getting dataset ref by name here
    return dispatch(published ? unpublishDataset(peername, name, path) : publishDataset(peername, name, path))
  }
}

export function publishDataset (peername = '', name = '', path = '') {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_PUBLISH_REQUEST, DATASET_PUBLISH_SUCCESS, DATASET_PUBLISH_FAILURE],
        endpoint: `/publish/${makeRef(peername, name, '', path)}`,
        method: 'POST',
        schema: Schemas.DATASET
      }
    }).then(action => {
      if (action.type === DATASET_PUBLISH_SUCCESS) {
        // on successful save:
        // remove all ids from registry pagination
        dispatch(clearPagination('registryDatasets'))
        // load registry datasets fresh
        dispatch(loadRegistryDatasets())

        return action
      }
    })
  }
}

export function unpublishDataset (peername = '', name = '', path = '') {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_PUBLISH_REQUEST, DATASET_PUBLISH_SUCCESS, DATASET_PUBLISH_FAILURE],
        endpoint: `/publish/${makeRef(peername, name, '', path)}`,
        method: 'DELETE',
        schema: Schemas.DATASET
      }
    }).then(action => {
      if (action.type === DATASET_PUBLISH_SUCCESS) {
        // on successful save:
        // remove all ids from registry pagination
        dispatch(clearPagination('registryDatasets'))
        // load registry datasets fresh
        dispatch(loadRegistryDatasets())

        return action
      }
    })
  }
}

export function updateDataset (peername = '', name = '', secrets = {}, dryRun = false) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [DATASET_UPDATE_REQUEST, DATASET_UPDATE_SUCCESS, DATASET_UPDATE_FAILURE],
        endpoint: `/update/${peername}/${name}`,
        method: 'POST',
        data: { secrets, 'dry_run': dryRun },
        schema: Schemas.DATASET
      }
    })
  }
}

export function runDatasetSearch (searchString, page = 1, pageSize = 5) {
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

export function addDataset (peername, name, profileID, path) {
  return (dispatch) => {
    dispatch(setTransferStatus(path))
    var endpoint = `/add/${peername}/${name}`
    if (path) {
      endpoint += `@${profileID}${path}`
    }
    return dispatch({
      [CALL_API]: {
        types: [DATASET_ADD_REQUEST, DATASET_ADD_SUCCESS, DATASET_ADD_FAILURE],
        endpoint: endpoint,
        method: 'POST',
        schema: Schemas.DATASET
      }
    }).then(action => {
      if (action.type === DATASET_ADD_SUCCESS) {
        dispatch(removeTransferStatus(path))
        dispatch(setMessage('Peer dataset added to your local datasets!'))
        setTimeout(() => {
          dispatch(resetMessage())
        }, 2500)
      } else {
        setTransferStatus(path, -1)
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

export function loadBodyFile (key) {
  return (dispatch) => {
    return dispatch({
      [GET_CAF]: {
        types: [CAFS_BODY_FILE_REQUEST, CAFS_BODY_FILE_SUCCESS, CAFS_BODY_FILE_FAILURE],
        key
      }
    })
  }
}
