import React from 'react';
import { Link } from 'react-router';

export default class UserItem extends React.Component {
	render() {
		const { data, onSelect } = this.props
		return (
			<div className="user item col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<h4 onClick={onSelect}>
					<Link className="namespace" to={`/users/${data.username}`}>{data.username}</Link>
				</h4>
			</div>
		);
	}
}

UserItem.propTypes = {
	data : React.PropTypes.object.isRequired,
	onSelect : React.PropTypes.func.isRequired
}

UserItem.defaultProps = {
	
}