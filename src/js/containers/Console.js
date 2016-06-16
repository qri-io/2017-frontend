import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { setQuery, runQuery } from '../actions/query'

import QueryEditor from '../components/QueryEditor'
import ResultsTable from '../components/ResultsTable'
import SchemaList from '../components/SchemaList'

class Console extends Component {
	constructor(props) {
		super(props);
		[
			'handleRunQuery',
			'handleEditorChange'
		].forEach(m => this[m] = this[m].bind(this))

		this.debouncedSetQuery = debounce(props.setQuery, 200)
	}

	handleRunQuery(e) {
		this.props.runQuery({
			dataset : { id : "1217fefe-d5a1-4dfa-8a1e-83fc27305f5f" }, 
			query : this.props.query,
			page : 1, 
			pageSize : 50
		});
	}

	handleEditorChange(value) {
		this.debouncedSetQuery(value)
	}

	render() {
		const { runQuery, results, query } = this.props
		return (
			<div id="console" className="container">
				<div className="col-md-12">
					<QueryEditor value={query} onRun={this.handleRunQuery} onChange={this.handleEditorChange} />
				</div>
				<div>
					<h3>Results</h3>
					<h3>Schemas</h3>
					<h3>Datasets</h3>
					<ResultsTable data={results} />
					<SchemaList />
				</div>
			</div>
		)
	}
}

Console.propTypes = {
	setQuery : React.PropTypes.func.isRequired,
	runQuery : React.PropTypes.func.isRequired,
	results : React.PropTypes.object,
}

Console.defaultProps = {
}

function mapStateToProps(state, ownProps) {
	return Object.assign({}, {
		results : state.entities.results.result,
	}, state.console, ownProps)
}

export default connect(mapStateToProps, { setQuery, runQuery })(Console)