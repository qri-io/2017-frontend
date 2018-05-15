import { selectIds } from './pagination'

const usersProfilesSection = 'popularProfiles'
const usersProfilesNode = 'popularProfiles'

export function selectProfiles (state, section, node) {
  if (!section && !node) {
    section = usersProfilesSection
    node = usersProfilesNode
  }
  const profiles = state && state.entities && state.entities.profiles
  return selectIds(state, section, node).map(id => {
    return profiles[id]
  })
}

export function selectProfileById (state, path) {
  const profiles = state && state.entities && state.entities.profiles
  return profiles && profiles[path]
}

export function selectProfileByName (state, name) {
  const id = selectProfileIdByName(state, name)
  return id ? state.entities.profiles[id] : undefined
}

export function selectProfileIdByName (state, name) {
  const profiles = state && state.entities && state.entities.profiles
  if (!profiles) {
    return ''
  }
  const id = Object.keys(profiles).find(id => profiles[id].peername === name)
  return id || ''
}
