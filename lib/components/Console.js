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
    super(props)

    this.state = {
      expanded: undefined
    };

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
      'handleSelectQuery',
      'handleLoadMoreResults',
      'handleToggleExpand'
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

  handleToggleExpand (panel) {
    if (this.state.expanded === panel) {
      panel = undefined
    }
    this.setState({ expanded: panel })
  }

  handleRunQuery (e) {
    e.preventDefault()
    // this.props.runQuery({
    //   query: this.props.query.,
    //   page: 1,
    // });
    if (!this.props.query.queryString) {
      return
    }
    this.props.setLoadingData(true)
    this.props.resetQueryResults()
    this.props.runQuery(this.props.query, (error) => {
      this.props.setLoadingError(error)
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

  handleSelectQuery (i, query) {
    if (this.state.expanded) {
      this.setState({ expanded: undefined })
    }
  }

  handleLoadMoreResults () {
    this.props.resetQueryResults()
    this.props.runQuery({
      queryString: this.props.query,
      page: (this.props.results.pageCount + 1)
    }, (error) => {
      this.props.setLoadingError(error)
      this.props.setLoadingData(false)
    })
  }

  renderInspector () {
    const { expanded } = this.state

    return (<TabPanel
      labels={['Datasets', 'Query Log']}
      onToggleExpand={this.handleToggleExpand.bind(this, 'inspector')}
      expanded={expanded === 'inspector'}
      components={[
        <div className='panel'>
          <DatasetsContainer skipLoad smallItems padding={false} goBack={this.handleGoBack} noHeader />
        </div>,
        <div className='panel'>
          <QueriesContainer skipLoad onSelectItem={this.handleSelectQuery} />
        </div>
      ]}
    />)
  }

  renderResults () {
    const { bottomPanelIndex, datasetRef, error, data, loadingData, chartOptions } = this.props
    const { expanded } = this.state

    return (
      <TabPanel
        index={bottomPanelIndex}
        labels={['Data', 'Chart']}
        onSelectPanel={this.handleSetBottomPanel}
        onToggleExpand={this.handleToggleExpand.bind(this, 'results')}
        expanded={expanded === 'results'}
        components={[
          <DatasetDataGrid
            dataset={datasetRef && datasetRef.dataset}
            data={data}
            onLoadMore={this.handleLoadMoreResults}
            loading={loadingData}
            error={error}
            onSetLoadingData={this.handleSetLoadingData}
          />,
          <div className='panel'>
            <ResultsChart size={{}} onOptionsChange={this.handleSetChartOptions} schema={datasetRef && datasetRef.dataset.structure.schema} data={data} chartOptions={chartOptions} />
          </div>
        ]}
      />
    )
  }

  template (css) {
    const { query, error } = this.props
    const { expanded } = this.state

    switch (expanded) {
      case 'results':
        return (
          <div className={css('wrap')}>
            <div className={css('expanded')}>
              {this.renderResults()}
            </div>
          </div>
        )
      case 'inspector':
        return (
          <div className={css('wrap')}>
            <div className={css('expanded')}>
              {this.renderInspector()}
            </div>
          </div>
        )
      default:
        return (
          <div className={css('wrap')}>
            <div className={css('left')} >
              <div className={css('editor')}>
                <QueryEditor
                  name='editor'
                  query={query}
                  onRun={this.handleRunQuery}
                  onDownload={this.handleDownloadQuery}
                  onChange={this.handleEditorChange}
                  error={error}
                />
              </div>
              <div className={css('results')}>
                {this.renderResults()}
              </div>
            </div>
            <div className={css('right')}>
              {this.renderInspector()}
            </div>
          </div>
        )
    }
  }

  styles () {
    return {
      wrap: {
        padding: '40px 20px 20px 20px',
        height: '100%',
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'stretch'
      },
      expanded: {
        flex: '2 1 100%'
      },
      left: {
        marginRight: 5,
        flex: '2 1 600px',
        display: 'flex',
        flexFlow: 'column'
      },
      right: {
        marginLeft: 5,
        flex: '1 1 300px'
      },
      editor: {
        flex: '1 2 200px'
      },
      results: {
        flex: '3 1 700px'
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
