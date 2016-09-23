import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { loadDatasets } from '../actions/dataset'
import { selectAllDatasets } from '../selectors/dataset'

import List from '../components/List'
import DatasetItem from '../components/DatasetItem'
import Spinner from '../components/Spinner'

class Datasets extends React.Component {
	constructor(props) {
		super(props);

		[ 'handleSelectItem' ].forEach(m => this[m] = this[m].bind(this));
	}

	componentWillMount() {
		this.props.loadDatasets(this.props.nextPage);
	}

	componentWillReceiveProps(nextProps) {
		// if (nextProps.datasets.length && !this.props.datasets.length) {
		// 	this.props.loadDatasets(this.props.nextPage);
		// }
	}

	handleSelectItem(index, dataset) {
		this.props.push("/" + dataset.address.replace(".", "/", -1))
	}


	render() {
		const { datasets, loading } = this.props;

		return (
			<div className="container">
				<h3>Datasets</h3>
				<List data={datasets} component={DatasetItem} onSelectItem={this.handleSelectItem} />
				{ loading ? <Spinner /> : undefined }
			</div>
		);
	}
}

Datasets.propTypes = {
	datasets : PropTypes.array.isRequired,

	nextPage : PropTypes.number.isRequired,
	loading : PropTypes.bool,

	push : PropTypes.func.isRequired,
	loadDatasets : PropTypes.func.isRequired
}

Datasets.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	const pagination = state.pagination.popularDatasets;

	return Object.assign({
		loading : (pagination.popularDatasets) ? pagination.popularDatasets.isFetching : false,
		nextPage : (pagination.popularDatasets) ? (pagination.popularDatasets.pageCount + 1) : 1,
		datasets : selectAllDatasets(state)
	}, ownProps)
}

export default connect(mapStateToProps, {
	push,
	loadDatasets
})(Datasets)