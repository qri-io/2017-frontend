const registrySection = 'registryDatasets'
const registryNode = 'registryDatasets'

export function selectRegistryListIds (state) {
  return (state.pagination[registrySection] && state.pagination[registrySection][registryNode]) ? state.pagination[registrySection][registryNode].ids : []
}

export function selectRegistryList (state) {
  const { registry } = state.entities
  return selectRegistryListIds(state, registrySection, registryNode).map(id => {
    return Object.assign({}, registry[id])
  })
}

export function selectRegistryListIsFetching (state) {
  return state.pagination && state.pagination[registrySection] && state.pagination[registrySection][registryNode] && state.pagination[registrySection][registryNode].isFetching
}

export function selectRegistryListFetchedAll (state) {
  return state.pagination && state.pagination[registrySection] && state.pagination[registrySection][registryNode] && state.pagination[registrySection][registryNode].fetchedAll
}

export function selectRegistryDatasetByPath (state, path) {
  const { registry } = state.entities
  return registry ? registry[path] : undefined
}

export function selectRegistryDatasetByName (state, handle, name) {
  const { registry } = state.entities
  const commits = Object.keys(registry).filter(id => {
    return (registry[id].peername === handle && registry[id].name === name)
  })
  function compareCommits (a, b) {
    const timestampA = registry[a].dataset.commit.timestamp
    const timestampB = registry[b].dataset.commit.timestamp

    if (timestampB < timestampA) {
      return -1
    }
    if (timestampA < timestampB) {
      return 1
    }
    return 0
  }
  commits.sort(compareCommits)
  const id = commits ? commits[0] : undefined
  return id ? registry[id] : undefined
}

export function selectRegistryDatasetIdByName (state, peername, name) {
  const datasetRef = selectRegistryDatasetByName(state, peername, name)
  return datasetRef ? datasetRef.path : ''
}
