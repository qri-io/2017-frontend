import { selectPageCount, selectFetchedAll } from './pagination'
import { selectIsTransfering } from './transfers'
import { selectSessionProfileId } from './session'

export const usersDatasetsSection = 'popularDatasets'
const usersDatasetsNode = 'popularDatasets'

export function selectDatasetByName (state, peername, name) {
  const { datasets } = state.entities
  const commits = Object.keys(datasets).filter(id => {
    return (datasets[id].peername === peername && datasets[id].name === name)
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

export function selectDatasetByPath (state, path) {
  const { datasets } = state.entities
  return datasets ? datasets[path] : undefined
}

export function selectDatasetBody (state, path) {
  const body = state.entities.body[path]
  return body ? body.data : undefined
}

export function selectDatasetIdByName (state, peername, name) {
  const datasetRef = selectDatasetByName(state, peername, name)
  return datasetRef ? datasetRef.path : ''
}

export function selectDatasetBodyIsFetching (state, path) {
  const body = state.pagination && state.pagination.datasetBody && state.pagination.datasetBody[path]
  return body ? body.isFetching : false
}

export function selectLocalDatasetByPath (state, path) {
  const { datasets } = state.locals
  return datasets ? datasets[path] : undefined
}

export function selectLocalDatasetByName (state, peername, name) {
  const { datasets } = state.locals
  const id = Object.keys(datasets).find(id => (datasets[id].peername === peername && datasets[id].name === name))
  return id ? datasets[id] : undefined
}

export function selectDryRunDatasetById (state, id) {
  return state.entities.datasetDryRuns[id]
}

export function selectDatasets (state, section, node) {
  if (!section && !node) {
    section = usersDatasetsSection
    node = usersDatasetsNode
  }
  const { datasets } = state.entities
  function comparedatasets (a, b) {
    const timestampA = datasets[a].dataset.commit.timestamp
    const timestampB = datasets[b].dataset.commit.timestamp
    //
    if (timestampB < timestampA) {
      return -1
    }
    if (timestampA < timestampB) {
      return 1
    }
    return 0
  }
  return selectDatasetsIds(state, section, node, comparedatasets).map(id => {
    const dataset = Object.assign({}, datasets[id])
    // if the dataset is transfering, mark that in the dataset
    if (selectIsTransfering(state, id)) {
      dataset['transfering'] = true
    }
    return dataset
  })
}

export function selectDatasetsPageCount (state, section, node) {
  if (!section && !node) {
    section = usersDatasetsSection
    node = usersDatasetsNode
  }
  return (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].pageCount : 0
}

export function selectDatasetsFetchedAll (state, section, node) {
  if (!section && !node) {
    section = usersDatasetsSection
    node = usersDatasetsNode
  }
  return (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].fetchedAll : false
}

export function selectDatasetsIds (state, section, node, compare) {
  if (!section && !node) {
    section = usersDatasetsSection
    node = usersDatasetsNode
  }
  let ids = (state.pagination[section] && state.pagination[section][node]) ? state.pagination[section][node].ids : []
  if (compare) {
    ids.sort(compare)
  }
  return ids
}

export function selectNoDatasets (state, section, node) {
  if (!section && !node) {
    section = usersDatasetsSection
    node = usersDatasetsNode
  }
  return (state.pagination[section] && state.pagination[section][node] && selectDatasetsPageCount(state, section, node) === 1 && selectDatasetsFetchedAll(state, section, node) === true && selectDatasetsIds(state, section, node).length === 0)
}

export function selectNoDatasetBody (state, section, node) {
  if (!section && !node) {
    section = usersDatasetsSection
    node = usersDatasetsNode
  }
  const data = selectDatasetBody(state, node)
  return !!(state.pagination[section] && state.pagination[section].node) && selectPageCount(state, section, node) === 1 &&
 selectFetchedAll(state, section, node) === true && (data === [] || data === {})
}

// extractSchema should be used when trying to get the schema
// it will extract the column names and details for structured data
// or the full schema for unstructured data
export function extractSchema (datasetRef = {}) {
  var structure = datasetRef.dataset && datasetRef.dataset.structure
  if (!structure) {
    return undefined
  }

  var format = structure.format
  if (!format) {
    return undefined
  }

  if (format !== 'csv') {
    return structure.schema
  }

  return structure.schema && structure.schema.items && structure.schema.items.items
}

export function isLocalDataset (state, path) {
  const sessionID = selectSessionProfileId(state)
  const datasetIds = state && state.pagination && state.pagination[usersDatasetsSection] && state.pagination[usersDatasetsSection][sessionID] && state.pagination[usersDatasetsSection][sessionID].ids
  if (!datasetIds) {
    return false
  }
  if (datasetIds.includes(path)) {
    return true
  }
  const datasetRef = state && state.entities && state.entities.datasets && state.entities.datasets[path]
  const profileID = datasetRef && datasetRef.dataset && datasetRef.dataset.commit && datasetRef.dataset.commit.author && datasetRef.dataset.commit.author.id
  return profileID === sessionID
}
