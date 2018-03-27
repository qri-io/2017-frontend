/* globals describe, it, expect, afterEach */
import configureMockStore from 'redux-mock-store'
import CustomMiddleware from '../../middleware/api'
import { loadProfileById, loadProfileByName } from '../profiles'
import { PROFILE_REQUEST, PROFILE_SUCCESS } from '../../constants/profiles'
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

describe('Profiles Actions, loadProfileById:', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates PROFILE_SUCCESS when fetching profile has been done', () => {
    // mock for endpoint `/at/`
    fetchMock
      .getOnce(/\/connect\/\w+/, { body })

    const store = mockStore({entities: {}})
    var expectedActions = [
      { type: PROFILE_REQUEST },
      { type: PROFILE_SUCCESS, response }
    ]

    return store.dispatch(loadProfileById('profileid')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create any action when loading profile that has been fetched already', () => {
    const store = mockStore({
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
      }
    })
    var expectedActions = []
    store.dispatch(loadProfileById('profileid'))
    return expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('Profiles Actions, loadProfileByName:', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates PROFILE_SUCCESS when fetching profile has been done', () => {
    // mock for endpoint `/me`
    fetchMock
      .getOnce(/\/\w+/, { body })

    const store = mockStore({entities: {}})
    var expectedActions = [
      { type: PROFILE_REQUEST },
      { type: PROFILE_SUCCESS, response }
    ]

    return store.dispatch(loadProfileByName('peer')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('does not create any action when loading profile that has been fetched already', () => {
    const store = mockStore({
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
      }
    })
    var expectedActions = []
    store.dispatch(loadProfileByName('peer'))
    return expect(store.getActions()).toEqual(expectedActions)
  })
})
