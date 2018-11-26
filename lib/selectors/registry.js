import {
  selectIds,
  selectPage,
  selectIsFetching,
  selectPageCount,
  selectFetchedAll,
  selectError
} from './pagination'

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
