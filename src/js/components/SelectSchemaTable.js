import React, { PropTypes } from 'react';

export default class SelectSchemaTable extends React.Component {
	render() {
		const { label, name, value, onChange, schema } = this.props;
		return (
			<div className="selectSchemaTable">
				{ label ? <label>{label}</label> : undefined }
				<select value={value} onChange={(e) => { onChange(name, e.target.value, e) }}>
					<option value="">-Select Table-</option>
					{
						schema.map((table, i) => {
							return <option key={i} value={table.name}>{table.name}</option>
						})
					}
				</select>
			</div>
		);
	}
}

SelectSchemaTable.propTypes = {
	schema : PropTypes.array.isRequired,
	name : PropTypes.string.isRequired,
	onChange : PropTypes.func.isRequired,
	value : PropTypes.string,

	label : PropTypes.string,
	showError : PropTypes.bool,
	error : PropTypes.string,
}

SelectSchemaTable.defaultProps = {
	showError : false
}