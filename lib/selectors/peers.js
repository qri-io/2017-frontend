import { selectDataset } from './dataset.js'
import { selectIds } from './pagination'

const usersPeersSection = 'popularPeers'
const usersPeersNode = 'popularPeers'

export function selectPeers (state, section, node) {
  if (!section && !node) {
    section = usersPeersSection
    node = usersPeersNode
  }
  const { peers } = state.entities
  return selectIds(state, section, node).map(id => peers[id])
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
