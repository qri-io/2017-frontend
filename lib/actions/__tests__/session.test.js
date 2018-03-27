/* globals describe, it, expect, afterEach */
import configureMockStore from 'redux-mock-store'
import CustomMiddleware from '../../middleware/api'
import { loadSessionProfile } from '../session'
import { SESSION_PROFILE_REQUEST, SESSION_PROFILE_SUCCESS } from '../../constants/session'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'

const middlewares = [CustomMiddleware, thunk]
const mockStore = configureMockStore(middlewares)

const body = {
  'data': {
    'id': 'profileid',
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
    'profiles': {
      'profileid': {
        'color': '',
        'created': '0001-01-01T00:00:00Z',
        'description': '',
        'email': '',
        'homeUrl': '',
        'id': 'profileid',
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
    'data': 'profileid',
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

  it('creates SESSION_PROFILE_SUCCESS when fetching profile has been done', () => {
    // mock for endpoint `/me`
    fetchMock
      .getOnce(/\/me$/, { body })

    const expectedActions = [
      { type: SESSION_PROFILE_REQUEST },
      { type: SESSION_PROFILE_SUCCESS, response }
    ]
    const store = mockStore({})

    return store.dispatch(loadSessionProfile()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
