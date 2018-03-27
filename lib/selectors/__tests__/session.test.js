/* global describe, it, expect */
import * as session from '../session'

const profileid = 'profileid'

const initialState = {
  session: ''
}

const state = {
  session: profileid
}

describe('Session Selector: ', () => {
  it('should return an empty string when selecting from an initialState', () => {
    const id = session.selectSessionProfile(initialState)
    expect(id).toEqual('')
  })

  it('should return a profileid when selecting from a state with a session profile', () => {
    const id = session.selectSessionProfile(state)
    expect(id).toEqual(profileid)
  })
})
