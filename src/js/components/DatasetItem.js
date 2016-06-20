import React from 'react';

export default class DatasetItem extends React.Component {
	render() {
		const { data, onSelect } = this.props
		return (
			<div className="datasetItem" onClick={onSelect}>
				<h4>{data.ownerUsername}.{data.slug}</h4>
				<small>{data.name}</small>
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