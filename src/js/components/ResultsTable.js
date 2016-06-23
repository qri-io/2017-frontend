import React, { Component, PropTypes } from 'react'
import DownloadResultsButton from './DownloadResultsButton'

// TODO - plumb query into results table to support download links
export default class ResultsTable extends Component {
	render() {
		if (!this.props.data) { return null; }
		const { schema, data } = this.props.data;

		return (
			<div className="resultsTable">
				<div className="table-responsive">
					<table className="table table-hover query-results">
						<thead><tr>{schema.map((col, i) => <th key={i}>{col.name}</th>)}</tr></thead>
						<tbody>
							{data.map((row, i) => {
								return (
									<tr key={i}>{row.map((cell, j) => <td className={schema[j].type} key={`${i}.${j}`}>{cell}</td>)}</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

ResultsTable.propTypes = {
	data : React.PropTypes.object,
	query : React.PropTypes.string.isRequired
}

ResultsTable.defaultProps = {
}