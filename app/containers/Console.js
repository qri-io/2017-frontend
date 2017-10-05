import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// import { debounce } from 'lodash';

import { setQuery, runQuery, loadQueryBySlug, loadQueryPage } from '../actions/query'
import { setTopPanel, setBottomPanel, setChartOptions } from '../actions/console'
import { loadDatasets, loadDataset } from '../actions/dataset'

import DatasetDataGrid from '../components/DatasetDataGrid'
import TabPanel from '../components/TabPanel'
import QueryEditor from '../components/QueryEditor'
import DataTable from '../components/DataTable'
import List from '../components/List'

import QueryHistoryItem from '../components/item/QueryHistoryItem'
import QueryItem from '../components/item/QueryItem'
import PeerItem from '../components/item/PeerItem'
import ResultsChart from '../components/ResultsChart'
import Datasets from './Datasets'

function loadData (props) {
  props.loadDatasets(1, 100)
}

class Console extends React.Component {
  constructor (props) {
    super(props);
    [
      'handleRunQuery',
      'handleDownloadQuery',
      'handleEditorChange',
      'handleSetTopPanel',
      'handleSetBottomPanel',
      'handleSetChartOptions',
      'handleSelectDataset',
      'handleSelectHistoryEntry',
      'handleQuerySelect',
      'handlePeerSelect',
      'handleLoadMoreResults'
    ].forEach((m) => { this[m] = this[m].bind(this) })

    // this.debouncedSetQuery = debounce(props.setQuery, 200)
  }

  componentWillMount () {
    loadData(this.props)
    if (this.props.slug) {
      // this.props.loadQueryBySlug(this.props.slug, [], true);
    }
  }

  componentWillReceiveProps (nextProps) {
    // loadData(nextProps);
    if (nextProps.slug !== this.props.slug) {
      // this.props.loadQueryBySlug(nextProps.slug, [], true);
      this.props.setBottomPanel(0)
    }
  }

  handleRunQuery (e) {
    e.preventDefault()
    // this.props.runQuery({
    //   query: this.props.query.,
    //   page: 1,
    // });
    this.props.runQuery(this.props.query)
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

  handleSelectHistoryEntry (i, query) {
    this.props.setTopPanel(0)
    this.props.setQuery(query)
  }

  handleQuerySelect (i, query) {
    this.props.setTopPanel(0)
    this.props.setQuery(query)
  }

  handlePeerSelect (i, peer) {
    // this doesn't do anything yet
  }

  handleLoadMoreResults () {
    this.props.runQuery({
      queryString: this.props.query,
      page: (this.props.results.pageCount + 1)
    })
  }

  render () {
    const { queries, datasetRef, data, query, topPanelIndex, bottomPanelIndex, queryHistory, layout, peers, size } = this.props
    const { main } = layout

    const topBox = {
      top: main.top,
      left: 0,
      width: main.width,
      height: main.height * 0.4
    }

    const bottomBox = {
      top: main.height * 0.4,
      left: 0,
      width: main.width,
      height: main.height * 0.6
    }

    return (
      <div id='console'>
        <div className='top panel'>
          <TabPanel
            index={topPanelIndex}
            onSelectPanel={this.handleSetTopPanel}
            labels={['Editor', 'History']}
            bounds={topBox}
            components={[
              <div className='panel'>
                <QueryEditor bounds={topBox} name='editor' query={query} onRun={this.handleRunQuery} onDownload={this.handleDownloadQuery} onChange={this.handleEditorChange} />
              </div>,
              <div className='panel'>
                <List bounds={topBox} className='queryHistory list' data={queryHistory} component={QueryHistoryItem} onSelectItem={this.handleSelectHistoryEntry} />
              </div>
            ]}
          />
        </div>
        <div className='bottom panel'>
          <TabPanel
            index={bottomPanelIndex}
            labels={['Data', 'Chart', 'Datasets', 'Queries', 'Peers']}
            onSelectPanel={this.handleSetBottomPanel}
            components={[
              <DatasetDataGrid
                dataset={datasetRef && datasetRef.dataset}
                data={data}
                onLoadMore={this.handleLoadMoreResults}
                bounds={bottomBox}
              />,
              <div className='panel'>
                <ResultsChart size={size} />
              </div>,
              <div className='panel'>
                <Datasets skipLoad bounds={bottomBox} />
              </div>,
              <div className='panel'>
                <List className='queryItem list' data={queries} component={QueryItem} onSelectItem={this.handleQuerySelect} bounds={bottomBox} />
              </div>,
              <div className='panel'>
                <List className='peerItem list' data={peers} component={PeerItem} onSelectItem={this.handlePeerSelect} bounds={bottomBox} />
              </div>
            ]}
          />
        </div>
      </div>
    )
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

  setQuery: PropTypes.func.isRequired,
  runQuery: PropTypes.func.isRequired,
  setTopPanel: PropTypes.func.isRequired,
  setBottomPanel: PropTypes.func.isRequired,
  // loadDatasets: PropTypes.func.isRequired,
  loadDataset: PropTypes.func.isRequired
}

Console.defaultProps = {
  hasMoreResults: false,
  nextResultsPage: 1
}

function mapStateToProps (state, ownProps) {
  // const results = state.results[state.console.query.queryString];
  const datasetRef = state.entities.datasets[state.console.queryResults]
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
    // slug: ownProps.location.query.slug,
    queries: Object.keys(state.entities.queries).map(key => state.entities.queries[key]),
    datasets: Object.keys(state.entities.datasets).map(key => state.entities.datasets[key]),
    queryHistory: state.session.history,
    layout: state.layout,

    datasetRef,
    data,
    peers,
    size
    // results,
  }, state.console, ownProps)
}

export default connect(mapStateToProps, {
  setQuery,
  runQuery,
  loadQueryPage,
  loadQueryBySlug,

  setTopPanel,
  setBottomPanel,
  setChartOptions,

  loadDatasets,
  loadDataset
})(Console)
