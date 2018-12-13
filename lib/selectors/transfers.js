export function selectTransferStatus (state, id) {
  return state && state.transfers && state.transfers[id]
}

export function selectIsTransfering (state, id) {
  const path = state && state.transfers && Object.keys(state.transfers).find(elm => elm === id)
  if (!path) {
    return false
  }
  const status = state.transfers[path]
  return status <= 0
}

export function selectTransfers (state) {
  return state && Object.keys(state.transfers)
}
