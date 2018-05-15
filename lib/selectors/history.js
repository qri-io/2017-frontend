import { selectIds } from './pagination'

const usersHistorySection = 'datasetHistory'
const usersHistoryNode = 'datasetHistory'

export function selectHistory (state, section, node) {
  if (!section && !node) {
    section = usersHistorySection
    node = usersHistoryNode
  }
  const { datasets } = state.entities

  function compareHistory (a, b) {
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
  return selectIds(state, section, node, compareHistory).map(id => datasets[id])
}
