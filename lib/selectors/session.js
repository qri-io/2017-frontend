import { selectProfileById } from './profiles'
import { selectIds } from './pagination'

const datasetsSection = 'popularDatasets'

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

export function selectSessionDatasets (state) {
  const sessionId = selectSessionProfileId(state)
  return selectIds(state, datasetsSection, sessionId)
}

export function selectIsSessionDataset (state, datasetRef) {
  if (!datasetRef) {
    return false
  }
  return !!selectSessionDatasets(state).find(id => {
    return id === datasetRef.path
  })
}
