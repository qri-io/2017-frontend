import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'

import { setQuery, runQuery, loadQueryPage } from '../actions/query'
import { setTopPanel, setBottomPanel, setChartOptions } from '../actions/console'
import { loadDatasets, loadDataset } from '../actions/dataset'

import TabPanel from '../components/TabPanel'
import QueryEditor from '../components/QueryEditor'
import ResultsTable from '../components/ResultsTable'
import ResultsChart from '../components/ResultsChart'
import List from '../components/List'
import DatasetItem from '../components/DatasetItem'
import QueryHistoryItem from '../components/QueryHistoryItem'
import QueryItem from '../components/QueryItem'

function loadData(props) {
	props.loadDatasets(1, 100)
	props.loadQueryPage(1,50)
}

class Console extends React.Component {
	constructor(props) {
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
			'handleLoadMoreResults'
		].forEach(m => this[m] = this[m].bind(this))

		// this.debouncedSetQuery = debounce(props.setQuery, 200)
	}

  componentWillMount(props) {
    loadData(this.props)
  }

	componentWillReceiveProps(nextProps) {
    // loadData(nextProps)
	}

	handleRunQuery(e) {
		this.props.runQuery({
			query : this.props.query,
			page : 1
		});
	}

	handleDownloadQuery(e) {
		this.props.runQuery({
			query : this.props.query,
			download : true
		});
	}

	handleEditorChange(value) {
		// this.debouncedSetQuery(value)
		this.props.setQuery(value);
	}
	handleEditorAddressChange(value) {
		this.props.setQueryAddress(value);
	}

	handleSetTopPanel(index) {
		this.props.setTopPanel(index);
	}

	handleSetBottomPanel(index) {
		this.props.setBottomPanel(index);
	}

	handleSetChartOptions(options) {
		this.props.setChartOptions(options);
	}

	handleSelectDataset(i, dataset) {
		this.props.loadDataset(dataset.id, ['schema']);
	}

	handleSelectHistoryEntry(i, query) {
		this.props.setTopPanel(0);
		this.props.setQuery(query);
	}

	handleQuerySelect(i, query) {
		this.props.setTopPanel(0);
		this.props.setQuery(query);
	}

	handleLoadMoreResults() {
		this.props.runQuery({
			query : this.props.query,
			page : this.props.results.pageCount + 1
		})
	}

	render() {
		const { runQuery, queries, datasets, results, query, topPanelIndex, bottomPanelIndex, queryHistory, chartOptions, device } = this.props
		return (
			<div id="console">
				<div className="top container">
					<div className="col-md-12">
						<TabPanel 
							index={topPanelIndex}
							onSelectPanel={this.handleSetTopPanel}
							labels={['Editor', 'History']}
							components={[
								<QueryEditor query={query} onRun={this.handleRunQuery} onDownload={this.handleDownloadQuery} onChange={this.handleEditorChange} />,
								<List className="queryHistory list" data={queryHistory} component={QueryHistoryItem} onSelectItem={this.handleSelectHistoryEntry} />,
							]} />
					</div>
				</div>
				<div className="bottom">
					<div className="container">
						<div className="col-md-12">
							<TabPanel
								index={bottomPanelIndex}
								labels={['Results', 'Chart', 'Datasets', 'Queries']}
								onSelectPanel={this.handleSetBottomPanel}
								components={[
									<ResultsTable results={results} onLoadMore={this.handleLoadMoreResults} />,
									<ResultsChart results={results} options={chartOptions} onOptionsChange={this.handleSetChartOptions} device={device} />,
									<List data={datasets} component={DatasetItem} onSelectItem={this.handleSelectDataset} />,
									<List className="queryItem list" data={queries} component={QueryItem} onSelectItem={this.handleQuerySelect} />
								]} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Console.propTypes = {
	query : PropTypes.object.isRequired,

	dataset : PropTypes.array,
	queries : PropTypes.array,
	datasets : PropTypes.array,
	results : PropTypes.object,
	queryHistory : PropTypes.array,
	topPanelIndex : PropTypes.number.isRequired,
	bottomPanelIndex : PropTypes.number.isRequired,
	device : PropTypes.object.isRequired,

	setQuery : PropTypes.func.isRequired,
	runQuery : PropTypes.func.isRequired,
	setTopPanel : PropTypes.func.isRequired,
	setBottomPanel : PropTypes.func.isRequired,
	loadDatasets : PropTypes.func.isRequired,
	loadDataset : PropTypes.func.isRequired,
}

Console.defaultProps = {
	hasMoreResults : false,
	nextResultsPage : 1,
}

function mapStateToProps(state, ownProps) {
	const results = state.results[state.console.query.statement];

	return Object.assign({}, {
		queries : Object.keys(state.entities.queries).map(key => state.entities.queries[key]),
		datasets : Object.keys(state.entities.datasets).map(key => state.entities.datasets[key]),
		queryHistory : state.session.history,
		device : state.device,

		results,
	}, state.console, ownProps)
}

export default connect(mapStateToProps, { 
	setQuery, 
	runQuery,
	loadQueryPage,

	setTopPanel, 
	setBottomPanel,
	setChartOptions, 

	loadDatasets,
	loadDataset
})(Console)
