import React, { Component, PropTypes } from 'react'
import DownloadResultsButton from './DownloadResultsButton'

import Spinner from './Spinner'

export default class ResultsTable extends Component {
	render() {
		if (!this.props.results) {
			return <div className="resultsTable"></div>;
		}
		const { fields, data, fetching, fetchedAll, error } = this.props.results;
		const { onLoadMore, showStdCols } = this.props;
		// const displaySchema = fields.reduce(removeStdCols(fields, showStdCols),[])

		if (error) {
			return (
				<div className="resultsTable">
					<h5>{error}</h5>
				</div>
			); 
		}
		return (
			<div className="resultsTable">
				<div className="table-responsive">
					<table className="table table-hover query-results">
						<thead><tr>{fields.map((col, i) => <th className="blue" key={i}>{col.name}</th>)}</tr></thead>
						<tbody>
							{data.map((row, i) => {
								return (
									<tr key={i}>
										{row.map((cell, j) => 
											<td className={"dt-" + fields[j].type} key={`${i}.${j}`}>{cell.toString()}</td>
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