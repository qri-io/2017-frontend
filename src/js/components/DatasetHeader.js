import React, { PropTypes } from 'react';

import { Link } from 'react-router'

export default class DatasetHeader extends React.Component {
	render() {
		const { dataset } = this.props
		const path = "/" + dataset.address.replace(".", "/", -1);
		const username = dataset.address.split('.')[0];
		const datasetName = dataset.address.split('.')[1];

		return (
			<div className="row">
				<header className="blue page-header col-md-12">
					<hr className="blue" />
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
	dataset  : PropTypes.object.isRequired
}

DatasetHeader.defaultProps = {
	
}