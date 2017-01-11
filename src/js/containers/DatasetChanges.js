import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { loadDatasetByAddress, loadDatasetChanges } from '../actions/dataset'
import { selectDatasetChanges } from '../selectors/change'
import { selectDatasetByAddress } from '../selectors/dataset'

import DatasetHeader from '../components/DatasetHeader'
import List from '../components/List'
import ChangeItem from '../components/item/ChangeItem'
import Spinner from '../components/Spinner'

class DatasetChanges extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading : !props.dataset };
		[ 'handleSelectItem' ].forEach(m => this[m] = this[m].bind(this));
	}

	componentWillMount() {
		this.props.loadDatasetByAddress(this.props.address);

		if (this.props.dataset) {
			this.props.loadDatasetChanges(this.props.dataset.id);	
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.dataset && !this.props.dataset) {
			this.setState({ loading : false });
			this.props.loadDatasetChanges(nextProps.dataset.id);
		}
	}

	handleSelectItem(index, change) {
		const address = this.props.dataset.address.replace(".", "/", -1)
		const id = change.number ? change.number : change.id
		this.props.push(`/${address}/changes/${id}`)
	}

	render() {
		const { loading } = this.state;
		const { address, dataset, changes } = this.props;

		if (loading) {
			return (
				<div className="container">
					<Spinner />
				</div>
			);
		}

		if (!dataset) {
			return (
				<div className="notFound">
					<h1>Not Found Yo.</h1>
				</div>
			);
		}
		
		return (
			<div id="wrapper">
				<div className="container">
					<DatasetHeader dataset={dataset} />
					<div className="col-md-12">
						<p>CHANGES</p>
						<List data={changes} component={ChangeItem} onSelectItem={this.handleSelectItem} />
					</div>
				</div>
			</div>
		);
	}
}

DatasetChanges.propTypes = {
	address : PropTypes.string.isRequired,

	dataset : PropTypes.object,
	changes : PropTypes.array.isRequired,

	push : PropTypes.func.isRequired,
	loadDatasetByAddress : PropTypes.func.isRequired,
	loadDatasetChanges : PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
	const address = [ ownProps.params.user, ownProps.params.dataset ].join(".")
	const dataset = selectDatasetByAddress(state, address)
	let changes = [];
	if (dataset) {
		changes = selectDatasetChanges(state, dataset.id);
	}

	return Object.assign({
		address,
		dataset,
		changes,
	}, ownProps)
}

export default connect(mapStateToProps, {
	push,
	loadDatasetByAddress,
	loadDatasetChanges
})(DatasetChanges)