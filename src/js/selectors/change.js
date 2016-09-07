
export function selectChangeById(state, id) {
	return state.entities.changes[id];
}

// Supports selecting by either address & change number combo,
// or just slamming an ID into the number field
export function selectChangeByNumber(state, address, number) {
	const { changes } = state.entities;
	const id = Object.keys(changes).find(id => (changes[id].number == number && changes[id].address == address) || id == number);
	return id ? changes[id] : undefined;
}


export function selectLocalChangeById(state, id) {
	return state.local.changes[id];
}

// Supports selecting by either address & change number combo,
// or just slamming an ID into the number field
export function selectLocalChangeByNumber(state, address, number) {
	const { changes } = state.locals;
	const id = Object.keys(changes).find(id => (changes[id].number == number && changes[id].address == address) || id == number);
	return id ? changes[id] : undefined;
}