import { selectSessionDatasetsCount, selectSessionRepoSize } from './session'

export function selectStats (state) {
  const datasetCount = selectSessionDatasetsCount(state)
  const repoSize = selectSessionRepoSize(state)
  return [
    {
      title: 'datasets',
      stat: datasetCount
    },
    {
      title: 'repo size (heads)',
      stat: repoSize.value + repoSize.name
    }
  ]
}
