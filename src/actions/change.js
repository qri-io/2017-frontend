import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'

import { selectChangeByNumber } from '../selectors/change'
import { setMessage, resetMessage, removeModel } from './app'
import { updateLocalModel, newLocalModel, editModel } from './locals'

import { selectDatasetByAddress } from '../selectors/dataset'
import { DATASET_SUCCESS, fetchDatasetByAddress } from './dataset'

const CHANGE_NEW = 'CHANGE_NEW'
export function newChange (address, attributes = {}) {
  return (dispatch, getState) => {
    // check for the dataset we're trying to add to
    const dataset = selectDatasetByAddress(getState(), address)
    if (dataset) {
      attributes = Object.assign({
        dataset,
        description: ''
      }, attributes)
      return newLocalModel(Schemas.CHANGE, CHANGE_NEW, attributes)
    } else {
      // otherwise, do a fetch first to make sure the dataset actually exists &
      // stuff
      dispatch(fetchDatasetByAddress(address)).then(action => {
        const dataset = selectDatasetByAddress(getState(), address)
        if (action.type === DATASET_SUCCESS) {
          attributes = Object.assign({
            description: ''
          }, attributes, { dataset })
          return dispatch(newLocalModel(Schemas.CHANGE, CHANGE_NEW, attributes))
        }

        return null
      })
    }
  }
}

const CHANGE_UPDATE = 'CHANGE_UPDATE'
export function updateChange (change) {
  return updateLocalModel(Schemas.CHANGE, CHANGE_UPDATE, change)
}

export const CHANGE_FETCH_REQUEST = 'CHANGE_FETCH_REQUEST'
export const CHANGE_FETCH_SUCCESS = 'CHANGE_FETCH_SUCCESS'
export const CHANGE_FETCH_FAIL = 'CHANGE_FETCH_FAIL'

export function fetchChange (id, requiredFields = []) {
  return {
    [CALL_API]: {
      types: [ CHANGE_FETCH_REQUEST, CHANGE_FETCH_SUCCESS, CHANGE_FETCH_FAIL ],
      endpoint: `/changes/${id}`,
      schema: Schemas.CHANGE
    }
  }
}

export function loadChange (id, requiredFields = []) {
  return (dispatch, getState) => {
    // TODO: no longer being used, consider depreciation
    // const change = getState().entities.changes[id]

    return fetchChange(id, requiredFields)
  }
}

export function fetchChangeByNumber (address, number, requiredFields = []) {
  return {
    [CALL_API]: {
      types: [ CHANGE_FETCH_REQUEST, CHANGE_FETCH_SUCCESS, CHANGE_FETCH_FAIL ],
      endpoint: `/changes?address=${address}&number=${number}`,
      schema: Schemas.CHANGE
    }
  }
}

export function loadChangeByNumber (address, number, requiredFields = []) {
  return (dispatch, getState) => {
    const change = selectChangeByNumber(getState(), address, number)
    if (change && requiredFields.every(field => (change.hasOwnProperty(field)))) {
      return null
    }

    return dispatch(fetchChangeByNumber(address, number, requiredFields))
  }
}

export const CHANGE_SAVE_REQUEST = 'CHANGE_SAVE_REQUEST'
export const CHANGE_SAVE_SUCCESS = 'CHANGE_SAVE_SUCCESS'
export const CHANGE_SAVE_FAIL = 'CHANGE_SAVE_FAIL'

export function saveChange (change) {
  if (!change.id || change.id === 'new') {
    return createChange(change)
  } else {
    return (dispatch, getState) => {
      return dispatch({
        [CALL_API]: {
          types: [ CHANGE_SAVE_REQUEST, CHANGE_SAVE_SUCCESS, CHANGE_SAVE_FAIL ],
          endpoint: `/changes/${change.id}`,
          method: 'PUT',
          schema: Schemas.CHANGE,
          data: change
        }
      }).then(action => {
        if (action.type === CHANGE_SAVE_REQUEST) {
          dispatch(setMessage('change saved'))
          setTimeout(() => dispatch(resetMessage()), 5000)
          // TODO - determine proper URL for change redirection
          return dispatch(push('/console'))
        }

        return null
      })
    }
  }
}

export const CHANGE_CREATE_REQUEST = 'CHANGE_CHANGE_REQUEST'
export const CHANGE_CREATE_SUCCESS = 'CHANGE_CHANGE_SUCCESS'
export const CHANGE_CREATE_FAIL = 'CHANGE_CHANGE_FAIL'

