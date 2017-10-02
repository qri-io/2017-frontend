
export const COMMAND_PARSE_ERROR = 'COMMAND_PARSE_ERROR'

// const commandMap = {
//   'run': runQuery,
//   'search': search
// }

// runCommand parses a full command string & determines the action to call
export function runCommand (cmdString = '') {
  // TODO
  return (dispatch, getState) => {
    return dispatch()
  }
}

export const COMMAND_ADD_HISTORY_ENTRY = 'COMMAND_ADD_HISTORY_ENTRY'
export function addHistoryEntry (command) {
  return {
    type: COMMAND_ADD_HISTORY_ENTRY,
    command
  }
}

export const COMMAND_SEARCH = 'COMMAND_SEARCH'
export function search (query = '') {
  const action = {
    type: COMMAND_SEARCH,
    query
  }
  return (dispatch, getState) => {
    dispatch(addHistoryEntry(action))
    return dispatch(action)
  }
}

export const COMMAND_RUN_QUERY = 'COMMAND_RUN_QUERY'
export function runQuery (query = '') {
  const action = {
    type: COMMAND_RUN_QUERY,
    query
  }

  return (dispatch, getState) => {
    dispatch(addHistoryEntry(action))
    return dispatch(action)
  }
}

export const COMMAND_DATASET_INFO = 'COMMAND_DATASET_INFO'
export function datasetInfo (address = '') {
  const action = {
    type: COMMAND_DATASET_INFO,
    address
  }

  return (dispatch, getState) => {
    dispatch(addHistoryEntry(action))
    return dispatch(action)
  }
}
