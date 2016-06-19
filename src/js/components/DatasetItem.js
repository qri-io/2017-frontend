import React from 'react';

export default class DatasetItem extends React.Component {
	render() {
		const { data, onSelect } = this.props
		return (
			<div className="datasetItem">
				<h3>{data.name}</h3>
				<small>{data.slug}</small>
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