import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { toConsoleQuery, loadQueryPage } from '../actions/query'
import { selectAllQueries } from '../selectors/query'

import List from '../components/List'
import QueryItem from '../components/item/QueryItem'
import Spinner from '../components/Spinner'

class Queries extends React.Component {
	constructor(props) {
		super(props);

		[ 'handleSelectItem' ].forEach(m => this[m] = this[m].bind(this));
	}

	componentWillMount() {
		this.props.loadQueryPage(this.props.nextPage);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.queries.length && !this.props.queries.length) {
			// this.props.loadQueryMigrations(nextProps.query.id);
			this.props.loadQueryPage(this.props.nextPage);
		}
	}

	handleSelectItem(index, query) {
		// this.props.push("/" + query.address.replace(".", "/", -1))
		// console.log(index, query);
		this.props.toConsoleQuery(query);
	}

	render() {
		const { queries, loading } = this.props;
		
		return (
			<div className="container">
				<header className="col-md-12">
					<h3>QUERIES</h3>
					<p>Saved <pre>select</pre>'s against qri datasets</p>
				</header>
				<div className="col-md-12">
					<List data={queries} component={QueryItem} onSelectItem={this.handleSelectItem} />
					{ loading ? <Spinner /> : undefined }
				</div>
			</div>
		);
	}
}

Queries.propTypes = {
	queries : PropTypes.array.isRequired,
	
	nextPage : PropTypes.number.isRequired,
	loading : PropTypes.bool.isRequired,

	push : PropTypes.func.isRequired,
	loadQueryPage : PropTypes.func.isRequired,
	toConsoleQuery : PropTypes.func.isRequired,
}

Queries.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	const pagination = state.pagination.popularQueries;
	
	return Object.assign({
		loading : (pagination.popularQueries) ? pagination.popularQueries.isFetching : false,
		nextPage : (pagination.popularQueries) ? (pagination.popularQueries.pageCount + 1) : 1,
		queries : selectAllQueries(state)
	}, ownProps)
}

export default connect(mapStateToProps, {
	push,
	loadQueryPage,
	toConsoleQuery
})(Queries)