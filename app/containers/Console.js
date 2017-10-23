import { connect } from 'react-redux'

import { setQuery, runQuery, loadQueryBySlug, loadQueries, resetQueryResults } from '../actions/query'
import { setTopPanel, setBottomPanel, setChartOptions, resetChartOptions, setLoadingData, setLoadingDataError } from '../actions/console'
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
      loadingData: state.console.loadingData,
      loadingDataError: state.console.loadingDataError,
      queries: Object.keys(state.entities.queries).map(key => state.entities.queries[key]).reverse(),
      datasets: Object.keys(state.entities.namespace).map(key => state.entities.namespace[key]),
      queryHistory: state.session.history,
      layout: state.layout,
      chartOptions: state.console.chartOptions,
      history: ownProps.history,
      goBack: ownProps.history.goBack,
      datasetRef,
      data,
      size
    }, state.console, ownProps)
  }, {
    setQuery,
    runQuery,
    loadQueries,
    loadQueryBySlug,
    resetQueryResults,
    setLoadingData,
    setLoadingDataError,
    setTopPanel,
    setBottomPanel,
    setChartOptions,
    resetChartOptions,
    loadDatasets,
    loadDataset
  }
)(Console, 'Console')

export default ConsoleContainer
