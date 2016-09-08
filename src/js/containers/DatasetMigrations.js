import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { loadDatasetByAddress, loadDatasetMigrations } from '../actions/dataset'
import { selectDatasetMigrations } from '../selectors/migration'
import { selectDatasetByAddress } from '../selectors/dataset'

import List from '../components/List'
import MigrationItem from '../components/MigrationItem'
import Spinner from '../components/Spinner'

class DatasetMigrations extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading : !!props.dataset };
		[ 'handleSelectItem' ].forEach(m => this[m] = this[m].bind(this));
	}

	componentWillMount() {
		this.props.loadDatasetByAddress(this.props.address);

		if (this.props.dataset) {
			this.props.loadDatasetMigrations(this.props.dataset.id);	
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.dataset && !this.props.dataset) {
			this.setState({ loading : false });
			this.props.loadDatasetMigrations(nextProps.dataset.id);
		}
	}

	handleSelectItem(index, migration) {
		const address = this.props.dataset.address.replace(".", "/", -1)
		const id = migration.number ? migration.number : migration.id
		this.props.push(`/${address}/migrations/${id}`)
	}

	render() {
		const { loading } = this.state;
		const { address, dataset, migrations } = this.props;

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
			<div className="container">
				<h2>{dataset.name} migrations</h2>
				<hr />
				<List data={migrations} component={MigrationItem} onSelectItem={this.handleSelectItem} />
			</div>
		);
	}
}

DatasetMigrations.propTypes = {
	address : PropTypes.string.isRequired,

	dataset : PropTypes.object,
	migrations : PropTypes.array.isRequired,

	push : PropTypes.func.isRequired,
	loadDatasetByAddress : PropTypes.func.isRequired,
	loadDatasetMigrations : PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
	const address = [ ownProps.params.user, ownProps.params.dataset ].join(".")
	const dataset = selectDatasetByAddress(state, address)
	let migrations = [];
	
	if (dataset) {
		migrations = selectDatasetMigrations(state, dataset.id);
	}

	return Object.assign({
		address,
		dataset,
		migrations,
	}, ownProps)
}

export default connect(mapStateToProps, {
	push,
	loadDatasetByAddress,
	loadDatasetMigrations
})(DatasetMigrations)