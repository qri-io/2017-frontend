export function selectSessionUser (state) {
  const { session } = state.entities
  const users = Object.keys(session).map(k => session[k])
  for (var i = 0; i < users.length; i++) {
    if (users[i] && users[i].id) {
      return users[i]
    }
  }
}
