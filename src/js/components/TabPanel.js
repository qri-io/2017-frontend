import React, { PropTypes } from 'react'

function panelTrigger(i, fn) {
	return function () {
		fn(i);
	}
}

function headerClassName(i,index) {
	return (i == index) ? "current tab" : "tab";
}

export default class TabPanel extends React.Component {
	render() {
		const { index, labels=[], onClickPanel } = this.props;
		const component = this.props.components[index];
		return (
			<div className="tabPanel">
				<header>
					{labels.map((label,i) => <a className={headerClassName(i, index)} key={i} onClick={panelTrigger(i, this.props.onSelectPanel)}>{label}</a>)}
				</header>
				<section>
					{component}
				</section>
			</div>
		);
	}
}

TabPanel.propTypes = {
	labels : PropTypes.array.isRequired,
	components : PropTypes.array.isRequired,
	index : PropTypes.number.isRequired,
	onSelectPanel : PropTypes.func.isRequired,
}