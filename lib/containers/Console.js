import { connect } from 'react-redux'

import { setQuery, runQuery, loadQueryBySlug, loadQueries, resetQueryResults } from '../actions/query'
import { setTopPanel, setBottomPanel, setChartOptions, resetChartOptions, setLoadingData, setLoadingError } from '../actions/console'
import { loadDatasets, loadDataset } from '../actions/dataset'
import Console from '../components/Console'

const ConsoleContainer = connect(
  (state, ownProps) => {
    const datasetRef = state.entities.queries[state.console.queryResults]
    let data
    if (datasetRef) {
      data = state.entities.data[datasetRef.path] && state.entities.data[datasetRef.path].data
    }
    const loadingError = state.console.loadingError
    var error = ''
    if (loadingError) {
      error = 'Error running query. Try again.'
      if (loadingError.includes('syntax error')) {
        error = loadingError.slice(loadingError.indexOf('syntax error'))
      } else if (loadingError.includes('error calculating query hash:')) {
        error = loadingError.slice(loadingError.indexOf('error calculating query hash:') + 'error calculating query hash:'.length)
      }
    }
    return Object.assign({}, {
      loadingData: state.console.loadingData,
      error,
      queries: Object.keys(state.entities.queries).map(key => state.entities.queries[key]),
      datasets: Object.keys(state.entities.namespace).map(key => state.entities.namespace[key]),
      queryHistory: state.session.history,
      chartOptions: state.console.chartOptions,
      history: ownProps.history,
      goBack: ownProps.history.goBack,
      datasetRef,
      data
    }, state.console, ownProps)
  }, {
    setQuery,
    runQuery,
    loadQueries,
    loadQueryBySlug,
    resetQueryResults,
    setLoadingData,
    setLoadingError,
    setTopPanel,
    setBottomPanel,
    setChartOptions,
    resetChartOptions,
    loadDatasets,
    loadDataset
  }
)(Console, 'Console')

export default ConsoleContainer
