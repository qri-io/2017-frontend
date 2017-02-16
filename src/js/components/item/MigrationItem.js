import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class MigrationItem extends React.Component {
	status(data) {
		if (!data.executed && !data.declined) {
			return "open"
		} else if (data.declined)  {
			return "declined"
		} else if (data.executed) {
			return "executed"
		}
		return "";
	}

	render() {
		const { data, onSelect } = this.props
		return (
			<div className="migrationItem" onClick={onSelect}>
				<hr />
				<div className="number" style={{ float : 'left', marginRight : 20 }}>
					<h3>{ data.number }</h3>
				</div>
				<h5>{ data.sql }</h5>
				<div className="status">
					<small>{ this.status(data) }</small>
				</div>
			</div>
		);
	}
}

MigrationItem.propTypes = {
	data : React.PropTypes.object.isRequired,
	index : PropTypes.number.isRequired,
	onSelect : React.PropTypes.func.isRequired
}

MigrationItem.defaultProps = {
	
}