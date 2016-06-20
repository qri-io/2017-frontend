import React from 'react'

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
					{labels.map((label,i) => <span className={headerClassName(i, index)} key={i} onClick={panelTrigger(i, this.props.onSelectPanel)}>{label}</span>)}
				</header>
				<section>
					{component}
				</section>
			</div>
		);
	}
}

TabPanel.propTypes = {
	labels : React.PropTypes.array.isRequired,
	components : React.PropTypes.array.isRequired,
	index : React.PropTypes.number.isRequired,
	onSelectPanel : React.PropTypes.func.isRequired,
}