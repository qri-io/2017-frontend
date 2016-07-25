
// search through the state tree for
export function selectUserByHandle(state, handle) {
	const { users } = state.entities
	const id = Object.keys(users).find(id => (users[id].handle == handle));
	
	return id ? users[id] : undefined;
}