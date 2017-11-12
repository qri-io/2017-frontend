import * as sel from '../dataset'

const dsA = {
  path: '/path/dataset_a',
  name: 'a',
  dataset: {}
}

const state = {
  entities: {
    namespace: {
      '/path/datasetA': dsA
    }
  }
}

describe('dataset', () => {
  it('selectDataset', () => {
    const ds = sel.selectDataset(state, '/path/datasetA')
    expect(ds).toEqual(dsA)
  })
  // it('selectDatasetTree', () => {
  //   const tree = sel.selectDatasetTree({
  //     entities: {
  //       datasets: {
  //         'a': {},
  //         'a.b': {},
  //         'a.b.c': {},
  //         'd.e': {}
  //       }
  //     }
  //   })
  //   expect(tree).toEqual({ a: { b: { c: {} } }, d: { e: {} } })
  // })

  // it('treeNodes', () => {
  //   const tree = sel.selectDatasetTree({
  //     entities: {
  //       datasets: {
  //         'a.b.c': {}
  //       }
  //     }
  //   })
  //   const nodes = sel.treeNodes(tree)

  //   expect(nodes).toEqual([
    //  { id: 'a', address: 'a', radius: 10 },
    //  { id: 'b', address: 'a.b', radius: 10 },
    //  { id: 'c', address: 'a.b.c', radius: 10 }
  //   ])
  // })

  // it('treeConnections', () => {
  //   const tree = sel.selectDatasetTree({
  //     entities: {
  //       datasets: {
  //         'a.b.c': {}
  //       }
  //     }
  //   })
  //   const connections = sel.treeConnections(tree)
  //   expect(connections).toEqual([
    //  { source: 'a', target: 'b' },
    //  { source: 'b', target: 'c' }
  //   ])
  // })
})
