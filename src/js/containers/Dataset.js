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
		].forEach(m => this[m] = this[m].bind(this))

		this.debouncedSetQuery = debounce(props.setQuery, 200)
	}

  componentWillMount() {
    this.props.loadDatasetByAddress(this.props.address)
  }

	componentWillReceiveProps(nextProps) {
		if (nextProps.address != this.props.address) {
	    this.props.loadDatasetByAddress(nextProps.address)
		}
	}

	handleRunQuery(e) {
		this.props.runQuery({
			query : {
				namespace: this.props.namespace,
				statement : this.props.query
			},
			page : 1, 
			pageSize : 50
		});
	}

	handleEditorChange(value) {
		this.debouncedSetQuery(value)
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
		const { address, dataset, permissions, query, results } = this.props
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
								<a href={ "/" + dataset.address.replace(".", "/", -1) }>{ dataset.address }</a>
							</h2>
							<p>
								<span>{ dataset.TableCount || 0 } Tables </span>
								<span>{ dataset.RowCount || 0 } Rows </span>
								{ dataset.sourceUrl ? <span>| <a href={ dataset.sourceUrl } target="_blank">{ dataset.sourceUrl }</a></span> : undefined }
							</p>
							{this.renderEditButtons(this.props)}
							<QueryEditor value={query} onRun={this.handleRunQuery} onChange={this.handleEditorChange} />
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
	// username.dataset address for this dataset, should
	// be derived from url params
	address : PropTypes.string.isRequired,
	// the dataset model to display
	dataset : PropTypes.object,
	
	// query namespace to operate in
	namespace : PropTypes.string.isRequired,
	// query for console
	query : PropTypes.string.isRequired,
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
	const address = [ownProps.params.user, ownProps.params.dataset].join(".")
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