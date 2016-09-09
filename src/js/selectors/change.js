import { selectDatasetByAddress } from './dataset'

export function selectChangeById(state, id) {
	return state.entities.changes[id];
}

// Supports selecting by either address & change number combo,
// or just slamming an ID into the number field
export function selectChangeByNumber(state, address, number) {
	const { changes } = state.entities;
	const dataset = selectDatasetByAddress(state, address);
	const id = Object.keys(changes).find(id => (changes[id].number == number && changes[id].dataset == dataset.id) || id == number);
	return id ? changes[id] : undefined;
}

export function selectDatasetChanges(state, datasetId) {
	const { changes } = state.entities;
	return Object.keys(changes).reduce((a, id) => {
		const m = changes[id];
		if (m.dataset == datasetId) {
			a.push(m);
		}
		return a;
	}, [])
}



export function selectLocalChangeById(state, id) {
	return state.locals.changes[id];
}

// Supports selecting by either address & change number combo,
// or just slamming an ID into the number field
export function selectLocalChangeByNumber(state, address, number) {
	const { changes } = state.locals;
	const id = Object.keys(changes).find(id => (changes[id].number == number && changes[id].address == address) || id == number);
	return id ? changes[id] : undefined;
}