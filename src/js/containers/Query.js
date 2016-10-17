import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import { selectQueryBySlug } from '../selectors/query'
import { selectUserById } from '../selectors/user'
import { loadQueryBySlug, runQuery } from '../actions/query'

import SqlCode from '../components/SqlCode';
import Spinner from '../components/Spinner';
import View from '../components/View';
import ValueListView from '../components/views/ValueListView';

const vlView = {
	name : "",
	series : [
		{ name : "average brand founding year", funcs : [["avg_value", "year"], ["round"]]},
		{ name : "total number of brands", funcs : [["sum_rows"]]},
	]
}

export default class Query extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading : !props.query,
		};

		[ 
			'handleRunQuery'
		].forEach(m => this[m] = this[m].bind(this));
	}

	componentWillMount(props) {
		this.props.loadQueryBySlug(this.props.slug);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.query && this.state.loading) {
			this.setState({ loading : false });
		}
	}

	handleRunQuery() {
		this.props.runQuery({ 
			query : this.props.query, 
			page : 1
		});
	}

	renderViews(props) {
		const { query, results, device } = this.props;
		if (!query.views) { return undefined; }
		return (
			<section className="row">
				{query.views.map((view,i) => {
					return <View key={i} view={view} results={results} device={device} />
				})}
				<ValueListView view={vlView} results={results} device={device} />
			</section>
		);
	}
	render() {
		const { query, results, device, owner } = this.props;

		if (this.state.loading) {
			return <Spinner />
		}

		return (
			<div className="query wrapper container">
				<header className="row">
					<div className="col-md-10 offset-md-1">
						<h1 className="title">{query.name}</h1>
						<div className="infoBar">
							<div className="item">
								<small>Written By:</small>
								<Link to={`/${owner.username}`} ><h5>{owner.username}</h5></Link>
							</div>
							<div className="item">
								<small>Address:</small>
								<Link to={"/" + query.address.replace(".", "/")}><h5>{query.address}</h5></Link>
							</div>
							<div className="item">
								<small>Tables Referenced:</small>
								<h5>1</h5>
							</div>
						</div>
						<SqlCode title="Statement" namespace={query.namespace} statement={query.statement} slug={query.slug} />
						<p className="description">{query.description}</p>
					</div>
				</header>
				{this.renderViews()}
				<footer className="col-md-10 offset-md-1">
				{ query.views ? <button className="run btn btn-circle btn-xl" onClick={this.handleRunQuery}>RUN</button> : undefined }
				</footer>
			</div>
		);
	}
}

Query.propTypes = {
	query : PropTypes.object,
	owner : PropTypes.object,
	results : PropTypes.object,
	device : PropTypes.object.isRequired,

	loadQueryBySlug : PropTypes.func.isRequired,
}

Query.defaultProps = {
	
}

function mapStateToProps (state, ownProps) {
	const query = selectQueryBySlug(state, ownProps.params.slug);
	let results, owner;

	if (query) {
		owner = selectUserById(state, query.owner);
		results = state.results[query.statement];
	}

	return {
		query,
		owner,
		results,

		slug : ownProps.params.slug,
		device : state.device,
	}
}

export default connect(mapStateToProps,{
	runQuery,
	loadQueryBySlug
})(Query);