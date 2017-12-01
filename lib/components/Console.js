import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import DatasetDataGrid from './DatasetDataGrid'
import TabPanel from './TabPanel'
import QueryEditor from './QueryEditor'

import ResultsChart from './ResultsChart'
import DatasetsContainer from '../containers/Datasets'
import QueriesContainer from '../containers/Queries'

export default class Console extends Base {
  constructor (props) {
    super(props);

    [
      // 'handleSetDatasetMessage'
      'handleSetLoadingData',
      'handleRunQuery',
      'handleDownloadQuery',
      'handleEditorChange',
      'handleSetTopPanel',
      'handleSetBottomPanel',
      'handleSetChartOptions',
      'handleSelectDataset',
      'handleLoadMoreResults'
    ].forEach((m) => { this[m] = this[m].bind(this) })

    // this.debouncedSetQuery = debounce(props.setQuery, 200)
  }

  componentWillMount () {
    // loadData(this.props.setDatasetsMessage, this.props)
    this.props.loadQueries()
    if (this.props.slug) {
      // this.props.loadQueryBySlug(this.props.slug, [], true);
    }
    if (!this.props.datasetRef || this.props.chartOptions.path !== this.props.datasetRef.path) {
      this.props.resetChartOptions()
    }
  }

  componentWillReceiveProps (nextProps) {
    // loadData(nextProps);
    if (nextProps.slug !== this.props.slug) {
      // this.props.loadQueryBySlug(nextProps.slug, [], true);
      this.props.setBottomPanel(0)
    }
    const prevPath = this.props.datasetRef && this.props.datasetRef.path
    const nextPath = nextProps.datasetRef && nextProps.datasetRef.path
    if (prevPath !== nextPath) {
      this.props.resetChartOptions()
    }
  }

  shouldComponentUpdate () {
    return true
  }

  handleSetLoadingData (loading) {
    this.props.setLoadingData(loading)
  }

  handleRunQuery (e) {
    e.preventDefault()
    // this.props.runQuery({
    //   query: this.props.query.,
    //   page: 1,
    // });
    this.props.setLoadingData(true)
    this.props.resetQueryResults()
    this.props.runQuery(this.props.query, (error) => {
      this.props.setLoadingDataError(error)
      this.props.setLoadingData(false)
      this.props.loadQueries()
    })
    this.props.setBottomPanel(0)
  }

  handleDownloadQuery (e) {
    e.preventDefault()
    this.props.runQuery({
      query: this.props.query,
      download: true
    })
  }

  handleEditorChange (value) {
    // this.debouncedSetQuery(value);
    this.props.setQuery(value)
  }
  handleEditorAddressChange (value) {
    this.props.setQueryAddress(value)
  }

  handleSetTopPanel (index) {
    this.props.setTopPanel(index)
  }

  handleSetBottomPanel (index) {
    this.props.setBottomPanel(index)
  }

  handleSetChartOptions (options) {
    this.props.setChartOptions(options)
  }

  handleSelectDataset (i, dataset) {
    this.props.loadDataset(dataset.id, ['schema'])
  }

  handleLoadMoreResults () {
    this.props.resetQueryResults()
    this.props.runQuery({
      queryString: this.props.query,
      page: (this.props.results.pageCount + 1)
    }, (error) => {
      this.props.setLoadingDataError(error)
      this.props.setLoadingData(false)
    })
  }

  template (css) {
    const { datasetRef, data, query, bottomPanelIndex, chartOptions, loadingData, loadingDataError } = this.props
    return (
      <div className={css('wrap')}>
        <div className={css('top')} >
          <div className='panel'>
            <QueryEditor name='editor' query={query} onRun={this.handleRunQuery} onDownload={this.handleDownloadQuery} onChange={this.handleEditorChange}
            />
          </div>
        </div>
        <div className={css('bottom')} >
          <TabPanel
            index={bottomPanelIndex}
            labels={['Data', 'Chart', 'Datasets', 'History']}
            onSelectPanel={this.handleSetBottomPanel}
            components={[
              <DatasetDataGrid
                dataset={datasetRef && datasetRef.dataset}
                data={data}
                onLoadMore={this.handleLoadMoreResults}
                loading={loadingData}
                error={loadingDataError}
                onSetLoadingData={this.handleSetLoadingData}
              />,
              <div className='panel'>
                <ResultsChart size={{}} onOptionsChange={this.handleSetChartOptions} schema={datasetRef && datasetRef.dataset.structure.schema} data={data} chartOptions={chartOptions} />
              </div>,
              <div className='panel'>
                <DatasetsContainer skipLoad padding={false} goBack={this.handleGoBack} noHeader />
              </div>,
              <div className='panel'>
                <QueriesContainer skipLoad />
              </div>
            ]}
          />
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
      },
      top: {
        marginTop: 40
      }
    }
  }
}

Console.propTypes = {
  // query slug to load to
  slug: PropTypes.string,
  query: PropTypes.object.isRequired,
  // dataset: PropTypes.array,
  queries: PropTypes.array,
  datasets: PropTypes.array,
  results: PropTypes.object,
  topPanelIndex: PropTypes.number.isRequired,
  bottomPanelIndex: PropTypes.number.isRequired,
  chartOptions: PropTypes.shape({
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    xTitle: PropTypes.string,
    xIndex: PropTypes.number,
    yIndex: PropTypes.number,
    path: PropTypes.string.isRequired
  }).isRequired,

  setQuery: PropTypes.func.isRequired,
  runQuery: PropTypes.func.isRequired,
  setTopPanel: PropTypes.func.isRequired,
  setBottomPanel: PropTypes.func.isRequired,
  // loadDatasets: PropTypes.func.isRequired,
  loadQueries: PropTypes.func.isRequired,
  loadDataset: PropTypes.func.isRequired
}

Console.defaultProps = {
  hasMoreResults: false,
  nextResultsPage: 1
}
