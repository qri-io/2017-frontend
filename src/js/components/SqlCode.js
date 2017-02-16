import React, { PropTypes } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Link } from 'react-router';

import sql from 'highlight.js/lib/languages/sql';
import qri from '../highlight/qri'
import lowlight from 'lowlight/lib/core';
lowlight.registerLanguage('sql', sql);

export default class SqlCode extends React.Component {
	render() {
		return (
			<div className="sqlCode">
				<small>{this.props.title || "query"}</small>
				<small className="load"><Link to={`/console?slug=${this.props.slug}`}>load in console</Link></small>
			  <SyntaxHighlighter language='sql' style={qri}>{this.props.statement}</SyntaxHighlighter>
			</div>
		);
	}
}

SqlCode.propTypes = {
	title : PropTypes.string,
	statement : PropTypes.string.isRequired,
	slug : PropTypes.string.isRequired
}

SqlCode.defaultProps = {
	
}