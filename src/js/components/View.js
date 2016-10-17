import React, { PropTypes } from 'react';

import ResultsChart from './ResultsChart';
import BarChartView from './views/BarChartView';
import LineChartView from './views/LineChartView';
import ValueListView from './views/ValueListView';

export default class View extends React.Component {
	render() {
		const { view, results, device } = this.props;
		
		if (!view || !view.type) {
			return null;
		}

		switch (view.type) {
			case "bar_chart":
				return <BarChartView {...this.props} />
			case "column_chart":
				return <BarChartView {...this.props} />
			case "value_list":
				return <ValueListView {...this.props} />
			case "line_chart":
				return <LineChartView results={results} options={view.attributes} device={device} />
			default:
				return <div>unrecognized view type: {view.type}</div>
		}
	}
}

View.propTypes = {
	device : PropTypes.object.isRequired,
	results : PropTypes.object,
	view : PropTypes.object.isRequired,
}

View.defaultProps = {
	
}