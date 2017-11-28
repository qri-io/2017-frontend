import { selectDataset } from './dataset.js'
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

export function selectPeerNamespaceIds (state, path) {
  const ids = (state.pagination.peerNamespace && state.pagination.peerNamespace[path]) ? state.pagination.peerNamespace[path].ids : []
  return ids
}

export function selectPeerNamespace (state, path) {
  return selectPeerNamespaceIds(state, path).map(id => selectDataset(state, id))
}

export function selectPeerById (state, path) {
  const { peers } = state.entities
  return (peers && peers[path]) ? peers[path] : ''
}

export function selectNoPeerNamespace (state, path) {
  return (state.pagination.peerNamespace && state.pagination.peerNamespace[path] && !(selectPeerNamespaceIsFetching(state, path) || selectPeerNamespaceIds(state, path).length))
}
export function selectPeerNamespaceIsFetching (state, path) {
  return (state.pagination.peerNamespace && state.pagination.peerNamespace[path]) ? state.pagination.peerNamespace[path].isFetching : false
}

export function selectPeerNamespacePageCount (state, path) {
  return (state.pagination.peerNamespace && state.pagination.peerNamespace[path]) ? state.pagination.peerNamespace[path].pageCount : 0
}
export function selectPeerNamespaceFetchedAll (state, path) {
  return (state.pagination.peerNamespace && state.pagination.peerNamespace[path]) ? state.pagination.peerNamespace[path].fetchedAll : false
}

export function selectConnections (state) {
  return state.connections && state.connections.connections ? state.connections.connections : []
}

export function selectConnected (state, id) {
  const connections = selectConnections(state)
  return connections.includes(id)
}
