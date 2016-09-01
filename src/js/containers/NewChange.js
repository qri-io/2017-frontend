import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadChangeByNumber } from '../actions/change'
import { selectChangeByNumber } from '../selectors/change'

import SchemaTable from '../components/SchemaTable'

class NewChange extends React.Component {
	constructor(props) {
		super(props);
		// [
		// 	'handleRunQuery',
		// ].forEach(m => this[m] = this[m].bind(this))
	}

  componentWillMount() {
    this.props.loadChangeByNumber(this.props.handle, this.props.slug)
  }

	componentWillReceiveProps(nextProps) {
		const { handle, slug } = this.props
		if (nextProps.handle != handle || nextProps.slug != slug) {
	    this.props.loadChangeByNumber(nextProps.handle, nextProps.slug)
		}
	}

	render() {
		const { handle, slug, dataset } = this.props
		
		if (!dataset) {
			return (
				<div className="dataset container">
					<p>No Change</p>
				</div>
			);
		}

		return (
			<div id="wrapper">
				<div class="container">
					<div class="col-md-12">
						<form className="newChange">
							<h3>New Change</h3>
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

NewChange.propTypes = {
	handle : PropTypes.string.isRequired,
	slug : PropTypes.string.isRequired,
	dataset : PropTypes.object,

	loadChangeByNumber : PropTypes.func.isRequired,
}

NewChange.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	return Object.assign({}, {
		dataset : selectChangeByNumber(state, ownProps.params.handle, ownProps.params.slug)
	}, ownProps.params, ownProps)
}

export default connect(mapStateToProps, { 
	loadChangeByNumber 
})(NewChange)