

export function selectDatasetByAddress(state, address) {
	const { datasets } = state.entities;
	const id = Object.keys(datasets).find(id => (datasets[id].address == address));
	return id ? datasets[id] : undefined;
}

export function selectDatasetChanges(state, datasetId) {
	const { changes } = state.entities;
	return changes.filter(change => (change.datasetId == datasetId));
}