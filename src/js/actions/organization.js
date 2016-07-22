import { CALL_API, Schemas } from '../middleware/api'

export const ORGANIZATIONS_REQUEST = 'ORGANIZATIONS_REQUEST'
export const ORGANIZATIONS_SUCCESS = 'ORGANIZATIONS_SUCCESS'
export const ORGANIZATIONS_FAILURE = 'ORGANIZATIONS_FAILURE'

function fetchDatasets(query, page, pageSize) {
  return {
    CALL_API : {
      types : [ ORGANIZATIONS_REQUEST, ORGANIZATIONS_SUCCESS, ORGANIZATIONS_FAILURE ],
      endpoint : '/organizations',
      data : { query, page, pageSize },
      schema : Schemas.ORGANIZATION_ARRAY
    }
  }
}

function loadDatasets(query, page, pageSize) {
  return (dispatch, getState) => {
    // const user = getState().entities.users[login]
    // if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(fetchDatasets(query, page, pageSize))
  }
}


export const ORGANIZATION_REQUEST = 'ORGANIZATION_REQUEST'
export const ORGANIZATION_SUCCESS = 'ORGANIZATION_SUCCESS'
export const ORGANIZATION_FAILURE = 'ORGANIZATION_FAILURE'

function fetchDataset(id, requiredFields=[]) {
  return {
    CALL_API : {
      types : [ ORGANIZATION_REQUEST, ORGANIZATION_SUCCESS, ORGANIZATION_FAILURE ],
      endpoint : `/organizations/${id}'`,
      id : id,
      schema : Schemas.ORGANIZATION
    }
  }
}

function loadDataset(id, requiredFields=[]) {
  return (dispatch, getState) => {
    const dataset = getState().entities.users[login]
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchDataset(id, requiredFields))
  }
}