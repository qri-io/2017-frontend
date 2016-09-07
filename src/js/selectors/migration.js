
export function selectMigrationById(state, id) {
	return state.entities.migrations[id];
}

// Supports selecting by either address & change number combo,
// or just slamming an ID into the number field
export function selectMigrationByNumber(state, address, number) {
	const { migrations } = state.entities;
	const id = Object.keys(migrations).find(id => (migrations[id].number == number && migrations[id].address == address) || id == number);
	return id ? migrations[id] : undefined;
}


export function selectLocalMigrationById(state, id) {
	return state.locals.migrations[id];
}

// Supports selecting by either address & change number combo,
// or just slamming an ID into the number field
export function selectLocalMigrationByNumber(state, address, number) {
	const { migrations } = state.locals;
	const id = Object.keys(migrations).find(id => (migrations[id].number == number && migrations[id].address == address) || id == number);
	return id ? migrations[id] : undefined;
}