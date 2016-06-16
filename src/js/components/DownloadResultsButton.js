import React from 'react'

export default class DownloadResultsButton extends React.Component {
	render() {
		// <button class="btn btn-default" data-id="{{>id }}" data-page-num="{{>(page - 1) }}" data-query="{{>query}}" data-page-size="{{>pageSize}}" onclick="runButtonQuery(this)">Prev Page</button>
		// <button class="btn btn-default" data-id="{{>id }}" data-page-num="{{>(page + 1) }}" data-query="{{>query}}" data-page-size="{{>pageSize}}" onclick="runButtonQuery(this)">Next Page</button>
		return (
			<div className="downloadResultsButton">
				<a href={downloadHref('','', "csv")}><button className="btn btn-default">.csv</button></a>
				<a href={downloadHref('','', "json")}><button className="btn btn-default">.json</button></a>
			</div>
		);
	}
}

function downloadHref(id, query, format) {
	id = encodeURIComponent(id)
	query = encodeURIComponent(query)
	return `javascript:window.location=\'/query?format=${format}&download=true&dataset-id=${id}&query=${query}\'`
}

DownloadResultsButton.propTypes = {
	datasetId : React.PropTypes.string,
	query : React.PropTypes.string
}

DownloadResultsButton.defaultProps = {

}