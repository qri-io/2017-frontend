import Schemas from '../schemas'
import { CALL_API } from '../middleware/api'

import {
  UPDATE_JOBS_REQUEST,
  UPDATE_JOBS_SUCCESS,
  UPDATE_JOBS_FAILURE,
  UPDATE_LOGS_REQUEST,
  UPDATE_LOGS_SUCCESS,
  UPDATE_LOGS_FAILURE,
  UPDATE_LOG_FILE_REQUEST,
  UPDATE_LOG_FILE_SUCCESS,
  UPDATE_LOG_FILE_FAILURE
} from '../constants/updates'

export function fetchJobs (page = 1, pageSize = 30) {
  return {
    [CALL_API]: {
      types: [UPDATE_JOBS_REQUEST, UPDATE_JOBS_SUCCESS, UPDATE_JOBS_FAILURE],
      endpoint: `/update`,
      data: { page, pageSize },
      schema: Schemas.JOB_ARRAY,
      silentError: true
    },
    page,
    pageSize
  }
}

export function loadJobs (page = 1, pageSize = 30) {
  return (dispatch) => {
    return dispatch(fetchJobs(page, pageSize))
  }
}

export function fetchLogs (page = 1, pageSize = 30) {
  return {
    [CALL_API]: {
      types: [UPDATE_LOGS_REQUEST, UPDATE_LOGS_SUCCESS, UPDATE_LOGS_FAILURE],
      endpoint: `/update/logs`,
      data: { page, pageSize },
      schema: Schemas.LOG_ARRAY,
      silentError: true
    },
    page,
    pageSize
  }
}

export function loadLogs (page = 1, pageSize = 30) {
  return (dispatch) => {
    return dispatch(fetchLogs(page, pageSize))
  }
}

// export function fetchLogFile (logName = '') {
//   return {
//     [CALL_API]: {
//       types: [UPDATE_LOG_FILE_REQUEST, UPDATE_LOG_FILE_SUCCESS, UPDATE_LOG_FILE_FAILURE],
//       endpoint: `/update`,
//       data: { 'log_name': logName },
//       schema: Schemas.JOB_LOG_FILE,
//       silentError: true
//     },
//     logName
//   }
// }


// export function loadTransform (key) {
//   return (dispatch) => {
//     // TODO - bail early if key is already in state tree
//     // if (getState())
//     return dispatch({
//       [GET_CAF]: {
//         types: [CAFS_TRANSFORM_REQUEST, CAFS_TRANSFORM_SUCCESS, CAFS_TRANSFORM_FAILURE],
//         key
//       }
//     })
//   }
// }