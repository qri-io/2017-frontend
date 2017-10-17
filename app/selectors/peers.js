const usersPeersSection = 'popularPeers'
const usersPeersNode = 'popularPeers'

export function selectPeers (state, section, node) {
  if (!section && !node) {
    section = usersPeersSection
    node = usersPeersNode
  }
  const { peers } = state.entities
  return selectPeersIds(state, section, node).map(id => peers[id])
}

export function selectPeersIsFetching (state, section, node) {
  if (!section && !node) {
    section = usersPeersSection
    node = usersPeersNode
  }
  return (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].isFetching : false
}

export function selectPeersPageCount (state, section, node) {
  if (!section && !node) {
    section = usersPeersSection
    node = usersPeersNode
  }
  return (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].pageCount : 0
}

export function selectPeersFetchedAll (state, section, node) {
  if (!section && !node) {
    section = usersPeersSection
    node = usersPeersNode
  }
  return (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].fetchedAll : false
}

export function selectPeersIds (state, section, node) {
  if (!section && !node) {
    section = usersPeersSection
    node = usersPeersNode
  }
  return (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].ids : []
}

export function selectPeerNamespaceIds (state, path) {
  const ids = (state.pagination.peerNamespace && state.pagination.peerNamespace[path]) ? state.pagination.peerNamespace[path].ids : []
  return ids
}

export function selectPeerNamespace (state, path) {
  const { peerNamespace } = state.entities
  return selectPeerNamespaceIds(state, path).map(id => peerNamespace[id])
}

export function selectPeerById (state, path) {
  const { peers } = state.entities
  return (peers && peers[path]) ? peers[path] : ''
}

export function selectNoPeerNamespace (state, path) {
  return (state.pagination.peerNamespace && state.pagination.peerNamespace[path] && selectPeerNamespacePageCount(state, path) === 1 && selectPeerNamespaceFetchedAll(state, path) === true)
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
