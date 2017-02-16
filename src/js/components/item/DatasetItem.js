import React from 'react';
import { Link } from 'react-router';

export default class DatasetItem extends React.Component {
	render() {
		const { data, onSelect } = this.props
		return (
			<div className="dataset item col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<h3 onClick={onSelect}>
					<Link className="name" to={"/" + data.address.replace(/\./gi,"/")}>{data.name ? data.name : "unnamed dataset"}</Link>
				</h3>
				<p className="address">{data.address}</p>
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