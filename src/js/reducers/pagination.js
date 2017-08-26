import { combineReducers } from 'redux'
import paginate from './paginate'

import {
  USER_QUERIES_REQUEST,
  USER_QUERIES_SUCCESS,
  USER_QUERIES_FAILURE,

  USER_DATASETS_REQUEST,
  USER_DATASETS_SUCCESS,
  USER_DATASETS_FAILURE,

  USER_ROLES_REQUEST,
  USER_ROLES_SUCCESS,
  USER_ROLES_FAILURE,
} from '../actions/user';

import { 
	DATASETS_REQUEST, 
	DATASETS_SUCCESS, 
	DATASETS_FAILURE, 

	DATASET_MIGRATIONS_REQUEST,
	DATASET_MIGRATIONS_SUCCESS,
	DATASET_MIGRATIONS_FAIL,

	DATASET_CHANGES_REQUEST,
	DATASET_CHANGES_SUCCESS,
	DATASET_CHANGES_FAIL,

  DATASET_DATA_REQUEST,
  DATASET_DATA_SUCCESS,
  DATASET_DATA_FAILURE,

} from '../actions/dataset';

import { 
  QUERIES_REQUEST,
  QUERIES_SUCCESS,
  QUERIES_FAILURE
} from '../actions/query';

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

  userDatasets: paginate({
    mapActionToKey: action => action.username + ".datasets",
    types: [
      USER_DATASETS_REQUEST,
      USER_DATASETS_SUCCESS,
      USER_DATASETS_FAILURE,
    ]
  }),

  userRoles : paginate({
    mapActionToKey: action => action.username + ".roles",
    types : [
      USER_ROLES_REQUEST,
      USER_ROLES_SUCCESS,
      USER_ROLES_FAILURE,
    ]
  }),

  userQueries: paginate({
    mapActionToKey: action => action.username + ".queries",
    types: [
      USER_QUERIES_REQUEST,
      USER_QUERIES_SUCCESS,
      USER_QUERIES_FAILURE,
    ]
  }),

  datasetData: paginate({
    mapActionToKey: action => action.path,
    types: [
      DATASET_DATA_REQUEST,
      DATASET_DATA_SUCCESS,
      DATASET_DATA_FAILURE,
    ],
  }),

  // datasetMigrations : paginate({
  // 	mapActionToKey: action => `${action.dataset}.${action.pageSize}`,
  // 	types : [
  // 		DATASET_MIGRATIONS_REQUEST,
		// 	DATASET_MIGRATIONS_SUCCESS,
		// 	DATASET_MIGRATIONS_FAIL
  // 	]
  // }),
  // datasetChanges : paginate({
		// mapActionToKey: action => `${action.dataset}.${action.pageSize}`,
  // 	types : [
  // 		DATASET_CHANGES_REQUEST,
		// 	DATASET_CHANGES_SUCCESS,
		// 	DATASET_CHANGES_FAIL
  // 	]
  // }),

});

export default pagination;