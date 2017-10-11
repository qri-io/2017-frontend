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
  USER_ROLES_FAILURE
} from '../actions/user'

import {
  DATASETS_REQUEST,
  DATASETS_SUCCESS,
  DATASETS_FAILURE,

  DATASET_DATA_REQUEST,
  DATASET_DATA_SUCCESS,
  DATASET_DATA_FAILURE,

  DATASET_SEARCH_REQUEST,
  DATASET_SEARCH_SUCCESS,
  DATASET_SEARCH_FAILURE

} from '../constants/dataset'

import {
  QUERIES_REQUEST,
  QUERIES_SUCCESS,
  QUERIES_FAILURE
} from '../actions/query'

// Updates the pagination data for different actions.
const pagination = combineReducers({
  popularQueries: paginate({
    mapActionToKey: action => 'popularQueries',
    types: [
      QUERIES_REQUEST,
      QUERIES_SUCCESS,
      QUERIES_FAILURE
    ]
  }),

  popularDatasets: paginate({
    mapActionToKey: action => 'popularDatasets',
    types: [
      DATASETS_REQUEST,
      DATASETS_SUCCESS,
      DATASETS_FAILURE
    ]
  }),

  searchedDatasets: paginate({
    mapActionToKey: action => action.searchString,
    types: [
      DATASET_SEARCH_REQUEST,
      DATASET_SEARCH_SUCCESS,
      DATASET_SEARCH_FAILURE
    ]
  }),

  userDatasets: paginate({
    mapActionToKey: action => action.username + '.datasets',
    types: [
      USER_DATASETS_REQUEST,
      USER_DATASETS_SUCCESS,
      USER_DATASETS_FAILURE
    ]
  }),

  userRoles: paginate({
    mapActionToKey: action => action.username + '.roles',
    types: [
      USER_ROLES_REQUEST,
      USER_ROLES_SUCCESS,
      USER_ROLES_FAILURE
    ]
  }),

  userQueries: paginate({
    mapActionToKey: action => action.username + '.queries',
    types: [
      USER_QUERIES_REQUEST,
      USER_QUERIES_SUCCESS,
      USER_QUERIES_FAILURE
    ]
  }),

  datasetData: paginate({
    mapActionToKey: action => action.path,
    types: [
      DATASET_DATA_REQUEST,
      DATASET_DATA_SUCCESS,
      DATASET_DATA_FAILURE
    ]
  })
})

export default pagination
