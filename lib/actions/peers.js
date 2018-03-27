import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'
import { selectPeerById, selectPeerByName } from '../selectors/peers'

import {
  PEER_REQUEST,
  PEER_SUCCESS,
  PEER_FAILURE,

  PEERS_REQUEST,
  PEERS_SUCCESS,
  PEERS_FAILURE,

  CONNECTIONS_REQUEST,
  CONNECTIONS_SUCCESS,
  CONNECTIONS_FAILURE
} from '../constants/peers'

export function fetchPeers (page = 1, pageSize = 30) {
  return {
    [CALL_API]: {
      types: [PEERS_REQUEST, PEERS_SUCCESS, PEERS_FAILURE],
      endpoint: '/peers',
      data: { page, pageSize },
      schema: Schemas.PEER_ARRAY
    },
    page,
    pageSize
  }
}

export function loadPeers (page = 1, pageSize = 30) {
  return (dispatch, getState) => {
    // TODO - check pagination
    return dispatch(fetchPeers(page, pageSize))
  }
}

export function fetchPeerById (id) {
  return {
    [CALL_API]: {
      types: [PEER_REQUEST, PEER_SUCCESS, PEER_FAILURE],
      endpoint: `/connect/${id}`,
      schema: Schemas.PEER
    }
  }
}

export function loadPeerById (id) {
  return (dispatch, getState) => {
    if (selectPeerById(getState(), id)) {
      return new Promise((resolve, reject) => {})
    }
    return dispatch(fetchPeerById(id))
  }
}

export function fetchPeerByName (name) {
  return {
    [CALL_API]: {
      types: [PEER_REQUEST, PEER_SUCCESS, PEER_FAILURE],
      endpoint: `/${name}`,
      schema: Schemas.PEER
    }
  }
}

export function loadPeerByName (name) {
  return (dispatch, getState) => {
    if (selectPeerByName(getState(), name)) {
      return new Promise((resolve, reject) => {})
    }
    return dispatch(
      fetchPeerByName(name)
      )
  }
}

export function connections () {
  return {
    [CALL_API]: {
      types: [CONNECTIONS_REQUEST, CONNECTIONS_SUCCESS, CONNECTIONS_FAILURE],
      endpoint: '/connections',
      schema: Schemas.CONNECTIONS
    }
  }
}
