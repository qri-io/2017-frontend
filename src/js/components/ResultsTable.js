import React, { Component, PropTypes } from 'react'
import DownloadResultsButton from './DownloadResultsButton'

function removeStdCols(schema, show) {
	return (a,b,i) => {
		if (!show) {
			const colName = schema[i].name
			if (colName == "id" || colName == "created" || colName == "updated") {
				return a
			}
		}
		a.push(b);
		return a;
	}
}

// TODO - plumb query into results table to support download links
export default class ResultsTable extends Component {
	render() {
		if (!this.props.data) { return null; }
		const { schema, data, showStdCols } = this.props.data;
		const displaySchema = schema.reduce(removeStdCols(schema, showStdCols),[])

		return (
			<div className="resultsTable">
				<div className="table-responsive">
					<table className="table table-hover query-results">
						<thead><tr>{displaySchema.map((col, i) => <th key={i}>{col.name}</th>)}</tr></thead>
						<tbody>
							{data.map((row, i) => {
								return (
									<tr key={i}>
										{row.reduce(removeStdCols(schema, showStdCols),[]).map((cell, j) => 
											<td className={"dt-" + displaySchema[j].type} key={`${i}.${j}`}>{cell.toString()}</td>
										)}
									</tr>
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
	query : React.PropTypes.object.isRequired,
	showStdCols : React.PropTypes.bool.isRequired
}

ResultsTable.defaultProps = {
	showStdCols : false
}