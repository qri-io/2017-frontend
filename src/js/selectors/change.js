

export function selectChangeByNumber(state, address, number) {
	const { changes } = state.entities;
	return changes[Object.keys(state.entities.changes).find((id) => {
		let change = changes[id];
		return change.dataset
	})]
}

export function selectLocalChangeById(state, id) {
	return state.local.changes[id]
}

export function selectLocalChangeByNumber(state, address, number) {
	// TODO
	return undefined;
}