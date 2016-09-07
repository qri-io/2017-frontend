import React, { PropTypes } from 'react';

export default class EditAddress extends React.Component {


	render() {
		const { name, value, onChange } = this.props;
		return (
			<div className="editAddress">
				<p>{this.props.value}</p>
			</div>
		);
	}
}

EditAddress.propTypes = {
	name : PropTypes.string,
	value : PropTypes.string.isRequired,
	onChange : PropTypes.func.isRequired
}

EditAddress.defaultProps = {
	name : "address"
}