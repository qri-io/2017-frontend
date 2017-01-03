

export function selectSessionUser(state) {
	const { session } = state.entities
	const users = Object.keys(session).map(k => session[k])
	return (users.length == 1) ? users[0] : undefined
}

export function selectSshKeys(state) {
	const { ssh_keys } = state.entities;
	if (!ssh_keys) {
		return undefined;
	}
	return Object.keys(ssh_keys).map(id => ssh_keys[id])
}

export function selectLocalSessionUser(state) {
	const { session } = state.locals
	if (!session) {
		return undefined;
	}
	const users = Object.keys(session).map(k => session[k])
	return (users.length == 1) ? users[0] : undefined;
}