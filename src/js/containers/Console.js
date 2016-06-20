import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { setQuery, runQuery } from '../actions/query'
import { setTopPanel, setBottomPanel } from '../actions/console'
import { loadDatasets, loadDataset } from '../actions/dataset'

import TabPanel from '../components/TabPanel'
import QueryEditor from '../components/QueryEditor'
import ResultsTable from '../components/ResultsTable'
import List from '../components/List'
import DatasetItem from '../components/DatasetItem'

function loadData(props) {
	props.loadDatasets("", 1, 100)
}

class Console extends Component {
	constructor(props) {
		super(props);
		[
			'handleRunQuery',
			'handleEditorChange',
			'handleSetTopPanel',
			'handleSetBottomPanel',
			'handleSelectDataset'
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
			// dataset : { id : "1217fefe-d5a1-4dfa-8a1e-83fc27305f5f" },
			query : this.props.query,
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

	handleSelectDataset(i, dataset) {
		this.props.loadDataset(dataset.id, ['schema']);
	}

	render() {
		const { runQuery, datasets, results, query, topPanelIndex, bottomPanelIndex } = this.props
		return (
			<div id="console" className="container">
				<div className="col-md-12">
					<TabPanel 
						index={topPanelIndex}
						onSelectPanel={this.handleSetTopPanel}
						labels={['Query']}
						components={[
							<QueryEditor value={query} onRun={this.handleRunQuery} onChange={this.handleEditorChange} />,
						]} />
				</div>
				<div className="col-md-12">
					<TabPanel
						index={bottomPanelIndex}
						labels={['Results', 'Schemas', 'Explorer']}
						onSelectPanel={this.handleSetBottomPanel}
						components={[
							<ResultsTable data={results} />,
							<div><h4>Query Schema</h4></div>,
							<List data={datasets} component={DatasetItem} onSelectItem={this.handleSelectDataset} />
						]} />
				</div>
			</div>
		)
	}
}

Console.propTypes = {
	datsets : React.PropTypes.array,
	results : React.PropTypes.object,
	topPanelIndex : React.PropTypes.number.isRequired,
	bottomPanelIndex : React.PropTypes.number.isRequired,

	setQuery : React.PropTypes.func.isRequired,
	runQuery : React.PropTypes.func.isRequired,
	setTopPanel : React.PropTypes.func.isRequired,
	setBottomPanel : React.PropTypes.func.isRequired,
	loadDatasets : React.PropTypes.func.isRequired,
	loadDataset : React.PropTypes.func.isRequired,
}

Console.defaultProps = {
}

function mapStateToProps(state, ownProps) {
	return Object.assign({}, {
		results : state.entities.results.result,
		datasets : Object.keys(state.entities.datasets).map(key => state.entities.datasets[key]),
	}, state.console, ownProps)
}

export default connect(mapStateToProps, { 
	setQuery, 
	runQuery, 
	setTopPanel, 
	setBottomPanel, 
	loadDatasets,
	loadDataset,
})(Console)
