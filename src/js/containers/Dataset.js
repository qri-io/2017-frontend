import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { loadDatasetByAddress } from '../actions/dataset'
import { selectDatasetByAddress } from '../selectors/dataset'

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

	render() {
		const { address, dataset } = this.props
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
								<Link to={`${path}/edit`}>Edit</Link>
								<span>{ dataset.TableCount } Tables</span>
								<span>{ dataset.RowCount } Rows</span> |
								<span><a href={ dataset.sourceUrl } target="_blank">{ dataset.sourceUrl }</a></span>
							</p>
							{/*
								<p><a href="{{ dataset.Path}}/edit">Edit</a></p>
							*/}
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
	// action to load a dataset from passed-in address
	loadDatasetByAddress : PropTypes.func.isRequired
}

Dataset.defaultProps = {

}


function mapStateToProps(state, ownProps) {
	const address = [ownProps.params.user, ownProps.params.dataset].join(".")
	return Object.assign({
		address,
		dataset : selectDatasetByAddress(state, address)
	}, ownProps)
}

export default connect(mapStateToProps, { 
	loadDatasetByAddress 
})(Dataset)