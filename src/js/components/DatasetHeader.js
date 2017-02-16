import React, { PropTypes } from 'react';

import { Link } from 'react-router'

export default class DatasetHeader extends React.Component {
	render() {
		const { dataset, onDownload } = this.props
		const path = "/" + dataset.address.replace(".", "/", -1);

		return (
			<div className="row">
				<header className="blue page-header col-md-12">
					<hr className="blue" />
					<a className="green right" href={`/downloads/package?address=${dataset.address}`}>Download</a>
					<h1>{dataset.name || "unnamed dataset"}</h1>
					<p className="address">{dataset.address}</p>
					<p>
						{ dataset.sourceUrl ? <span>| <a href={ dataset.sourceUrl } target="_blank">{ dataset.sourceUrl }</a></span> : undefined }
					</p>
				</header>
			</div>
		);
	}
}

DatasetHeader.propTypes = {
	// dataset data model
	dataset  : PropTypes.object.isRequired,
	onDownload : PropTypes.func.isRequired
}

DatasetHeader.defaultProps = {
	
}