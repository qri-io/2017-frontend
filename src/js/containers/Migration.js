import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { loadMigrationByNumber, executeMigration, declineMigration } from '../actions/migration'
import { selectMigrationByNumber } from '../selectors/migration'

import Spinner from '../components/Spinner'

class Migration extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading : !props.migration };
		[ "handleExecute", "handleDecline" ].forEach(m => this[m] = this[m].bind(this))
	}

	componentWillMount() {
		this.props.loadMigrationByNumber(this.props.address, this.props.number);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.address != this.props.address || nextProps.number != this.props.number) {
			this.props.loadMigrationByNumber(nextProps.address, nextProps.number);
			this.setState({ loading : true });
		} else if (nextProps.migration && this.state.loading) {
			this.setState({ loading : false });
		}
	}

	handleExecute() {
		if (confirm("are you sure you want to execute this migration?")) {
			this.props.executeMigration(this.props.migration);
		}
	}

	handleDecline() {
		if (confirm("are you sure you want to decline this migration")) {
			this.props.declineMigration(this.props.migration);
		}
	}

	render() {
		const { loading } = this.state;
		const { address, number, migration } = this.props;

		if (loading) {
			return (
				<div className="spinner">
					<Spinner />
				</div>
			);
		}

		if (!migration) {
			return (
				<div className="notFound">
					<h1>Not Found</h1>
				</div>
			);
		}

		return (
			<div className="migration container">
				<h1>Migration</h1>
				<h1>{migration.number || migration.id}</h1>
				<h3>{migration.description}</h3>
			</div>
		);
	}
}

Migration.propTypes = {
	address : PropTypes.string.isRequired,
	number : PropTypes.string.isRequired,

	migration : PropTypes.object,

	loadMigrationByNumber : PropTypes.func.isRequired,
	executeMigration : PropTypes.func.isRequired,
	declineMigration : PropTypes.func.isRequired,
}

Migration.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	const { number, user, dataset } = ownProps.params
	const address = [ user, dataset ].join(".")
	return Object.assign({
		address,
		number,
		migration : selectMigrationByNumber(state, address, number)
	}, ownProps);
}

export default connect(mapStateToProps, {
	loadMigrationByNumber,
	executeMigration,
	declineMigration
})(Migration);