import React from 'react'

import { LineChart } from 'rd3';

import ChartOptionsPicker from './ChartOptionsPicker'

function transformResults(schema=[], results=[], xIndex, yIndex) {
	return [{ name : "results", values : results.map((row) => ({
			x : row[xIndex] || 0,
			y : row[yIndex] || 0,
	}))}];
}

function x(row){ return row.x; }

function chartDimensions(size) {
	let width = 300, height = 400;
	switch(size) {
		case 'xs':
			width = 300;
			break;
		case 'sm':
			width = 450;
			break;
		case 'md':
			width = 600;
			break;
		case 'lg':
			width = 900;
			height = 400;
			break;
		case 'xl':
			width = 1100;
			height = 500;
			break;
	}

	return { width, height }
}

export default class ResultsChart extends React.Component {
	render() {
		const { results, title, margins, options, onOptionsChange, device } = this.props
		
		if (!results) {
			return (
				<div>
					<h4>No Results to Display</h4>	
				</div>
			);
		}

		const { width, height } = chartDimensions(device.size);
		const data = transformResults(results.schema, results.data, options.xIndex, options.yIndex)



		return (
			<div className="resultsChart">
				<ChartOptionsPicker schema={results.schema} options={options} onChange={onOptionsChange} />
				<LineChart 
					title={title}
					data={data}
					width={width}
					height={height}
					margins={margins}
					axesColor="#A1B2BC" />
	    </div>
		);
	}
}

ResultsChart.propTypes = {
	options : React.PropTypes.object,
	onOptionsChange : React.PropTypes.func.isRequired,
	size : React.PropTypes.string
}

ResultsChart.defaultProps = {
	margins: { left: 80, right: 80, top: 40, bottom: 40 },
	title: "results",
}