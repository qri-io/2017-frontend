import { QUERY_RUN_REQUEST, QUERY_RUN_SUCCESS, QUERY_RUN_FAILURE } from '../actions/query'


const initialState = {
}

const newRequest = {
	pageCount : 0,
	fetchedAll : false,
	schema : [],
	data : []
}

function initialReq(prev=newRequest, action) {
	return Object.assign({}, {
		statement : action.request.query.statement,
		address : action.request.query.address,
		pageCount : prev.pageCount + 1,
		fetching : true,
		fetchedAll : prev.fetchedAll,
		schema : prev.schema,
		data : prev.data
	});
}

function successReq(prev={},action) {
	return Object.assign({}, prev, {
		fetching : false,
		fetchedAll : (action.response.data.length < action.request.pageSize),
		schema : action.response.schema,
		data : prev.data.concat(action.response.data),
		error : undefined,
	});
}

function failureReq(prev={}, action) {
	return Object.assign({}, prev, {
		fetching : false,
		error : action.error,
	});
}

export default function resultsReducer (state=initialState, action) {
	let stmt = ""
	switch (action.type) {
		case QUERY_RUN_REQUEST:
			stmt = action.request.query.statement;
			return Object.assign({}, state, { 
				[stmt] : initialReq(state[stmt], action),
			});
		case QUERY_RUN_SUCCESS:
			stmt = action.request.query.statement;
			return Object.assign({}, state, {
				[stmt] : successReq(state[stmt], action),
			});
		case QUERY_RUN_FAILURE:
			stmt = action.request.query.statement;
			return Object.assign({}, state, {
				[stmt] : failureReq(state[stmt], action),
			});
	}
	return state;
}