import { selectUserByUsername } from './user'
import { selectIds } from './pagination'

const usersQueriesSection = 'popularQueries'
const usersQueriesNode = 'popularQueries'

export function selectQueryById (state, id) {
  return state.entities.queries[id]
}

export function selectQueryByAddress (state, address) {
  const { queries } = state.entities
  const id = Object.keys(queries).find(id => (queries[id].address === address))
  return id ? queries[id] : undefined
}

export function selectUserQueries (state, username) {
  const user = selectUserByUsername(state, username)
  const { queries } = state.entities
  if (!user) {
    return []
  }

  return Object.keys(queries).reduce((set, id) => {
    const q = queries[id]
    if (q.owner === user.id) {
      set.push(q)
    }
    return set
  }, [])
}

export function selectQueryBySlug (state, slug) {
  const { queries } = state.entities
  const id = Object.keys(queries).find(id => (queries[id].slug === slug))
  return id ? queries[id] : undefined
}

export function selectLocalQueryByAddress (state, address) {
  const { queries } = state.locals
  const id = Object.keys(queries).find(id => (queries[id].address === address))
  return id ? queries[id] : undefined
}

export function selectLocalQueryById (state, id) {
  return state.locals.queries[id]
}

export function selectQueryChanges (state, queryId) {
  const { changes } = state.entities
  return changes.filter(change => (change.queryId === queryId))
}

export function selectAllQueries (state) {
  const { queries } = state.entities
  return Object.keys(queries).map(id => queries[id]).sort((a, b) => {
    return (a.address === b.address) ? 0 : ((a.address < a.address)) ? -1 : 1
  })
}

export function selectQueries (state, section, node) {
  if (!section && !node) {
    section = usersQueriesSection
    node = usersQueriesNode
  }
  const { queries } = state.entities
  function compareQueries (a, b) {
    const timestampA = queries[a].dataset.timestamp
    const timestampB = queries[b].dataset.timestamp
    //
    if (timestampB < timestampA) {
      return -1
    }
    if (timestampA < timestampB) {
      return 1
    }
    return 0
  }
  return selectIds(state, section, node, compareQueries).map(id => queries[id])
}
