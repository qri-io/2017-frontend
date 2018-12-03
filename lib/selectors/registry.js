const registrySection = 'registryDatasets'
const registryNode = 'registryDatasets'

export function selectRegistryListIds (state) {
  return (state.pagination[registrySection] && state.pagination[registrySection][registryNode]) ? state.pagination[registrySection][registryNode].ids : []
}

export function selectRegistryList (state) {
  const { datasets } = state.entities
  return selectRegistryListIds(state, registrySection, registryNode).map(id => {
    return Object.assign({}, datasets[id])
  })
}

export function selectRegistryListIsFetching (state) {
  return state.pagination && state.pagination[registrySection] && state.pagination[registrySection][registryNode] && state.pagination[registrySection][registryNode].isFetching
}

export function selectRegistryListFetchedAll (state) {
  return state.pagination && state.pagination[registrySection] && state.pagination[registrySection][registryNode] && state.pagination[registrySection][registryNode].fetchedAll
}

export function selectRegistryDatasetByPath (state, path) {
  const { datasets } = state.entities
  return datasets ? datasets[path] : undefined
}

export function selectRegistryDatasetByName (state, handle, name) {
  const { datasets } = state.entities
  const commits = Object.keys(datasets).filter(id => {
    return (datasets[id].peername === handle && datasets[id].name === name)
  })
  function compareCommits (a, b) {
    const timestampA = datasets[a].dataset.commit.timestamp
    const timestampB = datasets[b].dataset.commit.timestamp

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
  return id ? datasets[id] : undefined
}

export function selectRegistryDatasetIdByName (state, peername, name) {
  const datasetRef = selectRegistryDatasetByName(state, peername, name)
  return datasetRef ? datasetRef.path : ''
}
