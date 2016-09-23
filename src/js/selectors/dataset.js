
export function selectDatasetById(state, id) {
	return state.entities.datasets[id];
}

export function selectDatasetByAddress(state, address) {
	const { datasets } = state.entities;
	const id = Object.keys(datasets).find(id => (datasets[id].address == address));
	return id ? datasets[id] : undefined;
}

export function selectLocalDatasetByAddress(state, address) {
	const { datasets } = state.locals
	const id = Object.keys(datasets).find(id => (datasets[id].address == address));
	return id ? datasets[id] : undefined;
}

export function selectLocalDatasetById(state, id) {
	return state.locals.datasets[id];
}

export function selectDatasetChanges(state, datasetId) {
	const { changes } = state.entities;
	return changes.filter(change => (change.datasetId == datasetId));
}

export function selectAllDatasets(state) {
	const { datasets } = state.entities;
	return Object.keys(datasets).map(id => datasets[id]).sort((a,b) => {
		return (a.address == b.address) ? 0 : ((a.address < a.address)) ? -1 : 1;
	});
}