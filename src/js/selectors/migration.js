
export function selectMigrationById(state, id) {
	return state.entities.migrations[id];
}

export function selectMigrationByNumber(state, handle, slug, number) {
	const { migrations } = state.entities;
	return migrations[Object.keys(state.entities.migrations).find((id) => {
		let migration = migrations[id];
		return migration
	})];
}