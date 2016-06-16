import React from 'react'
import Editor from './Editor'
import ContextPicker from './ContextPicker'

export default class QueryEditor extends React.Component {
	render() {
		const { onRun, onChange, value } = this.props
		return (
			<div class="queryEditor">
				<ContextPicker />
				<Editor value={value} onChange={onChange} mode='pgsql' />
				<button onClick={onRun}>RUN DAT QUERY</button>
			</div>
		);
	}
}

QueryEditor.propTypes = {
	context : React.PropTypes.object,
	value : React.PropTypes.string,
	onRun : React.PropTypes.func.isRequired,
	onChange : React.PropTypes.func.isRequired,
}

QueryEditor.defaultProps = {
	value : "",
}