

export function selectChangeByNumber(state, handle, slug, number) {
	const { changes } = state.entities;
	return changes[Object.keys(state.entities.changes).find((id) => {
		let change = changes[id];
		return change.dataset
	})]
}