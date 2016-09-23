import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { loadDatasetByAddress } from '../actions/dataset'
import { selectDatasetByAddress } from '../selectors/dataset'
import { selectSessionUser } from '../selectors/session'

import SchemaTable from '../components/SchemaTable'

class Dataset extends React.Component {
	constructor(props) {
		super(props);
		// [
		// 	'handleRunQuery',
		// ].forEach(m => this[m] = this[m].bind(this))
	}

  componentWillMount() {
    this.props.loadDatasetByAddress(this.props.address)
  }

	componentWillReceiveProps(nextProps) {
		if (nextProps.address != this.props.address) {
	    this.props.loadDatasetByAddress(nextProps.address)
		}
	}

	editButtons(props) {
		const { permissions, address } = props;
		let path = "/" + address.replace(".", "/", -1)
		if (permissions.migrate && permissions.change) {
			return (
				<div>
					<Link to={path + "/edit"}><button className="btn btn-large">Edit</button></Link>
					<Link to={path + "/migrations/new"}><button className="btn btn-large">New Migration</button></Link>
					<Link to={path + "/changes/new"}><button className="btn btn-large">New Change</button></Link>
				</div>
			);
		}

		return undefined
	}

	render() {
		const { address, dataset, permissions } = this.props
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
				<div class="container">
					<div class="col-md-12">
						<header class="page-header col-md-12">
							<h2>
								<a href={ "/" + dataset.address.replace(".", "/", -1) }>{ dataset.address }</a>
							</h2>
							<p>
								<span>{ dataset.TableCount } Tables</span>
								<span>{ dataset.RowCount } Rows</span> |
								<span><a href={ dataset.sourceUrl } target="_blank">{ dataset.sourceUrl }</a></span>
							</p>
							{this.editButtons(this.props)}
							<div>
								<p>{ dataset.description }</p>
							</div>
						</header>
						<section class="col-md-12">
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

	// permissions stuff, will show things based on capabilities
	permissions: PropTypes.object.isRequired,

	// action to load a dataset from passed-in address
	loadDatasetByAddress : PropTypes.func.isRequired
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
		permissions
	}, ownProps)
}

export default connect(mapStateToProps, { 
	loadDatasetByAddress 
})(Dataset)