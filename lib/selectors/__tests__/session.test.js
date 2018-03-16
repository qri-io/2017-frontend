/* global describe, it, expect */
import * as session from '../session'

const peerid = 'peerid'

const initialState = {
  session: ''
}

const state = {
  session: peerid
}

describe('Session Selector: ', () => {
  it('should return an empty string when selecting from an initialState', () => {
    const id = session.selectSessionPeer(initialState)
    expect(id).toEqual('')
  })

  it('should return a peerid when selecting from a state with a session peer', () => {
    const id = session.selectSessionPeer(state)
    expect(id).toEqual(peerid)
  })
})
