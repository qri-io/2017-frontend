/* global describe, it, expect */
import * as sel from '../dataset'

const dsA = {
  path: '/path/datasetA',
  name: 'a',
  dataset: {}
}

const state = {
  entities: {
    datasets: {
      '/path/datasetA': dsA
    }
  }
}

describe('dataset', () => {
  it('selectDataset', () => {
    const ds = sel.selectDataset(state, '/path/datasetA')
    expect(ds).toEqual(dsA)
  })
})
