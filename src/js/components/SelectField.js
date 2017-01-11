import React, { PropTypes } from 'react';

// TODO - this might be really fucking broken
export default class SelectField extends React.Component {
	render() {
		const { label, name, value, onChange, fields } = this.props;
		return (
			<div className="selectFieldsList form-group">
				{ label ? <label for={name} className="control-label">{label}</label> : undefined }
				<select className="form-control" value={value} onChange={(e) => { onChange(name, e.target.value, e) }}>
					<option value="">-Select Table-</option>
					{
						fields.map((table, i) => {
							return <option key={i} value={table.name}>{table.name}</option>
						})
					}
				</select>
			</div>
		);
	}
}

SelectField.propTypes = {
	fields : PropTypes.array.isRequired,
	name : PropTypes.string.isRequired,
	onChange : PropTypes.func.isRequired,
	value : PropTypes.string,

	label : PropTypes.string,
	showError : PropTypes.bool,
	error : PropTypes.string,
}

SelectField.defaultProps = {
	showError : false
}