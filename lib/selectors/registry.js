import { usersDatasetsSection, selectDatasetsIds } from './dataset'

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

export function selectRegistryListError (state) {
  return state.pagination && state.pagination[registrySection] && state.pagination[registrySection][registryNode] && state.pagination[registrySection][registryNode].error
}

export function selectRegistryListPageCount (state) {
  return state.pagination && state.pagination[registrySection] && state.pagination[registrySection][registryNode] && state.pagination[registrySection][registryNode].pageCount
}

export function selectRegistryDatasetByPath (state, path) {
  const { datasets } = state.entities
  return datasets ? datasets[path] : undefined
}

export function selectRegistryDatasetByName (state, handle, name) {
  const { datasets } = state.entities
  const ids = selectRegistryListIds(state)
  const registryDatasetId = ids.filter(id => {
    const ds = datasets[id]
    return ds.peername === handle && ds.name === name
  })
  const id = registryDatasetId ? registryDatasetId[0] : undefined
  return id ? datasets[id] : undefined
}

export function selectRegistryDatasetIdByName (state, peername, name) {
  const datasetRef = selectRegistryDatasetByName(state, peername, name)
  return datasetRef ? datasetRef.path : ''
}

export function isRegistryDataset (state, path) {
  const registryIds = selectRegistryListIds(state)
  if (!registryIds.includes(path)) {
    return false
  }
  const allProfileIds = Object.keys(state.pagination[usersDatasetsSection])
  // iterate through each ProfileId we have
  // if the datasetPaths include the path we are looking for, return true
  // but that means that we also have a version of this dataset NOT from the registry
  // so we need to return false
  return !allProfileIds.some((profileID) => {
    const datasetPaths = selectDatasetsIds(state, usersDatasetsSection, profileID)
    return datasetPaths.includes(path)
  })
}
