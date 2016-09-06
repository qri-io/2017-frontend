

export function selectDatasetBySlug(state, handle, slug) {
	const { datasets } = state.entities;
	const id = Object.keys(datasets).find(id => ( datasets[id].slug == slug && datasets[id].ownerHandle == handle));
	return id ? datasets[id] : undefined;
}

export function selectDatasetChanges(state, datasetId) {
	const { changes } = state.entities;
	return changes.filter(change => (change.datasetId == datasetId));
}