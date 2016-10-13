import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectQueryBySlug } from '../selectors/query'
import { loadQueryBySlug, runQuery } from '../actions/query'

import Spinner from '../components/Spinner';
import View from '../components/View';

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
			<section>
				{query.views.map((view,i) => {
					return <View key={i} data={view} results={results} device={device} />
				})}
			</section>
		);
	}
	render() {
		const { query, results, device } = this.props;

		if (this.state.loading) {
			return <Spinner />
		}

		return (
			<div className="wrapper container">
				<header>
					<h1>{query.name}</h1>
					<p>{query.description}</p>
					<p>{query.statement}</p>
					<button className="btn btn-primary" onClick={this.handleRunQuery}>Run</button>
				</header>
				{this.renderViews()}
			</div>
		);
	}
}

Query.propTypes = {
	query : PropTypes.object,
	results : PropTypes.object,
	device : PropTypes.object.isRequired,

	loadQueryBySlug : PropTypes.func.isRequired,
}

Query.defaultProps = {
	
}

function mapStateToProps (state, ownProps) {
	const query = selectQueryBySlug(state, ownProps.params.slug);
	let results;

	if (query) {
		results = state.results[query.statement];
	}

	return {
		query,
		results,

		slug : ownProps.params.slug,
		device : state.device,
	}
}

export default connect(mapStateToProps,{
	runQuery,
	loadQueryBySlug
})(Query);