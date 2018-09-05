import {
  SET_TRANSFER_STATUS,
  REMOVE_TRANSFER_STATUS
} from '../constants/transfers'

export function setTransferStatus (id, status = 0) {
  return {
    type: SET_TRANSFER_STATUS,
    id,
    status
  }
}

export function removeTransferStatus (id) {
  return {
    type: REMOVE_TRANSFER_STATUS,
    id
  }
}
