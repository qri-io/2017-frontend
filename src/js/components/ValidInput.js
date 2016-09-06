import React, { PropTypes } from 'react';

export default class ValidInput extends React.Component {
	render() {
		const { props } = this

		return (
			<div className="validFormField">
				{props.label ? <label for={props.name}>{props.label}</label> : undefined }

				<input 
					name={props.name} 
					type={props.type}
					value={props.value} 
					placeholder={props.placeholder} 
					onChange={(e) => { props.onChange(props.name, e.target.value, e) }} />

				{(props.error != "" && props.showError) ? <div className="error">{props.error}</div> : undefined}
			</div>
		);
	}
}

ValidInput.propTypes = {
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
	// an error message to displacy
	error : PropTypes.string,
	// weather or not to actually display any passed-in errors
	showError : PropTypes.bool,
	// change handler func. will be called with (name, value, event)
	onChange : PropTypes.func.isRequired
}

ValidInput.defaultProps = {
	name : undefined,
	type : "text",
	error : undefined,
	showError: true,
	placeholder : "",
}