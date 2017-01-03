import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { loadDatasetByAddress } from '../actions/dataset'
import { setQuery, runQuery, downloadQuery } from '../actions/query'

import { selectDatasetByAddress } from '../selectors/dataset'
import { selectSessionUser } from '../selectors/session'
import { selectQueryById } from '../selectors/query'

import DatasetHeader from '../components/DatasetHeader'
import FieldsTable from '../components/FieldsTable'
import QueryEditor from '../components/QueryEditor'
import ResultsTable from '../components/ResultsTable'

class Dataset extends React.Component {
	constructor(props) {
		super(props);

		[
			'handleRunQuery',
			'handleEditorChange',
			'handleEditorAddressChange',
			'handleLoadMoreResults',
			'handleDownloadQuery',
		].forEach(m => this[m] = this[m].bind(this))

		// this.debouncedSetQuery = debounce(props.setQuery, 200)
	}

  componentWillMount() {
    this.props.loadDatasetByAddress(this.props.address, ["schema"])
		// match the address to the current namespce, unless there's already a query
		if (this.props.dataset && this.props.dataset.default_query) {
			this.props.setQuery(this.props.dataset.default_query);
		} else {
	    this.props.setQuery({
	    	address : this.props.address,
	    	statement : ""
	    });
	  }
  }

	componentWillReceiveProps(nextProps) {
		if (nextProps.address != this.props.address) {
	    this.props.loadDatasetByAddress(nextProps.address)
		}

		if (nextProps.dataset && nextProps.dataset.default_query && (!this.props.dataset || !this.props.dataset.default_query)) {
			this.props.setQuery(nextProps.dataset.default_query);
		}
	}

	handleEditorAddressChange(value) {
		this.props.setQueryAddress(value)
	}

	handleEditorChange(value) {
		// this.debouncedSetQuery(value)
		this.props.setQuery(value);
	}

	handleRunQuery(e) {
		this.props.runQuery({ 
			query : this.props.query,
			page : 1,
		});
	}

	handleDownloadQuery() {
		this.props.runQuery({
			query : this.props.query,
			download : true
		});
	}

	handleLoadMoreResults() {
		this.props.runQuery({
			query : this.props.query,
			page : this.props.results.pageCount + 1
		});
	}

	renderEditButtons(props) {
		const { permissions, address } = props;
		let path = "/" + address.replace(".", "/", -1)
		if (permissions.migrate && permissions.change) {
			return (
				<div>
					<Link to={path + "/edit"}><button type="button" className="btn btn-primary" style={{ marginRight : 5 }}>Edit</button></Link>
					<Link to={path + "/migrations/new"}><button type="button" className="btn btn-primary" style={{ marginRight : 5}}>New Migration</button></Link>
					<Link to={path + "/changes/new"}><button type="button" className="btn btn-primary" style={{ marginRight : 5}}>New Change</button></Link>
				</div>
			);
		}

		return undefined
	}

	renderResults(props) {
		const { results } = props;
		if (!results) { return undefined; }
		return (
			<div className="col-md-12">
				<hr />
				<h6>RESULTS</h6>
				<ResultsTable results={results} onLoadMore={this.handleLoadMoreResults} />
			</div>
		);
	}

	render() {
		const { username, datasetName, address, dataset, permissions, query, results } = this.props
		const path = "/" + address.replace(".", "/", -1)
		
		if (!dataset) {
			return (
				<div className="dataset container">
					<p>No Dataset</p>
				</div>
			);
		}

		return (
			<div id="wrapper">
				<div className="container">
					<DatasetHeader dataset={dataset} />
					<div className="col-md-12">
						{this.renderEditButtons(this.props)}
						<p>{ dataset.description }</p>
					</div>
					<div className="col-md-12">
						<QueryEditor query={query} onRun={this.handleRunQuery} onDownload={this.handleDownloadQuery} onChange={this.handleEditorChange} />
						{this.renderResults(this.props)}
						<section className="col-md-12">
							<hr />
							{ dataset.fields ? <FieldsTable fields={dataset.fields} /> : <p>This dataset currently has no schema</p> }
						</section>
					</div>
				</div>
			</div>
		);
	}
}

Dataset.propTypes = {
	// username & datasetName from url params
	username : PropTypes.string.isRequired,
	datasetName : PropTypes.string.isRequired,

	// username.dataset address for this dataset, should
	// be derived from url params
	address : PropTypes.string.isRequired,
	// the dataset model to display
	dataset : PropTypes.object,
	// default query to show if none is present
	default_query : PropTypes.object,
	
	// query for console
	query : PropTypes.object.isRequired,
	// results (if any)
	results : React.PropTypes.object,

	// permissions stuff, will show things based on capabilities
	permissions: PropTypes.object.isRequired,

	// action to load a dataset from passed-in address
	loadDatasetByAddress : PropTypes.func.isRequired,

	setQuery: PropTypes.func.isRequired, 
	runQuery: PropTypes.func.isRequired
}

Dataset.defaultProps = {
	permissions : {
		edit : false,
		migrate : false,
		change : false
	}
}

function mapStateToProps(state, ownProps) {
	const username = ownProps.params.user;
	const datasetName = ownProps.params.dataset;
	let address = "qri"
	if (ownProps.username) {
		address = ["qri", username, ownProps.params.dataset].join(".")
	}
	const user = selectSessionUser(state);

	const results = state.results[state.console.query.statement]

	let permissions = {
		edit : false,
		migrate : false,
		change : false
	};

	if (user && user.username == ownProps.params.user) {
		permissions.migrate = true;
		permissions.change = true;
	}

	return Object.assign({
		username,
		datasetName,
		address,

		dataset : selectDatasetByAddress(state, address),

		results,
		permissions,

	}, state.console, ownProps)
}

export default connect(mapStateToProps, { 
	setQuery, 
	runQuery,
	downloadQuery,

	loadDatasetByAddress
})(Dataset)