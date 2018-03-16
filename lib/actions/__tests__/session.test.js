/* globals describe, it, expect, afterEach */
import configureMockStore from 'redux-mock-store'
import CustomMiddleware from '../../middleware/api'
import { loadSessionPeer } from '../session'
import { SESSION_PEER_REQUEST, SESSION_PEER_SUCCESS } from '../../constants/session'
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

describe('Session Actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates SESSION_PEER_SUCCESS when fetching peer has been done', () => {
    // mock for endpoint `/me`
    fetchMock
      .getOnce(/\/me$/, { body })

    const expectedActions = [
      { type: SESSION_PEER_REQUEST },
      { type: SESSION_PEER_SUCCESS, response }
    ]
    const store = mockStore({})

    return store.dispatch(loadSessionPeer()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
