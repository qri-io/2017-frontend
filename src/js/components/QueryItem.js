import React from 'react'

export default class QueryItem extends React.Component {
	render() {
		const { data, onSelect } = this.props
		return (
			<div className="queryItem" onClick={onSelect}>
				<p>{data.name || data.statement}</p>
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