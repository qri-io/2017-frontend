import React from 'react'
import CodeEditor from './CodeEditor'
import Address from './Address'

import { datasetCompleter } from '../ace/completer/datasets'

export default class QueryEditor extends React.Component {
	render() {
		const { query, onDownload, onRun, onChange } = this.props
		return (
			<div className="queryEditor">
				<small>ADDRESS</small>
				<Address editable={true} value={query.address} onChange={(name, value, e) => onChange({ statement : query.statement, address : value }) } />
				<small>QUERY</small>
				<CodeEditor value={query.statement} onChange={(value) => onChange({ statement : value, address : query.address})} mode='pgsql' completers={[datasetCompleter]} setOptions={{ enableBasicAutocompletion: true, enableLiveAutocompletion : true }} />
				<button className="btn btn-primary" style={{ marginRight : 10 }} onClick={onDownload}>Download</button>
				<button className="btn btn-primary" onClick={onRun}>Run</button>
			</div>
		);
	}
}

QueryEditor.propTypes = {
	query : React.PropTypes.object,
	datasets : React.PropTypes.array,
	
	onRun : React.PropTypes.func.isRequired,
	onDownload : React.PropTypes.func.isRequired,
	onChange : React.PropTypes.func.isRequired,
}

QueryEditor.defaultProps = {
	query : {
		address : "",
		statement : ""
	}
}