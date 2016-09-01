import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadMigrationByNumber } from '../actions/migration'
import { selectMigrationByNumber } from '../selectors/migration'

import SchemaTable from '../components/SchemaTable'

class NewMigration extends React.Component {
	constructor(props) {
		super(props);
		// [
		// 	'handleRunQuery',
		// ].forEach(m => this[m] = this[m].bind(this))
	}

  componentWillMount() {
    this.props.loadMigrationByNumber(this.props.handle, this.props.slug)
  }

	componentWillReceiveProps(nextProps) {
		const { handle, slug } = this.props
		if (nextProps.handle != handle || nextProps.slug != slug) {
	    this.props.loadMigrationByNumber(nextProps.handle, nextProps.slug)
		}
	}

	render() {
		const { handle, slug, dataset } = this.props
		
		if (!dataset) {
			return (
				<div className="dataset container">
					<p>No Migration</p>
				</div>
			);
		}

		return (
			<div id="wrapper">
				<div class="container">
					<div class="col-md-12">
						<form className="newMigration">
							<h3>New Migration</h3>
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

NewMigration.propTypes = {
	handle : PropTypes.string.isRequired,
	slug : PropTypes.string.isRequired,
	dataset : PropTypes.object,

	loadMigrationByNumber : PropTypes.func.isRequired,
}

NewMigration.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	return Object.assign({}, {
		dataset : selectMigrationByNumber(state, ownProps.params.handle, ownProps.params.slug)
	}, ownProps.params, ownProps)
}

export default connect(mapStateToProps, { 
	loadMigrationByNumber 
})(NewMigration)