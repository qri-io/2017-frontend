import React, { PropTypes } from 'react'

export default class ChangeItem extends React.Component {
	render() {
		const { data } = this.props;
		return (
			<div className="change item">
				<h3>{ data.number }</h3>
				<p>{ data.description }</p>
			</div>
		);
	}
}

ChangeItem.propTypes = {
	data : PropTypes.object.isRequired,
	index : PropTypes.number.isRequired,

	onSelect : PropTypes.func.isRequired
}

ChangeItem.defaultProps = {

}