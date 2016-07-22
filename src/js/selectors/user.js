
// search through the state tree for
export function selectUserByHandle(state, username) {
	const { users } = state.entities
	const id = Object.keys(users).find(id => (users[id].username == username));
	
	return id ? users[id] : undefined;
}