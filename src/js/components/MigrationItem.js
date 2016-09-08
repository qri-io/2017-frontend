import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class MigrationItem extends React.Component {
	render() {
		const { data, onSelect } = this.props
		return (
			<div className="migrationItem" onClick={onSelect}>
				<p>{ data.number || data.id }</p>
				<p>{ data.sql }</p>
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