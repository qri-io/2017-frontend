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
  HISTORY_REQUEST,
  HISTORY_SUCCESS,
  HISTORY_FAILURE
} from '../constants/history'

import {
  PROFILES_REQUEST,
  PROFILES_SUCCESS,
  PROFILES_FAILURE
} from '../constants/profiles'

// Updates the pagination data for different actions.
const pagination = combineReducers({
  popularDatasets: paginate({
    name: 'popularDatasets',
    mapActionToKey: action => action.id,
    types: [
      DATASETS_REQUEST,
      DATASETS_SUCCESS,
      DATASETS_FAILURE
    ]
  }),

  popularProfiles: paginate({
    name: 'popularProfiles',
    mapActionToKey: action => 'popularProfiles',
    types: [
      PROFILES_REQUEST,
      PROFILES_SUCCESS,
      PROFILES_FAILURE
    ]
  }),

  searchedDatasets: paginate({
    name: 'searchedDatasets',
    mapActionToKey: action => action.searchString,
    types: [
      DATASET_SEARCH_REQUEST,
      DATASET_SEARCH_SUCCESS,
      DATASET_SEARCH_FAILURE
    ]
  }),

  datasetData: paginate({
    name: 'datasetData',
    mapActionToKey: action => action.datapath,
    types: [
      DATASET_DATA_REQUEST,
      DATASET_DATA_SUCCESS,
      DATASET_DATA_FAILURE
    ]
  }),

  datasetHistory: paginate({
    name: 'datasetHistory',
    mapActionToKey: action => action.path,
    types: [
      HISTORY_REQUEST,
      HISTORY_SUCCESS,
      HISTORY_FAILURE
    ]
  })
})

export default pagination
