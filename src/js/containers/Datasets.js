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
		this.state = { loading : !props.datasets.length };
		[ 'handleSelectItem' ].forEach(m => this[m] = this[m].bind(this));
	}

	componentWillMount() {
		this.props.loadDatasets("", 1);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.datasets.length && !this.props.datasets.length) {
			this.setState({ loading : false });
			// this.props.loadDatasetMigrations(nextProps.dataset.id);
			this.props.loadDatasets("", 1);
		}
	}

	handleSelectItem(index, dataset) {
		this.props.push("/" + dataset.address.replace(".", "/", -1))
	}


	render() {
		const { loading } = this.state;
		const { datasets } = this.props;

		if (this.state.loading) {
			return (
				<div className="container">
					<Spinner />
				</div>
			);
		}
		
		return (
			<div className="container">
				<h3>Datasets</h3>
				<List data={datasets} component={DatasetItem} onSelectItem={this.handleSelectItem} />
			</div>
		);
	}
}

Datasets.propTypes = {
	loading : PropTypes.bool,
	datasets : PropTypes.array.isRequired,

	push : PropTypes.func.isRequired,
	loadDatasets : PropTypes.func.isRequired
}

Datasets.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	return Object.assign({
		datasets : selectAllDatasets(state)
	}, ownProps)
}

export default connect(mapStateToProps, {
	push,
	loadDatasets
})(Datasets)