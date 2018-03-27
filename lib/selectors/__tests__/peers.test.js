/* global describe, it, expect */
import * as profiles from '../profiles'

const profileid = 'profileid'
const name = 'peer'

const initialState = {
  entities: {
    profiles: {

    }
  }
}

const state = {
  entities: {
    profiles: {
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
}

const profile = {
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

describe('Profiles Selector, selectByProfileId: ', () => {
  it('should return undefined when selecting by id from an initialState', () => {
    const profile = profiles.selectProfileById(initialState, profileid)
    expect(profile).toEqual(undefined)
  })

  it('should return a the profile object when selecting from a state with the correct profileid', () => {
    expect(profiles.selectProfileById(state, profileid)).toEqual(profile)
  })

  it('should return undefined when selecting from a state with an unknown profileid', () => {
    expect(profiles.selectProfileById(state, 'badprofileid')).toEqual(undefined)
  })
})

describe('Profiles Selector, selectProfileByName: ', () => {
  it('should return undefined when selecting by name from an initialState', () => {
    const profile = profiles.selectProfileByName(initialState, name)
    expect(profile).toEqual(undefined)
  })

  it('should return a the profile object when selecting from a state with a valid peername', () => {
    expect(profiles.selectProfileByName(state, name)).toEqual(profile)
  })

  it('should return undefined when selecting from a state with an unknown peername', () => {
    expect(profiles.selectProfileByName(state, 'badname')).toEqual(undefined)
  })
})

describe('Profiles Selector, selectProfileIdByName: ', () => {
  it('should return undefined when selecting by name from an initialState', () => {
    const id = profiles.selectProfileIdByName(initialState, name)
    expect(id).toEqual('')
  })

  it('should return a the profile object when selecting from a state with a valid peername', () => {
    expect(profiles.selectProfileIdByName(state, name)).toEqual(profileid)
  })

  it('should return undefined when selecting from a state with an unknown peername', () => {
    expect(profiles.selectProfileIdByName(state, 'badname')).toEqual('')
  })
})
