import React from 'react'
import CodeEditor from './CodeEditor'
import ContextPicker from './ContextPicker'

export default class QueryEditor extends React.Component {
	render() {
		const { onRun, onChange, value } = this.props
		return (
			<div class="queryEditor">
				<ContextPicker />
				<CodeEditor value={value} onChange={onChange} mode='pgsql' />
				<button className="btn btn-default" onClick={onRun}>RUN DAT QUERY</button>
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