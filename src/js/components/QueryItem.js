import React from 'react'

export default class QueryItem extends React.Component {
	render() {
		const { data, onSelect } = this.props
		return (
			<div className="queryItem" onClick={onSelect}>
				<hr />
				<h5 className="title">{data.headline || data.name || "unnamed query"}</h5>
				<small>{data.statement}</small>
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