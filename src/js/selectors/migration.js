

export function selectMigrationByNumber(state, handle, slug, number) {
	const { migrations } = state.entities;
	return migrations[Object.keys(state.entities.migrations).find((id) => {
		let migration = migrations[id];
		return migration
	})];
}