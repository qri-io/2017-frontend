import React, { Component, PropTypes } from 'react'
import DownloadResultsButton from './DownloadResultsButton'

import Spinner from './Spinner'

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

export default class ResultsTable extends Component {
	render() {
		if (!this.props.results) {
			return <div className="resultsTable"></div>;
		}
		const { schema, data, fetching, fetchedAll } = this.props.results;
		const { onLoadMore, showStdCols } = this.props;
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
				{ fetching ? <Spinner /> : undefined }
				{ (!fetching && !fetchedAll) ? <button className="btn btn-primary btn-large" onClick={onLoadMore}>Load More</button> : undefined }
			</div>
		)
	}
}

ResultsTable.propTypes = {
	data : React.PropTypes.object,
	showStdCols : React.PropTypes.bool.isRequired,

	showLoadMore : React.PropTypes.bool.isRequired,
	onLoadMore : React.PropTypes.func,
}

ResultsTable.defaultProps = {
	showStdCols : false,
	showLoadMore : false
}