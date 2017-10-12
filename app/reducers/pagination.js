import { combineReducers } from 'redux'
import paginate from './paginate'

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
} from '../constants/query'

// Updates the pagination data for different actions.
const pagination = combineReducers({
  queryHistory: paginate({
    mapActionToKey: action => 'queryHistory',
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
