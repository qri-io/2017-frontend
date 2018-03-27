/* globals describe, it, expect, afterEach */
import configureMockStore from 'redux-mock-store'
import CustomMiddleware from '../../middleware/api'
import { loadDatasets } from '../dataset'
import { DATASETS_REQUEST, DATASETS_SUCCESS } from '../../constants/dataset'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'

const middlewares = [CustomMiddleware, thunk]
const mockStore = configureMockStore(middlewares)

const body = {
  'data': [
    {
      'peername': 'ramfox',
      'name': 'epa_catalog',
      'profileID': 'QmPmyr6CXoVYLScXQ6MC9ZowSLG1oteAVs4GSbgawERTDE',
      'path': '/ipfs/QmaQcYZW3ZEoGRDQJjx41gKL42ZLca7mhXYpfrSGTNZYNu',
      'dataset': {}
    }
  ],
  'meta': {
    'code': 200
  },
  'pagination': {
    'nextUrl': '/list/profileid?page=1\u0026pageSize=30'
  }
}

const response = {
  'entities': {
    'datasets': {
      '/ipfs/QmaQcYZW3ZEoGRDQJjx41gKL42ZLca7mhXYpfrSGTNZYNu': {
        'dataset': {},
        'name': 'epa_catalog',
        'path': '/ipfs/QmaQcYZW3ZEoGRDQJjx41gKL42ZLca7mhXYpfrSGTNZYNu',
        'profileID': 'QmPmyr6CXoVYLScXQ6MC9ZowSLG1oteAVs4GSbgawERTDE',
        'peername': 'ramfox'
      }
    }
  },
  'result': {
    'data': [
      '/ipfs/QmaQcYZW3ZEoGRDQJjx41gKL42ZLca7mhXYpfrSGTNZYNu'
    ],
    'meta': {
      'code': 200
    },
    'pagination': {
      'nextUrl': '/list/profileid?page=1&pageSize=30'
    }
  }
}

const profileid = 'profileid'

describe('Dataset Actions, loadDatasets:', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates DATASET_SUCCESS when fetching datasets has been done', () => {
    // mock for endpoint `/me`
    fetchMock
      .getOnce(/\/list\/\w+/, { body })

    const store = mockStore({
      entities: {
        datasets: {}
      }
    })
    var expectedActions = [
      { type: DATASETS_REQUEST, id: 'profileid', page: 1, pageSize: 30 },
      { type: DATASETS_SUCCESS, id: 'profileid', page: 1, pageSize: 30, response }
    ]

    return store.dispatch(loadDatasets(profileid)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
