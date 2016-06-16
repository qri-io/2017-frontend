import React, { Component, PropTypes } from 'react'

export default class ResultsTable extends Component {
	renderButtons() {
		return (
			<div>
				<button class="btn btn-default" data-id="{{>id }}" data-page-num="{{>(page - 1) }}" data-query="{{>query}}" data-page-size="{{>pageSize}}" onclick="runButtonQuery(this)">Prev Page</button>
				<button class="btn btn-default" data-id="{{>id }}" data-page-num="{{>(page + 1) }}" data-query="{{>query}}" data-page-size="{{>pageSize}}" onclick="runButtonQuery(this)">Next Page</button>
				<a href="javascript:window.location=\'/query?format=csv&download=true&dataset-id={{:~param(id)}}&query={{:~param(query)}}\'"><button class="btn btn-default">.csv</button></a>
				<a href="javascript:window.location=\'/query?format=json&download=true&dataset-id={{:~param(id)}}&query={{:~param(query)}}\'"><button class="btn btn-default">.json</button></a>
			</div>
		);
	}

	render() {
		if (!this.props.data) { return null; }
		const { schema, data } = this.props.data;

		return (
			<div>
				<h3>Results</h3>
				<div class="table-responsive">
					<table class="table table-hover query-results">
						<thead><tr>{schema.map((col) => <th>{col.name}</th>)}</tr></thead>
						{data.map((row) => {
							return (
								<tr>{row.map((cell, i) => <td class={schema[i].type}>{cell}</td>)}</tr>
							);
						})}
					</table>
				</div>
			</div>
		)
	}
}

ResultsTable.propTypes = {
	data : React.PropTypes.object
}