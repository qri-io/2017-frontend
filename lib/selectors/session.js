import { selectProfileById } from './profiles'
import { selectIds } from './pagination'
import fileSize from '../utils/filesize'

const datasetsSection = 'popularDatasets'
const datasetHistory = 'datasetHistory'

export function selectSessionProfileId (state) {
  return state.session
}

export function selectSessionProfileHandle (state) {
  const sessionProfile = state.session
  const profile = selectProfileById(state, sessionProfile)
  return profile ? profile.peername : undefined
}

export function selectSessionProfile (state) {
  const sessionProfile = state.session
  return selectProfileById(state, sessionProfile)
}

export function selectLocalProfile (state) {
  const sessionProfile = state.session
  return state.locals.profiles && state.locals.profiles[sessionProfile]
}

export function selectSessionDatasetIds (state) {
  const sessionId = selectSessionProfileId(state)
  return selectIds(state, datasetsSection, sessionId)
}

export function selectSessionDatasets (state) {
  return selectSessionDatasetIds(state).map(id => {
    return state.entities.datasets[id]
  })
}

export function selectIsSessionDataset (state, datasetRef) {
  if (!datasetRef) {
    return false
  }
  return !!(selectSessionDatasetIds(state).find(id => { return id === datasetRef.path }) || selectIsInSessionHistory(state, datasetRef.path))
}

export function selectIsInSessionHistory (state, path) {
  return selectSessionDatasets(state).find(datasetRef => {
    const dsn = `/${datasetRef.peername}/${datasetRef.name}`
    const ids = selectIds(state, datasetHistory, dsn)
    return ids.find(id => {
      return id === path
    })
  })
}

export function selectSessionDatasetsCount (state) {
  const ds = selectSessionDatasetIds(state)
  return ds ? ds.length : undefined
}

export function selectSessionRepoSize (state) {
  const ds = selectSessionDatasets(state)
  var size = 0
  ds.forEach((d, i) => {
    size += d.dataset.structure.length
  })
  return fileSize(size)
}
