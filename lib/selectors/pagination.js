export function selectIds (state, section, node) {
  return (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].ids : []
}
export function selectPage (state, section, node, entitiesSection) {
  return selectIds(state, section, node).map(id => state.entities[entitiesSection][id])
}

export function selectIsFetching (state, section, node) {
  return (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].isFetching : false
}

export function selectPageCount (state, section, node) {
  return (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].pageCount : 0
}

export function selectFetchedAll (state, section, node) {
  return (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].fetchedAll : false
}