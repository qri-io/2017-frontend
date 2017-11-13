
// default key looks for a key named "default key", falling back to any
// available key
export function selectDefaultKey (state) {
  const { keys } = state.entities
  return Object.keys(keys).map(id => keys[id]).reduce((key, a) => {
    if (key && key.name === 'default key') {
      return key
    }
    return a
  }, {})
}

export function selectDefaultKeyId (state) {
  const key = selectDefaultKey(state)
  return key.sha256 || ''
}

export function selectKeys (state) {
  const { keys } = state.entities
  return Object.keys(keys).map(id => keys[id])
}
