import React, { Component, PropTypes } from 'react'
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
	props.loadDatasets("", 1, 100)
	props.loadQueryPage(1,50)
}

class Console extends Component {
	constructor(props) {
		super(props);
		[
			'handleRunQuery',
			'handleEditorChange',
			'handleSetTopPanel',
			'handleSetBottomPanel',
			'handleSetChartOptions',
			'handleSelectDataset',
			'handleSelectHistoryEntry',
			'handleQuerySelect'
		].forEach(m => this[m] = this[m].bind(this))

		this.debouncedSetQuery = debounce(props.setQuery, 200)
	}

  componentWillMount(props) {
    loadData(this.props)
  }

	componentWillReceiveProps(nextProps) {
    // loadData(nextProps)
	}

	handleRunQuery(e) {
		this.props.runQuery({
			query : {
				namespace: this.props.namespace,
				statement : this.props.query
			},
			page : 1, 
			pageSize : 50
		});
	}

	handleEditorChange(value) {
		this.debouncedSetQuery(value)
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
		this.props.setQuery(query.query.statement);
	}

	handleQuerySelect(i, query) {
		this.props.setTopPanel(0);
		this.props.setQuery(query.statement);
	}

	render() {
		const { runQuery, queries, datasets, results, query, topPanelIndex, bottomPanelIndex, queryHistory, chartOptions, device } = this.props
		return (
			<div id="console" className="container">
				<div className="col-md-12">
					<TabPanel 
						index={topPanelIndex}
						onSelectPanel={this.handleSetTopPanel}
						labels={['Editor', 'History']}
						components={[
							<QueryEditor value={query} onRun={this.handleRunQuery} onChange={this.handleEditorChange} />,
							<List className="queryHistory list" data={queryHistory} component={QueryHistoryItem} onSelectItem={this.handleSelectHistoryEntry} />,
						]} />
				</div>
				<div className="col-md-12">
					<TabPanel
						index={bottomPanelIndex}
						labels={['Results', 'Chart', 'Datasets', 'Queries']}
						onSelectPanel={this.handleSetBottomPanel}
						components={[
							<ResultsTable data={results} query={query} />,
							<ResultsChart results={results} options={chartOptions} onOptionsChange={this.handleSetChartOptions} device={device} />,
							<List data={datasets} component={DatasetItem} onSelectItem={this.handleSelectDataset} />,
							<List className="queryItem list" data={queries} component={QueryItem} onSelectItem={this.handleQuerySelect} />
						]} />
				</div>
			</div>
		)
	}
}

Console.propTypes = {
	namespace : React.PropTypes.string,
	dataset : React.PropTypes.array,
	queries : React.PropTypes.array,
	datasets : React.PropTypes.array,
	results : React.PropTypes.object,
	queryHistory : React.PropTypes.array,
	topPanelIndex : React.PropTypes.number.isRequired,
	bottomPanelIndex : React.PropTypes.number.isRequired,
	device : React.PropTypes.object.isRequired,

	setQuery : React.PropTypes.func.isRequired,
	runQuery : React.PropTypes.func.isRequired,
	setTopPanel : React.PropTypes.func.isRequired,
	setBottomPanel : React.PropTypes.func.isRequired,
	loadDatasets : React.PropTypes.func.isRequired,
	loadDataset : React.PropTypes.func.isRequired,
}

Console.defaultProps = {
	namespace : ""
}

function mapStateToProps(state, ownProps) {
	return Object.assign({}, {
		results : state.entities.results.result,
		queries : Object.keys(state.entities.queries).map(key => state.entities.queries[key]),
		datasets : Object.keys(state.entities.datasets).map(key => state.entities.datasets[key]),
		queryHistory : state.session.history,
		device : state.device
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
