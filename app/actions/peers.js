import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'

import {
  PEERS_REQUEST,
  PEERS_SUCCESS,
  PEERS_FAILURE
} from '../constants/peers'

export function fetchPeers (page = 1, pageSize = 30) {
  return {
    [CALL_API]: {
      types: [PEERS_REQUEST, PEERS_SUCCESS, PEERS_FAILURE],
      endpoint: '/peers',
      data: { page, pageSize},
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
