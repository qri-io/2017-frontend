import { selectIds } from './pagination'

const usersProfilesSection = 'popularProfiles'
const usersProfilesNode = 'popularProfiles'

export function selectProfiles (state, section, node) {
  if (!section && !node) {
    section = usersProfilesSection
    node = usersProfilesNode
  }
  const connections = selectConnections(state)
  const { profiles } = state.entities
  function compareProfiles (a, b) {
    const connectedA = connections.includes(a)
    const connectedB = connections.includes(b)
    if (connectedA && !connectedB) {
      return -1
    }
    if (!connectedA && connectedB) {
      return 1
    }
    return 0
  }
  return selectIds(state, section, node, compareProfiles).map(id => {
    if (connections.includes(id)) {
      return Object.assign({}, profiles[id], { connected: true })
    }
    return profiles[id]
  })
}

export function selectProfileById (state, path) {
  const profiles = state && state.entities && state.entities.profiles
  return (profiles && profiles[path]) ? profiles[path] : undefined
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

export function selectConnections (state) {
  return state.connections && state.connections.connections ? state.connections.connections : []
}

export function selectConnected (state, id) {
  const connections = selectConnections(state)
  return connections.includes(id)
}
