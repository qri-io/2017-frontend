import React from 'react'

export default class List extends React.Component {
	render() {
		const { data, component, onSelectItem } = this.props
		return (
			<div className="list">
				{data.map((data, i) => <component data={data} key={i} index={i} onSelect={onSelectItem} />)}
			</div>
		);
	}
}

List.propTypes = {
	data : React.PropTypes.array,
	component : React.PropTypes.func.isRequired,
	onSelectItem : React.PropTypes.func
}

List.defaultProps = {
	data : []
}
