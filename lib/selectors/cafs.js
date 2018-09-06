export function selectCAFSLoading (state, key) {
  return state && state.cafs && state.cafs[key] && state.cafs[key].loading
}

export function selectCAFSData (state, key) {
  return state && state.cafs && state.cafs[key] && state.cafs[key].data
}

export function selectCAFSError (state, key) {
  return state && state.cafs && state.cafs[key] && state.cafs[key].error
}

export function selectCAFSString (state, key) {
  const buffer = selectCAFSData(state, key)
  return String.fromCharCode.apply(null, new Int8Array(buffer))
}
