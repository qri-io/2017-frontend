import { selectIds } from './pagination'

const searchSection = 'searchedDatasets'

export function selectSearchResults (state, searchResults) {
  const ids = selectIds(state, searchSection, searchResults)
  return ids.map(id => state && state.entities && state.entities.search && state.entities.search[id])
}
