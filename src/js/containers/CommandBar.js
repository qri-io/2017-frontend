import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import { toggleMenu } from '../actions/app';
import { runCommand } from '../actions/commands';
import { runQuery } from '../actions/query';

class CommandBar extends React.Component  {
	constructor(props) {
		super(props);

		this.state = {
			value : ""
		};

		[
			'handleInputChange',
			'handleKeyUp',
			'handleMenuToggle',
			'handleExecute'
		].forEach(m => this[m] = this[m].bind(this))
	}

	handleMenuToggle(e) {
    e.stopPropagation();
    this.props.toggleMenu();
  }

	handleInputChange(e) {
		this.setState({ value : e.target.value });
	}

	handleKeyUp(e) {

	}

	handleExecute(e) {
		this.props.runQuery({ query: { syntax: "sql", statement: this.state.value }});
	}

	render() {
		const { value } = this.state;
		const { layout } = this.props;

		return (
			<div id="commandBar" style={Object.assign({
				position : "fixed"
			}, layout.commandbar)}>
				<a className="menu" onClick={this.handleMenuToggle}></a>
				<input
					className="commandLine"
					type="text"
					onChange={this.handleInputChange} 
					onKeyUp={this.handleKeyup}
					value={value} />
				<a className="go" onClick={this.handleExecute}></a>
			</div>
		)
	}
}

CommandBar.PropTypes = {
	user : React.PropTypes.oneOfType([
		React.PropTypes.object, 
		React.PropTypes.null]),

	onToggleMenu : PropTypes.func.isRequired,
	layout : PropTypes.layout
}

CommandBar.DefaultProps = {

}

function mapStateToProps(state, ownProps) {

	return {
		layout : state.layout
	}
}

export default connect(mapStateToProps, {
	toggleMenu,
	runCommand,
	runQuery,
})(CommandBar)