import { selectIds } from './pagination'

const usersHistorySection = 'datasetHistory'
const usersHistoryNode = 'datasetHistory'

export function selectHistory (state, section, node) {
  if (!section && !node) {
    section = usersHistorySection
    node = usersHistoryNode
  }
  const { history } = state.entities
  function compareHistory (a, b) {
    const timestampA = history[a].dataset.timestamp
    const timestampB = history[b].dataset.timestamp
    //
    if (timestampB < timestampA) {
      return -1
    }
    if (timestampA < timestampB) {
      return 1
    }
    return 0
  }
  return selectIds(state, section, node, compareHistory).map(id => history[id])
}
