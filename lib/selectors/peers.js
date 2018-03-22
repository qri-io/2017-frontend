import { selectIds } from './pagination'

const usersPeersSection = 'popularPeers'
const usersPeersNode = 'popularPeers'

export function selectPeers (state, section, node) {
  if (!section && !node) {
    section = usersPeersSection
    node = usersPeersNode
  }
  const connections = selectConnections(state)
  const { peers } = state.entities
  function comparePeers (a, b) {
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
  return selectIds(state, section, node, comparePeers).map(id => {
    if (connections.includes(id)) {
      return Object.assign({}, peers[id], { connected: true })
    }
    return peers[id]
  })
}

export function selectPeerById (state, path) {
  const peers = state && state.entities && state.entities.peers
  return (peers && peers[path]) ? peers[path] : undefined
}

export function selectPeerByName (state, name) {
  const id = selectPeerIdByName(state, name)
  return id ? state.entities.peers[id] : undefined
}

export function selectPeerIdByName (state, name) {
  const peers = state && state.entities && state.entities.peers
  if (!peers) {
    return ''
  }
  const id = Object.keys(peers).find(id => peers[id].peername === name)
  return id || ''
}

export function selectConnections (state) {
  return state.connections && state.connections.connections ? state.connections.connections : []
}

export function selectConnected (state, id) {
  const connections = selectConnections(state)
  return connections.includes(id)
}
