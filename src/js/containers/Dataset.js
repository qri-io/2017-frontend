import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { debounce } from 'lodash'

import { loadDatasetByAddress } from '../actions/dataset'
import { selectDatasetByAddress } from '../selectors/dataset'
import { selectSessionUser } from '../selectors/session'
import { setQuery, runQuery } from '../actions/query'

import SchemaTable from '../components/SchemaTable'
import QueryEditor from '../components/QueryEditor'
import ResultsTable from '../components/ResultsTable'

class Dataset extends React.Component {
	constructor(props) {
		super(props);

		[
			'handleRunQuery',
			'handleEditorChange',
			'handleEditorAddressChange',
		].forEach(m => this[m] = this[m].bind(this))

		this.debouncedSetQuery = debounce(props.setQuery, 200)
	}

  componentWillMount() {
    this.props.loadDatasetByAddress(this.props.address)
		// match the address to the current namespce, unless there's already a query
    this.props.setQuery({
    	address : this.props.address,
    	statement : this.props.query.statement
    });
  }

	componentWillReceiveProps(nextProps) {
		if (nextProps.address != this.props.address) {
	    this.props.loadDatasetByAddress(nextProps.address)
		}
	}

	handleEditorAddressChange(value) {
		this.props.setQueryAddress(value)
	}

	handleEditorChange(value) {
		this.debouncedSetQuery(value)
	}

	handleRunQuery(e) {
		this.props.runQuery(this.props.query);
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
		const { results, query } = props;
		if (!results) { return undefined; }
		return (
			<div className="col-md-12">
				<hr />
				<h6>RESULTS</h6>
				<ResultsTable data={results} query={query} />
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
					<div className="col-md-12">
						<header className="page-header col-md-12">
							<small>DATASET</small>
							<h2>
								<a href={ "/" + username }>{ username }</a>
								<span>.</span>
								<a href={ "/" + username + "/" + datasetName }>{ datasetName }</a>
							</h2>
							<p>
								<span>{ dataset.TableCount || 0 } Tables </span>
								<span>{ dataset.RowCount || 0 } Rows </span>
								{ dataset.sourceUrl ? <span>| <a href={ dataset.sourceUrl } target="_blank">{ dataset.sourceUrl }</a></span> : undefined }
							</p>
							{this.renderEditButtons(this.props)}
							<QueryEditor query={query} onRun={this.handleRunQuery} onChange={this.handleEditorChange} />
							<div>
								<p>{ dataset.description }</p>
							</div>
						</header>
						{this.renderResults(this.props)}
						<section className="col-md-12">
							<hr />
							{ dataset.schema ? <SchemaTable schema={dataset.schema} /> : <p>This dataset currently has no schema</p> }
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
	const address = [username, ownProps.params.dataset].join(".")
	const user = selectSessionUser(state);

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
		results : state.entities.results.result,

		permissions
	}, state.console, ownProps)
}

export default connect(mapStateToProps, { 
	setQuery, 
	runQuery,

	loadDatasetByAddress
})(Dataset)