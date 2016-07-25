import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadDatasetBySlug } from '../actions/dataset'
import { selectDatasetBySlug } from '../selectors/dataset'

import SchemaTable from '../components/SchemaTable'

class Dataset extends React.Component {
	constructor(props) {
		super(props);
		// [
		// 	'handleRunQuery',
		// ].forEach(m => this[m] = this[m].bind(this))
	}

  componentWillMount() {
    this.props.loadDatasetBySlug(this.props.handle, this.props.slug)
  }

	componentWillReceiveProps(nextProps) {
		const { handle, slug } = this.props
		if (nextProps.handle != handle || nextProps.slug != slug) {
	    this.props.loadDatasetBySlug(nextProps.handle, nextProps.slug)
		}
	}

	render() {
		const { handle, slug, dataset } = this.props
		
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
							<h4>
								<a href={`/${dataset.ownerHandle}`}>{ dataset.ownerHandle }</a>
								<span class="slash">/</span>
								<a href={ dataset.path }>{ dataset.slug }</a>
							</h4>
							<h1>{ dataset.name }</h1>
							<p>
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
	handle : PropTypes.string.isRequired,
	slug : PropTypes.string.isRequired,
	dataset : PropTypes.object,

	loadDatasetBySlug : PropTypes.func.isRequired,
}

Dataset.defaultProps = {

}


function mapStateToProps(state, ownProps) {
	return Object.assign({}, {
		dataset : selectDatasetBySlug(state, ownProps.params.handle, ownProps.params.slug)
	}, ownProps.params, ownProps)
}

export default connect(mapStateToProps, { 
	loadDatasetBySlug 
})(Dataset)