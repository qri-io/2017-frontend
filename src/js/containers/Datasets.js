import React, { PropTypes } from 'react'
import { connect } from 'react-redux'


class Datasets extends React.Component {
	render() {
		const { handle } = this.props;
		
		return (
			<div className="container">
				<h3>Datasets</h3>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return Object.assign({}, {
		// results : state.entities.results.result,
		// queries : Object.keys(state.entities.queries).map(key => state.entities.queries[key]),
		// datasets : Object.keys(state.entities.datasets).map(key => state.entities.datasets[key]),
		// queryHistory : state.session.history,
		// device : state.device
	}, ownProps)
}

export default connect(mapStateToProps, {})(Datasets)