import React, { PropTypes } from 'react'

import Base from './Base'
import DatasetDataGrid from './DatasetDataGrid'
import TabPanel from './TabPanel'
import QueryEditor from './QueryEditor'
import DataTable from './DataTable'

import ResultsChart from './ResultsChart'
import DatasetsContainer from '../containers/Datasets'
import QueriesContainer from '../containers/Queries'

function loadData (props) {
  props.loadDatasets(1, 100)
}

export default class Console extends Base {
  constructor (props) {
    super(props);

    [
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
    loadData(this.props)
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
    console.log('in handleRunQuery setLoadingData true')
    this.props.runQuery(this.props.query)
    this.props.setBottomPanel(0)
    this.props.loadQueries()
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
    this.props.runQuery({
      queryString: this.props.query,
      page: (this.props.results.pageCount + 1)
    })
  }

  template (css) {
    const { datasetRef, data, query, topPanelIndex, bottomPanelIndex, queryHistory, layout, size, chartOptions, loadingData } = this.props
    const { main } = layout

    const topBox = {
      top: main.top,
      left: 0,
      width: main.width,
      height: main.height * 0.4,
      overflow: 'auto'
    }

    const bottomBox = {
      top: main.height * 0.4,
      left: 0,
      width: main.width,
      height: main.height * 0.6,
      overflow: 'auto'
    }

    return (
      <div className={css('wrap')}>
        <div className={css('top')}>
          <TabPanel
            index={topPanelIndex}
            onSelectPanel={this.handleSetTopPanel}
            labels={['Editor', 'History']}
            bounds={topBox}
            components={[
              <div className='panel'>
                <QueryEditor bounds={topBox} name='editor' query={query} onRun={this.handleRunQuery} onDownload={this.handleDownloadQuery} onChange={this.handleEditorChange}
                />
              </div>,
              <div className='panel'>
                <QueriesContainer skipLoad bounds={topBox} />
              </div>
            ]}
          />
        </div>
        <div className='bottom panel'>
          <TabPanel
            index={bottomPanelIndex}
            labels={['Data', 'Chart', 'Datasets' ]}
            onSelectPanel={this.handleSetBottomPanel}
            components={[
              <DatasetDataGrid
                dataset={datasetRef && datasetRef.dataset}
                data={data}
                onLoadMore={this.handleLoadMoreResults}
                bounds={bottomBox}
                loading={loadingData}
                onSetLoadingData={this.handleSetLoadingData}
              />,
              <div className='panel'>
                <ResultsChart size={size} onOptionsChange={this.handleSetChartOptions} schema={datasetRef && datasetRef.dataset.structure.schema} data={data} chartOptions={chartOptions} />
              </div>,
              <div className='panel'>
                <DatasetsContainer skipLoad bounds={bottomBox} padding={false} goBack={this.handleGoBack} />
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
        paddingBottom: 20
      }
    }
  }
}

Console.propTypes = {
  // query slug to load to
  slug: PropTypes.string,
  size: PropTypes.string,
  query: PropTypes.object.isRequired,
  // dataset: PropTypes.array,
  queries: PropTypes.array,
  datasets: PropTypes.array,
  results: PropTypes.object,
  queryHistory: PropTypes.array,
  topPanelIndex: PropTypes.number.isRequired,
  bottomPanelIndex: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
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