export function createChange (change) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [CHANGE_CREATE_SUCCESS, CHANGE_CREATE_SUCCESS, CHANGE_CREATE_FAIL],
        endpoint: '/changes',
        method: 'POST',
        schema: Schemas.CHANGE,
        data: Object.assign({}, change, { id: undefined })
      }
    }).then(action => {
      if (action.type === CHANGE_CREATE_SUCCESS) {
        const dataset = action.response.entities.datasets[Object.keys(action.response.entities.datasets)[0]]
        const path = '/' + dataset.address.replace('.', '/', -1)
        // TODO - redirect properly
        return dispatch(push(path))
      }

      return null
    })
  }
}

export const CHANGE_EXECUTE_REQUEST = 'CHANGE_EXECUTE_REQUEST'
export const CHANGE_EXECUTE_SUCCESS = 'CHANGE_EXECUTE_SUCCESS'
export const CHANGE_EXECUTE_FAIL = 'CHANGE_EXECUTE_FAIL'

export function executeChange (change) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [ CHANGE_EXECUTE_REQUEST, CHANGE_EXECUTE_SUCCESS, CHANGE_EXECUTE_FAIL ],
        endpoint: (change.id && change.id !== 'new') ? `/changes/${change.id}/execute` : `/changes/new?execute=true`,
        method: 'POST',
        schema: Schemas.CHANGE,
        data: change
      }
    }).then(action => {
      if (action.type === CHANGE_EXECUTE_SUCCESS) {
        dispatch(setMessage('Change Executed'))
        setTimeout(() => { dispatch(resetMessage()) }, 5000)
        // TODO - go somewhere of value
        return dispatch(push('/console'))
      }

      return null
    })
  }
}

export const CHANGE_DECLINE_REQUEST = 'CHANGE_DECLINE_REQUEST'
export const CHANGE_DECLINE_SUCCESS = 'CHANGE_DECLINE_SUCCESS'
export const CHANGE_DECLINE_FAIL = 'CHANGE_DECLINE_FAIL'

export function declineChange (change) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [ CHANGE_DECLINE_REQUEST, CHANGE_DECLINE_SUCCESS, CHANGE_DECLINE_FAIL ],
        endpoint: `/changes/${change.id}/decline`,
        method: 'POST',
        schema: Schemas.CHANGE,
        data: change
      }
    }).then(action => {
      if (action.type === CHANGE_DECLINE_SUCCESS) {
        dispatch(setMessage('change declined'))
        setTimeout(() => { dispatch(setMessage('change declined')) }, 5000)
        // TODO - redirect somewhere useful
        return dispatch(push('/console'))
      }

      return null
    })
  }
}

export const CHANGE_DELETE_REQUEST = 'CHANGE_DELETE_REQUEST'
export const CHANGE_DELETE_SUCCESS = 'CHANGE_DELETE_SUCCESS'
export const CHANGE_DELETE_FAIL = 'CHANGE_DELETE_FAIL'

export function deleteChange (id, redirectUrl = '') {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [ CHANGE_DELETE_REQUEST, CHANGE_DELETE_SUCCESS, CHANGE_DELETE_FAIL ],
        endpoint: `/changes/${id}`,
        method: 'DELETE',
        schema: Schemas.CHANGE
      }
    }).then(action => {
      if (action.type === CHANGE_DELETE_SUCCESS) {
        // remove the model locally
        dispatch(removeModel(Schemas.CHANGE, id))

        // on successful delete, redirect
        if (redirectUrl !== '') {
          dispatch(push(redirectUrl))
        }

        // and set a message with a timeout
        dispatch(setMessage('dataset deleted'))
        setTimeout(() => dispatch(resetMessage()), 5000)
      }

      return null
    })
  }
}

export const EDIT_CHANGE = 'EDIT_CHANGE'

export function editChange (address, number) {
  return (dispatch, getState) => {
    const change = selectChangeByNumber(getState(), address, number)
    if (!change) {
      return dispatch(fetchChangeByNumber(address, number)).then(action => {
        if (action.type === CHANGE_FETCH_SUCCESS) {
          const change = selectChangeByNumber(getState(), address, number)
          return dispatch(editModel(Schemas.CHANGE, EDIT_CHANGE, change))
        }
      })
    } else {
      return dispatch(editModel(Schemas.CHANGE, EDIT_CHANGE, change))
    }
  }
}
