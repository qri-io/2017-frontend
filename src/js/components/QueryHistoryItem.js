import React from 'react'

export default class QueryHistoryItem extends React.Component {
	render() {
		const { data, onSelect } = this.props
		return (
			<div className="queryHistoryItem" onClick={onSelect}>
				<p>{data.query.statement}</p>
			</div>
		);
	}
}

QueryHistoryItem.propTypes = {
	data : React.PropTypes.object.isRequired,
	onSelect : React.PropTypes.func.isRequired
}

QueryHistoryItem.defaultProps = {
	
}