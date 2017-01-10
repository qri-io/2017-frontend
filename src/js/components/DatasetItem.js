import React from 'react';
import { Link } from 'react-router';

export default class DatasetItem extends React.Component {
	render() {
		const { data, onSelect } = this.props
		return (
			<div className="dataset item col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<h4 onClick={onSelect}>
					<Link className="namespace" to={data.address.replace(".","/",-1)}>{data.name ? data.name : "unnamed dataset"}</Link>
				</h4>
				<p>{data.address}</p>
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