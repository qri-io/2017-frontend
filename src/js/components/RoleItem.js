import React, { PropTypes } from 'react';

export default class RoleItem extends React.Component {
	render() {
		const { data, onSelect } = this.props;

		return (
			<div className="role item" onClick={onSelect}>
				<h4>{data.address}</h4>
				<h5>{data.type}</h5>
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