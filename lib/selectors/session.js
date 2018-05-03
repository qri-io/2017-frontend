import { selectProfileById } from './profiles'

export function selectSessionProfileId (state) {
  return state.session
}

export function selectSessionProfilename (state) {
  const sessionProfile = state.session
  const profile = selectProfileById(state, sessionProfile)
  return profile ? profile.peername : undefined
}

export function selectSessionProfile (state) {
  const sessionProfile = state.session
  return selectProfileById(state, sessionProfile)
}

export function selectLocalProfile (state) {
  const sessionProfile = state.session
  return state.locals.profiles && state.locals.profiles[sessionProfile]
}
