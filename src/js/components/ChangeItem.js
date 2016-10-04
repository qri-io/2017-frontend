import React, { PropTypes } from 'react'

export default class ChangeItem extends React.Component {
	description(data) {
		if (data.description) {
			return data.description;
		} else {
			switch (data.type) {
				case "INSERT":
					return `insert into ${data.table_name}`
				case "UPDATE":
					return `update on ${data.table_name}`
				case "DELETE":
					return `delete from ${data.table_name}`
			}
		}

		return "";
	}

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
		const { data, onSelect } = this.props;
		let description = data.description;

		return (
			<div className="change item" onClick={onSelect}>
				<hr />
				<div className="number" style={{ float : 'left', marginRight : 20 }}>
					<h3>{ data.number }</h3>
				</div>
				<h4>{ this.description(data) }</h4>
				<div className="status">
					<small>{ this.status(data) }</small>
				</div>
			</div>);

			}
}

ChangeItem.propTypes = {
	data : PropTypes.object.isRequired,
	index : PropTypes.number.isRequired,

	onSelect : PropTypes.func.isRequired
}

ChangeItem.defaultProps = {

}