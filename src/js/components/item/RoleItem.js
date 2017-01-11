import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { addressPath } from '../../selectors/dataset';

export default class RoleItem extends React.Component {
	render() {
		const { data, onSelect } = this.props;
		return (
			<div className="role item">
				<h4 className="red"><Link to={addressPath(data.address)}>{data.address}</Link></h4>
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