import { connect } from 'react-redux'

import { setQuery, runQuery, loadQueryBySlug, loadQueries } from '../actions/query'
import { setTopPanel, setBottomPanel, setChartOptions, resetChartOptions } from '../actions/console'
import { loadDatasets, loadDataset } from '../actions/dataset'
import Console from '../components/Console'

const ConsoleContainer = connect(
  (state, ownProps) => {
    const datasetRef = state.entities.queries[state.console.queryResults]
    let data
    if (datasetRef) {
      data = state.entities.data[datasetRef.path] && state.entities.data[datasetRef.path].data
    }
    const size = state.layout.size ? state.layout.size : ''
    return Object.assign({}, {
      queries: Object.keys(state.entities.queries).map(key => state.entities.queries[key]).reverse(),
      datasets: Object.keys(state.entities.namespace).map(key => state.entities.namespace[key]),
      queryHistory: state.session.history,
      layout: state.layout,
      chartOptions: state.console.chartOptions,
      datasetRef,
      data,
      size
    }, state.console, ownProps)
  }, {
    setQuery,
    runQuery,
    loadQueries,
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
