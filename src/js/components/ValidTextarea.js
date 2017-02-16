import React, { PropTypes } from 'react';

export default class ValidTextarea extends React.Component {
	render() {
		const { label, name, type, showError, error, value, placeholder, onChange } = this.props

		return (
			<div className={ (error && showError) ? "validFormField form-group has-error" : "validFormField form-group" }>
				{label ? <label for={name}>{label}</label> : undefined }
				<textarea
					id={name}
					name={name} 
					type={type} 
					className="form-control"
					value={value}
					placeholder={placeholder} 
					onChange={(e) => { onChange(name, e.target.value, e)} } />
				{(error != "" && showError) ? <div className="control-label">{error}</div> : undefined }
			</div>
		);
	}
}

ValidTextarea.propTypes = {
	// required name for the field
	name : PropTypes.string.isRequired,
	// if provided it'll create a label element to accompany the field
	label : PropTypes.string,
	// the type of input, default "text"
	type : PropTypes.string.isRequired,
	// value to display in the field
	value : PropTypes.string.isRequired,
	// placeholder text for an empty field. default: ""
	placeholder : PropTypes.string,
	// an error message to display
	error : PropTypes.string,
	// weather or not to actually display any passed-in errors
	showError : PropTypes.bool,
	// change handler func. will be called with (name, value, event)
	onChange : PropTypes.func.isRequired
}

ValidTextarea.defaultProps = {
	name : undefined,
	type : "text",
	error : undefined,
	showError: true,
	placeholder : "",
}