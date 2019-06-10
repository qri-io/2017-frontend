import { selectPageCount, selectFetchedAll } from './pagination'

export const jobsSection = 'updateJobs'

export function selectJobs (state) {
  const { jobs } = state.entities

  if (!state.pagination[jobsSection] || !state.pagination[jobsSection][jobsSection]) {
    return []
  }

  return state.pagination[jobsSection][jobsSection].ids.map((id) => jobs[id])
}

export function selectJobsPageCount (state) {
  return selectPageCount(state, jobsSection, jobsSection)
}

export function selectJobsFetchedAll (state) {
  return selectFetchedAll(state, jobsSection, jobsSection)
}

export function selectNoJobs (state, section, node) {
  return false
  // TODO (b5):
  // return (state.pagination[section] && state.pagination[section][node] && selectDatasetsPageCount(state, section, node) === 1 && selectDatasetsFetchedAll(state, section, node) === true && selectDatasetsIds(state, section, node).length === 0)
}

export const logsSection = 'updateLogs'

export function selectLogs (state) {
  const { logs } = state.entities

  if (!state.pagination[logsSection] || !state.pagination[logsSection][logsSection]) {
    return []
  }

  return state.pagination[logsSection][logsSection].ids.map((id) => logs[id])
}

export function selectLogsPageCount (state, node) {
  return selectPageCount(state, logsSection, logsSection)
}

export function selectLogsFetchedAll (state) {
  return selectFetchedAll(state, logsSection, logsSection)
}

export function selectNoLogs (state, section, node) {
  return false
  // TODO (b5):
  // return (state.pagination[section] && state.pagination[section][node] && selectDatasetsPageCount(state, section, node) === 1 && selectDatasetsFetchedAll(state, section, node) === true && selectDatasetsIds(state, section, node).length === 0)
}
