/* global describe, it, expect */
import * as transfers from '../transfers'

const initialState = {
  transfers: {

  }
}

const state = {
  transfers: {
    'id_1': 0,
    'id_2': -1
  }
}

describe('Transfers Selector: ', () => {
  it('should return undefined when selecting a status from initialState', () => {
    const status = transfers.selectTransferStatus(initialState, 'id_test')
    expect(status).toEqual(undefined)
  })

  it('should return an integer status when selecting a status from a state that contains the given id', () => {
    const status = transfers.selectTransferStatus(state, 'id_1')
    expect(status).toEqual(0)
  })

  it('should return false when selecting IsTransfering from an initial state', () => {
    const isTransfering = transfers.selectIsTransfering(initialState, 'id_1')
    expect(isTransfering).toEqual(false)
  })

  it('should return true when selecting IsTransfering from a state that does not contain the given id', () => {
    const isTransfering = transfers.selectIsTransfering(state, 'id_3')
    expect(isTransfering).toEqual(false)
  })

  it('should return true when selecting IsTransfering from a state that contains the given id', () => {
    const isTransfering = transfers.selectIsTransfering(state, 'id_2')
    expect(isTransfering).toEqual(true)
  })

  it('should return and empty list when selecting all the transfers from an initalState', () => {
    const transfersList = transfers.selectTransfers(initialState)
    expect(transfersList).toEqual([])
  })

  it('should return a list of ids when selecting all the transfers from a state', () => {
    const transfersList = transfers.selectTransfers(state)
    expect(transfersList).toEqual(['id_1', 'id_2'])
  })
})
