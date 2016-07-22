
export function selectDatasetBySlug(state, username, slug) {
	const { datasets } = state.entities;
	const id = Object.keys(datasets).find(id => ( datasets[id].slug == slug && datasets[id].ownerUsername == username));
	return id ? datasets[id] : undefined;
}