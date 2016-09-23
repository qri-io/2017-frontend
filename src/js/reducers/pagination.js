import { combineReducers } from 'redux'
import paginate from './paginate'

import { 
	DATASETS_REQUEST, 
	DATASETS_SUCCESS, 
	DATASETS_FAILURE, 

	DATASET_MIGRATIONS_REQUEST,
	DATASET_MIGRATIONS_SUCCESS,
	DATASET_MIGRATIONS_FAIL,

	DATASET_CHANGES_REQUEST,
	DATASET_CHANGES_SUCCESS,
	DATASET_CHANGES_FAIL
} from '../actions/dataset';
import { QUERIES_REQUEST, QUERIES_SUCCESS, QUERIES_FAILURE } from '../actions/query';

// Updates the pagination data for different actions.
const pagination = combineReducers({
	 popularQueries: paginate({
    mapActionToKey: action => "popularQueries",
    types: [
      QUERIES_REQUEST,
      QUERIES_SUCCESS,
      QUERIES_FAILURE
    ]
  }),

  popularDatasets: paginate({
    mapActionToKey: action => "popularDatasets",
    types: [
      DATASETS_REQUEST,
      DATASETS_SUCCESS,
      DATASETS_FAILURE
    ]
  }),

  datasetMigrations : paginate({
  	mapActionToKey: action => `${action.dataset}.${action.pageSize}`,
  	types : [
  		DATASET_MIGRATIONS_REQUEST,
			DATASET_MIGRATIONS_SUCCESS,
			DATASET_MIGRATIONS_FAIL
  	]
  }),

  datasetChanges : paginate({
		mapActionToKey: action => `${action.dataset}.${action.pageSize}`,
  	types : [
  		DATASET_CHANGES_REQUEST,
			DATASET_CHANGES_SUCCESS,
			DATASET_CHANGES_FAIL
  	]
  }),

});

export default pagination;