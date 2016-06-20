import React from 'react'

function selectFunc(fn, data, i) {
	return () => {
		fn(i, data)
	}
}

export default class List extends React.Component {
	render() {
		const { data, onSelectItem } = this.props
		return (
			<div className="list">
				{data.map((data, i) => <this.props.component data={data} key={i} index={i} onSelect={selectFunc(onSelectItem, data, i)} />)}
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
