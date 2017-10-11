import { connect } from 'react-redux'

import { setQuery, runQuery, loadQueryBySlug, loadQueryPage } from '../actions/query'
import { setTopPanel, setBottomPanel, setChartOptions, resetChartOptions } from '../actions/console'
import { loadDatasets, loadDataset } from '../actions/dataset'

import Console from '../components/Console'

const ConsoleContainer = connect(
  (state, ownProps) => {
    const datasetRef = state.entities.namespace[state.console.queryResults]
    let data
    if (datasetRef) {
      data = state.entities.data[datasetRef.path] && state.entities.data[datasetRef.path].data
    }
    let peers = []
    if (state.entities.peers) {
      const peers = Object.keys(state.entities.peers).map(key => state.entities.queries[key])
    }
    const size = state.layout.size ? state.layout.size : ''
    return Object.assign({}, {
      queries: Object.keys(state.entities.queries).map(key => state.entities.queries[key]),
      datasets: Object.keys(state.entities.namespace).map(key => state.entities.namespace[key]),
      queryHistory: state.session.history,
      layout: state.layout,
      chartOptions: state.console.chartOptions,
      datasetRef,
      data,
      peers,
      size
    }, state.console, ownProps)
  }, {
    setQuery,
    runQuery,
    loadQueryPage,
    loadQueryBySlug,

    setTopPanel,
    setBottomPanel,
    setChartOptions,
    resetChartOptions,
    loadDatasets,
    loadDataset
  }
)(Console, 'Console')

export default ConsoleContainer
