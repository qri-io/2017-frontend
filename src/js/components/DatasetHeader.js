import React, { PropTypes } from 'react';

import { Link } from 'react-router'

export default class DatasetHeader extends React.Component {
	render() {
		const { dataset } = this.props
		const path = "/" + dataset.address.replace(".", "/", -1);
		const username = dataset.address.split('.')[0];
		const datasetName = dataset.address.split('.')[1];

		return (
			<header className="page-header col-md-12">
				<small>DATASET</small>
				<h2>
					<Link to={ "/" + username }>{ username }</Link>
					<span>.</span>
					<Link to={ path }>{ datasetName }</Link>
				</h2>
				<p>
					<span>{ dataset.table_count || 0 } Tables </span>
					<span>{ dataset.row_count || 0 } Rows </span>
					<Link to={`${path}/migrations`}>{ dataset.migration_count || 0 } Migrations </Link>
					<Link to={`${path}/changes`}>{ dataset.change_count || 0 } Changes</Link>
					{ dataset.sourceUrl ? <span>| <a href={ dataset.sourceUrl } target="_blank">{ dataset.sourceUrl }</a></span> : undefined }
				</p>
			</header>
		);
	}
}

DatasetHeader.propTypes = {
	// dataset data model
	dataset  : PropTypes.object.isRequired
}

DatasetHeader.defaultProps = {
	
}