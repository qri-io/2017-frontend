import { CALL_API } from '../middleware/api'
import { push } from 'react-router-redux';

import Schemas from '../schemas'
import { setMessage, resetMessage } from './app'
import { updateLocalModel, editModel, clearLocalModel } from './locals'
import { selectSessionUser } from '../selectors/session';

export const SESSION_USER_REQUEST = 'SESSION_USER_REQUEST'
export const SESSION_USER_SUCCESS = 'SESSION_USER_SUCCESS'
export const SESSION_USER_FAILURE = 'SESSION_USER_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchSessionUser() {
  return {
    [CALL_API]: {
      types: [ SESSION_USER_REQUEST, SESSION_USER_SUCCESS, SESSION_USER_FAILURE ],
      endpoint: `/session`,
      schema: Schemas.SESSION_USER,
      silentError : true
    }
  }
}

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadSessionUser() {
  return (dispatch, getState) => {
    if (getState().session.requestedSession) {
      return null
    }

    return dispatch(fetchSessionUser())
  }
}

export const EDIT_SESSION_USER = 'EDIT_SESSION_USER';
export function editSessionUser() {
  return (dispatch, getState) => {
    const user = selectSessionUser(getState());
    if (!user) {
      return null
    }

    return dispatch(editModel(Schemas.SESSION_USER, EDIT_SESSION_USER, user));
  }
}

const SESSION_USER_UPDATE = 'SESSION_USER_UPDATE';
export function updateSessionUser(user) {
  return updateLocalModel(Schemas.SESSION_USER, SESSION_USER_UPDATE, user);
}

export const SAVE_SESSION_USER_REQUEST = 'SAVE_SESSION_USER_REQUEST';
export const SAVE_SESSION_USER_SUCCESS = 'SAVE_SESSION_USER_SUCCESS';
export const SAVE_SESSION_USER_FAILURE = 'SAVE_SESSION_USER_FAILURE';

export function saveSessionUser(user) {
  return (dispatch, setState) => {
    return dispatch({
      [CALL_API] : {
        types : [SAVE_SESSION_USER_REQUEST, SAVE_SESSION_USER_SUCCESS, SAVE_SESSION_USER_FAILURE],
        endpoint : '/session',
        method : 'PUT',
        schema : Schemas.SESSION_USER,
        data : user
      }
    }).then(action => {
      if (action.type == SAVE_SESSION_USER_SUCCESS) {
        dispatch(setMessage("settings successfully saved"));
        setTimeout(() => {
          dispatch(resetMessage());
        }, 3500);
        return dispatch(push(`/${user.username}`));
      }

      return null
    });
  }
}

export const SESSION_LOGIN_REQUEST = 'SESSION_LOGIN_REQUEST'
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS'
export const SESSION_LOGIN_FAILURE = 'SESSION_LOGIN_FAILURE'

export function loginUser(username, password) {
  return {
    [CALL_API] : {
      types : [SESSION_LOGIN_REQUEST, SESSION_LOGIN_SUCCESS, SESSION_LOGIN_FAILURE],
      endpoint : '/session',
      method : 'POST',
      schema : Schemas.SESSION_USER,
      data : { username, password }
    }
  }
}

export const SESSION_ADD_HISTORY_ENTRY = 'SESSION_ADD_HISTORY_ENTRY'

export function addHistoryEntry(query) {
  return {
    type : SESSION_ADD_HISTORY_ENTRY,
    value : query
  } 
}