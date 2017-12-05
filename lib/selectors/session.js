export function selectSessionUser (state) {
  const { session } = state.entities
  const users = Object.keys(session).map(k => session[k])
  for (var i = 0; i < users.length; i++) {
    if (users[i] && users[i].id) {
      return users[i]
    }
  }
}

export function selectSshKeys (state) {
  // TODO rename ssh_keys to keyPairs - figure out what to do with this
  // const { ssh_keys } = state.entities
  // if (!ssh_keys) {
  //   return undefined
  // }
  // return Object.keys(ssh_keys).map(id => ssh_keys[id])
  return []
}

export function selectLocalSessionUser (state) {
  const { session } = state.locals
  if (!session) {
    return undefined
  }
  const users = Object.keys(session).map(k => session[k])
  return (users.length === 1) ? users[0] : undefined
}
