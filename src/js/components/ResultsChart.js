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

export default class ResultsChart extends React.Component {
	render() {
		const { results, title, width, height, margins, options, onOptionsChange } = this.props
		
		if (!results) {
			return (
				<div>
					<h4>No Results to Display</h4>	
				</div>
			);
		}

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
	onOptionsChange : React.PropTypes.func.isRequired
}

ResultsChart.defaultProps = {
	margins: { left: 80, right: 80, top: 40, bottom: 40 },
	title: "results",
	width: 600,
	height: 400
}