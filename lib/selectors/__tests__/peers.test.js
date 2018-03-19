/* global describe, it, expect */
import * as peers from '../peers'

const peerid = 'peerid'
const name = 'peer'

const initialState = {
  entities: {
    peers: {

    }
  }
}

const state = {
  entities: {
    peers: {
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
}

const peer = {
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

describe('Peers Selector, selectByPeerId: ', () => {
  it('should return undefined when selecting by id from an initialState', () => {
    const id = peers.selectPeerById(initialState, peerid)
    expect(id).toEqual(undefined)
  })

  it('should return a the profile object when selecting from a state with the correct peerid', () => {
    expect(peers.selectPeerById(state, peerid)).toEqual(peer)
  })

  it('should return undefined when selecting from a state with an unknown peerid', () => {
    expect(peers.selectPeerById(state, 'badpeerid')).toEqual(undefined)
  })
})

describe('Peers Selector, selectPeerByName: ', () => {
  it('should return undefined when selecting by name from an initialState', () => {
    const id = peers.selectPeerByName(initialState, name)
    expect(id).toEqual(undefined)
  })

  it('should return a the profile object when selecting from a state with a valid peername', () => {
    expect(peers.selectPeerByName(state, name)).toEqual(peer)
  }) 

  it('should return undefined when selecting from a state with an unknown peername', () => {
    expect(peers.selectPeerByName(state, 'badname')).toEqual(undefined)
  }) 
})
