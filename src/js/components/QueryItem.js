import React from 'react'

export default class QueryItem extends React.Component {
	render() {
		const { data, onSelect } = this.props
		return (
			<div className="queryItem" onClick={onSelect}>
				<h5 className="title">{data.name || data.statement}</h5>
			</div>
		);
	}
}

QueryItem.propTypes = {
	data : React.PropTypes.object.isRequired,
	onSelect : React.PropTypes.func.isRequired
}

QueryItem.defaultProps = {
	
}