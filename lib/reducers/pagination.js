import { combineReducers } from 'redux'
import paginate from './paginate'

import {
  DATASETS_REQUEST,
  DATASETS_SUCCESS,
  DATASETS_FAILURE,

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

import {
  REGISTRY_LIST_REQUEST,
  REGISTRY_LIST_SUCCESS,
  REGISTRY_LIST_FAILURE
} from '../constants/registry'

import {
  UPDATE_JOBS_REQUEST,
  UPDATE_JOBS_SUCCESS,
  UPDATE_JOBS_FAILURE,

  UPDATE_LOGS_REQUEST,
  UPDATE_LOGS_SUCCESS,
  UPDATE_LOGS_FAILURE
} from '../constants/updates'

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

  datasetHistory: paginate({
    name: 'datasetHistory',
    mapActionToKey: action => action.path,
    types: [
      HISTORY_REQUEST,
      HISTORY_SUCCESS,
      HISTORY_FAILURE
    ]
  }),

  registryDatasets: paginate({
    name: 'registryDatasets',
    mapActionToKey: action => 'registryDatasets',
    types: [
      REGISTRY_LIST_REQUEST,
      REGISTRY_LIST_SUCCESS,
      REGISTRY_LIST_FAILURE
    ]
  }),

  updateJobs: paginate({
    name: 'updateJobs',
    mapActionToKey: action => 'updateJobs',
    types: [
      UPDATE_JOBS_REQUEST,
      UPDATE_JOBS_SUCCESS,
      UPDATE_JOBS_FAILURE
    ]
  }),

  updateLogs: paginate({
    name: 'updateLogs',
    mapActionToKey: action => 'updateLogs',
    types: [
      UPDATE_LOGS_REQUEST,
      UPDATE_LOGS_SUCCESS,
      UPDATE_LOGS_FAILURE
    ]
  })
})

export default pagination
