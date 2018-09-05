export function selectTransferStatus (state, id) {
  return state && state.transfers && state.transfers[id]
}

export function selectIsTransfering (state, id) {
  return state && state.transfers && !!Object.keys(state.transfers).find(elm => elm === id)
}

export function selectTransfers (state) {
  return state && Object.keys(state.transfers)
}
