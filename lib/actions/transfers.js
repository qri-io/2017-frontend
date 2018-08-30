import {
  ADD_TRANSFER,
  UPDATE_TRANSFER,
  REMOVE_TRANSFER
} from '../constants/transfers'

export function addTransfer (id) {
  return {
    type: ADD_TRANSFER,
    id
  }
}

export function updateTransfer (id, status) {
  return {
    type: UPDATE_TRANSFER,
    id,
    status
  }
}

export function removeTransfer (id) {
  return {
    type: REMOVE_TRANSFER,
    id
  }
}
