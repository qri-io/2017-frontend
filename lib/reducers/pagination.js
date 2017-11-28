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
  DATASET_SEARCH_FAILURE,

  DATASET_QUERIES_REQUEST,
  DATASET_QUERIES_SUCCESS,
  DATASET_QUERIES_FAILURE

} from '../constants/dataset'

import {
  QUERIES_REQUEST,
  QUERIES_SUCCESS,
  QUERIES_FAILURE
} from '../constants/query'

import {
  HISTORY_REQUEST,
  HISTORY_SUCCESS,
  HISTORY_FAILURE
} from '../constants/history'

import {
  PEERS_REQUEST,
  PEERS_SUCCESS,
  PEERS_FAILURE,
  PEER_NAMESPACE_REQUEST,
  PEER_NAMESPACE_SUCCESS,
  PEER_NAMESPACE_FAILURE
} from '../constants/peers'

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

  datasetHistory: paginate({
    mapActionToKey: action => action.path,
    types: [
      HISTORY_REQUEST,
      HISTORY_SUCCESS,
      HISTORY_FAILURE
    ]
  }),

  datasetQueries: paginate({
    mapActionToKey: action => action.path,
    types: [
      DATASET_QUERIES_REQUEST,
      DATASET_QUERIES_SUCCESS,
      DATASET_QUERIES_FAILURE
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

  popularPeers: paginate({
    mapActionToKey: action => 'popularPeers',
    types: [
      PEERS_REQUEST,
      PEERS_SUCCESS,
      PEERS_FAILURE
    ]
  }),

  peerNamespace: paginate({
    mapActionToKey: action => action.path,
    types: [
      PEER_NAMESPACE_REQUEST,
      PEER_NAMESPACE_SUCCESS,
      PEER_NAMESPACE_FAILURE
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
