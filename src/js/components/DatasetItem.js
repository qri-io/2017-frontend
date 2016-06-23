import React from 'react';

export default class DatasetItem extends React.Component {
	render() {
		const { data, onSelect } = this.props
		return (
			<div className="datasetItem" onClick={onSelect}>
				<h5 className="namespace">{data.ownerUsername}.{data.slug}</h5>
				<p>{data.name}</p>
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