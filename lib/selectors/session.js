import { selectProfileById } from './profiles'

export function selectSessionProfile (state) {
  return state.session
}

export function selectSessionProfilename (state) {
  const sessionProfile = state.session
  const profile = selectProfileById(state, sessionProfile)
  return profile ? profile.peername : undefined
}
