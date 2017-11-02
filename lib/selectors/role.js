export function selectRoleById (state, id) {
  return state.entities.roles[id]
}

export function selectUserRoles (state, user) {
  if (!user || !user.id) { return [] }

  const { roles } = state.entities
  return Object.keys(roles).reduce((sets, id) => {
    const role = roles[id]
    if (role.user === user.id) {
      sets.push(role)
    }
    return sets
  }, [])
}

export function selectRoleByAddress (state, address) {
  const { roles } = state.entities
  const id = Object.keys(roles).find(id => (roles[id].address === address))
  return id ? roles[id] : undefined
}

export function selectLocalRoleByAddress (state, address) {
  const { roles } = state.locals
  const id = Object.keys(roles).find(id => (roles[id].address === address))
  return id ? roles[id] : undefined
}

export function selectLocalRoleById (state, id) {
  return state.locals.roles[id]
}

export function selectAllRoles (state) {
  const { roles } = state.entities
  return Object.keys(roles).map(id => roles[id]).sort((a, b) => {
    return (a.address === b.address) ? 0 : ((a.address < b.address)) ? -1 : 1
  })
}
