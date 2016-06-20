import React from 'react'
import CodeEditor from './CodeEditor'
import ContextPicker from './ContextPicker'

import { datasetCompleter } from '../ace/completer/datasets'

export default class QueryEditor extends React.Component {
	render() {
		const { onRun, onChange, value } = this.props
		return (
			<div class="queryEditor">
				<ContextPicker />
				<CodeEditor value={value} onChange={onChange} mode='pgsql' completers={[datasetCompleter]} setOptions={{ enableBasicAutocompletion: true, enableLiveAutocompletion : true }} />
				<button className="btn btn-default" onClick={onRun}>Run</button>
			</div>
		);
	}
}

QueryEditor.propTypes = {
	value : React.PropTypes.string,
	context : React.PropTypes.object,
	datasets : React.PropTypes.array,
	
	onRun : React.PropTypes.func.isRequired,
	onChange : React.PropTypes.func.isRequired,
}

QueryEditor.defaultProps = {
	value : "",
}