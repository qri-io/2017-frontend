/* globals describe, it, expect, afterEach */
import configureMockStore from 'redux-mock-store'
import CustomMiddleware from '../../middleware/api'
import { loadPeerById, loadPeerByName } from '../peers'
import { PEER_REQUEST, PEER_SUCCESS } from '../../constants/peers'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'

const middlewares = [CustomMiddleware, thunk]
const mockStore = configureMockStore(middlewares)

const body = {
  'data': {
    'id': 'peerid',
    'created': '0001-01-01T00:00:00Z',
    'updated': '0001-01-01T00:00:00Z',
    'peername': 'peer',
    'type': 'user',
    'email': '',
    'name': '',
    'description': '',
    'homeUrl': '',
    'color': '',
    'thumb': '/',
    'profile': '/',
    'poster': '/',
    'twitter': ''
  },
  'meta': {
    'code': 200
  }
}

const response = {
  'entities': {
    'peers': {
      'peerid': {
        'color': '',
        'created': '0001-01-01T00:00:00Z',
        'description': '',
        'email': '',
        'homeUrl': '',
        'id': 'peerid',
        'name': '',
        'peername': 'peer',
        'poster': '/',
        'profile': '/',
        'thumb': '/',
        'twitter': '',
        'type': 'user',
        'updated': '0001-01-01T00:00:00Z'
      }
    }
  },
  'result': {
    'data': 'peerid',
    'meta': {
      'code': 200
    }
  }
}

describe('Peers Actions, loadPeerById:', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates PEER_SUCCESS when fetching peer has been done', () => {
    // mock for endpoint `/at/`
    fetchMock
      .getOnce(/\/connect\/\w+/, { body })

    const store = mockStore({entities: {}})
    var expectedActions = [
      { type: PEER_REQUEST },
      { type: PEER_SUCCESS, response }
    ]

    return store.dispatch(loadPeerById('peerid')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create any action when loading peer that has been fetched already', () => {
    const store = mockStore({
      'entities': {
        'peers': {
          'peerid': {
            'color': '',
            'created': '0001-01-01T00:00:00Z',
            'description': '',
            'email': '',
            'homeUrl': '',
            'id': 'peerid',
            'name': '',
            'peername': 'peer',
            'poster': '/',
            'profile': '/',
            'thumb': '/',
            'twitter': '',
            'type': 'user',
            'updated': '0001-01-01T00:00:00Z'
          }
        }
      }
    })
    var expectedActions = []
    store.dispatch(loadPeerById('peerid'))
    return expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('Peers Actions, loadPeerByName:', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates PEER_SUCCESS when fetching peer has been done', () => {
    // mock for endpoint `/me`
    fetchMock
      .getOnce(/\/\w+/, { body })

    const store = mockStore({entities: {}})
    var expectedActions = [
      { type: PEER_REQUEST },
      { type: PEER_SUCCESS, response }
    ]

    return store.dispatch(loadPeerByName('peer')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create any action when loading peer that has been fetched already', () => {
    const store = mockStore({
      'entities': {
        'peers': {
          'peerid': {
            'color': '',
            'created': '0001-01-01T00:00:00Z',
            'description': '',
            'email': '',
            'homeUrl': '',
            'id': 'peerid',
            'name': '',
            'peername': 'peer',
            'poster': '/',
            'profile': '/',
            'thumb': '/',
            'twitter': '',
            'type': 'user',
            'updated': '0001-01-01T00:00:00Z'
          }
        }
      }
    })
    var expectedActions = []
    store.dispatch(loadPeerByName('peer'))
    return expect(store.getActions()).toEqual(expectedActions)
  })
})
