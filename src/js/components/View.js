import React, { PropTypes } from 'react';

import ResultsChart from './ResultsChart';

export default class View extends React.Component {
	render() {
		const { data, results, device } = this.props;
		
		if (!data || !data.type) {
			return undefined;
		}

		switch (data.type) {
			case "lineChart":
				return <ResultsChart results={results} options={data.attributes} device={device} />
			default:
				return <div>unrecognized view type: {data.type}</div>
		}
	}
}

View.propTypes = {
	device : PropTypes.object.isRequired,
	results : PropTypes.object,
	data : PropTypes.object.isRequired,
}

View.defaultProps = {
	
}