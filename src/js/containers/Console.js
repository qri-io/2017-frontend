import React, { Component, PropTypes } from 'react'
import Editor from '../components/editor'
import ResultsTable from '../components/ResultsTable'
import SchemaList from '../components/SchemaList'

export default class Console extends Component {
	render() {
		return (
			<div id="console">
				<div>
					<h3>Query</h3>
					<h3>History</h3>
					<Editor />
				</div>
				<div>
					<h3>Results</h3>
					<h3>Schemas</h3>
					<ResultsTable />
					<SchemaList />
				</div>
			</div>
		)
	}
}

Console.propTypes = {
}

Console.defaultProps = {
}