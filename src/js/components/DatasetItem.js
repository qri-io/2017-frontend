import React from 'react';
import { Link } from 'react-router';

export default class DatasetItem extends React.Component {
	render() {
		const { data, onSelect } = this.props
		return (
			<div className="datasetItem" onClick={onSelect}>
				<hr />
				<Link className="namespace" to={data.address.replace(".","/",-1)}>{data.address}</Link>
				<p>{data.summary}</p>
				<ul>
					{data.schema ? data.schema.map((table, i) => <li key={i}>{table.name}</li>) : null}
				</ul>
			</div>
		);
	}
}

DatasetItem.propTypes = {
	data : React.PropTypes.object.isRequired,
	onSelect : React.PropTypes.func.isRequired
}

DatasetItem.defaultProps = {
	
}