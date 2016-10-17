import React, { PropTypes } from 'react';

import selectViewData from '../../selectors/viewData';

export default class ValueListView extends React.Component {
	render() {
		const { view, results, device } = this.props;
		if (!results || !results.data.length) {
			return null;
		}

		const data = selectViewData(view, results);
		return (
			<div className="value list view col-md-10 offset-md-1">
				{view.name ? <h3 className="col-md-12">{view.name}</h3> : undefined }
				{view.series.map((series, i) => {
					return (
						<div className="item col-md-3" key={i}>
							<h2 className="value"><b>{data[0][series.name]}</b></h2>
							<p className="key">{series.name}</p>
						</div>
					);
				})}
			</div>
		);
	}
}

ValueListView.propTypes = {
	device : PropTypes.object.isRequired,
	results : PropTypes.object,
	view : PropTypes.object.isRequired
}

ValueListView.defaultProps = {
	
}