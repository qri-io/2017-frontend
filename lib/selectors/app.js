export function selectSearchString (state) {
  return state && state.app && state.app.search
}

export function selectLocation (state) {
  return state && state.app && state.app.location
}
