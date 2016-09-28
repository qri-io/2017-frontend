import React, { PropTypes } from 'react'

import ValidInput from './ValidInput'

// TODO
export default class Address extends React.Component {
	render() {
		const { name, value, onChange } = this.props;

		return (
			<div className="address">
				<ValidInput name={name} value={value} onChange={onChange} />
			</div>
		);
	}
}

Address.propTypes = {
	editable : PropTypes.bool,
	name : PropTypes.string.isRequired,
	value : PropTypes.string.isRequired,
	onChange : PropTypes.func.isRequired,
}

Address.defaultProps = {
	name : "address",
	editable : false
}