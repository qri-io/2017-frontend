import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadDatasetBySlug } from '../actions/dataset'
import { selectDatasetBySlug } from '../selectors/dataset'

import SchemaTable from '../components/SchemaTable'

class NewDataset extends React.Component {
	constructor(props) {
		super(props);
		// [
		// 	'handleRunQuery',
		// ].forEach(m => this[m] = this[m].bind(this))
	}

  componentWillMount() {
    // this.props.loadDatasetBySlug(this.props.handle, this.props.slug)
  }

	componentWillReceiveProps(nextProps) {
		const { handle, slug } = this.props
		if (nextProps.handle != handle || nextProps.slug != slug) {
	    // this.props.loadDatasetBySlug(nextProps.handle, nextProps.slug)
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
						<form className="newDataset">
							<h3>New Dataset</h3>
							<label for="handle">handle</label>
							<input name="handle" type="text" />
							<label for="handle">name</label>
							<input name="name" type="text" />
							<label for="source_url">name</label>
							<input name="source_url" type="text" />
							<label for="handle">description</label>
							<textarea name="description"></textarea>
							<button className="btn btn-large submit"></button>
						</form>
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

NewDataset.propTypes = {
	handle : PropTypes.string.isRequired,
	slug : PropTypes.string.isRequired,
	dataset : PropTypes.object,

	loadDatasetBySlug : PropTypes.func.isRequired,
}

NewDataset.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	return Object.assign({}, {
		dataset : selectDatasetBySlug(state, ownProps.params.handle, ownProps.params.slug)
	}, ownProps.params, ownProps)
}

export default connect(mapStateToProps, { 
	loadDatasetBySlug 
})(NewDataset)