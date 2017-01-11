import React, { PropTypes } from 'react';

export default class RoleItem extends React.Component {
	render() {
		const { data, onSelect } = this.props;

		return (
			<div className="role item" onClick={onSelect}>
				<h3 className="red">{data.address}</h3>
				<p>{data.type}</p>
			</div>
		);
	}
}

RoleItem.propTypes = {
	data : PropTypes.object.isRequired,
	index : PropTypes.number.isRequired,

	onSelect : PropTypes.func.isRequired
}

RoleItem.defaultProps = {
	
}