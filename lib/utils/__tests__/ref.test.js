/* global describe, it, expect */
import { makeRef } from '../ref'

describe('makeRef', () => {
  it('makes a ref from a peername and name', () => {
    const ref = makeRef('peername', 'name')
    expect(ref).toEqual('peername/name')
  })
  it('returns an empty string if nothing given', () => {
    const ref = makeRef()
    expect(ref).toEqual('')
  })
  it('returns an empty string if only name given', () => {
    const ref = makeRef('', 'name')
    expect(ref).toEqual('')
  })
  it('returns a ref with only the profileID if only the profileID given', () => {
    const ref = makeRef('', '', 'profileID')
    expect(ref).toEqual('@profileID')
  })
  it('returns a ref with only the profileID if only the profileID given', () => {
    const ref = makeRef('', '', 'profileID')
    expect(ref).toEqual('@profileID')
  })
  it('returns a ref with only the path if only the path given', () => {
    const ref = makeRef('', '', '', 'path')
    expect(ref).toEqual('@/path')
  })
  it('returns a full ref', () => {
    const ref = makeRef('peername', 'name', 'profileID', 'path')
    expect(ref).toEqual('peername/name@profileID/path')
  })
  it('returns the correct ref if all but profileID are given', () => {
    const ref = makeRef('peername', 'name', '', 'path')
    expect(ref).toEqual('peername/name@/path')
  })
})
