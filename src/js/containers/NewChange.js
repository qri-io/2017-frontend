import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import validateChange from '../validators/change'
import { loadDatasetByAddress } from '../actions/dataset'
import { newChange, updateChange, saveChange, executeChange } from '../actions/change'
import { selectDatasetByAddress } from '../selectors/dataset'
import { selectChangeByNumber } from '../selectors/change'
import { selectSessionUser } from '../selectors/session'

import SessionRequired from '../components/SessionRequired'
import ValidTextarea from '../components/ValidTextarea'
import SchemaTable from '../components/SchemaTable'

class NewChange extends React.Component {
	constructor(props) {
		super(props);
		[
			'handleChange',
			'handleSave',
			'handleExecute',
		].forEach(m => this[m] = this[m].bind(this))
	}

  componentWillMount() {
  	newChange({
  		user : this.props.user,
  		dataset : this.props.dataset,
  	})
    this.props.loadDatasetByAddress(this.props.address)
  }

	componentWillReceiveProps(nextProps) {
		if (nextProps.address != this.props.address) {
			newChange({
	  		user : nextProps.user,
	  		dataset : nextProps.dataset,
	  	})
	    this.props.loadDatasetByAddress(nextProps.address)
		}
	}

	handleChange(name, value, e) {
		e.preventDefault();

		const attrs = Object.assign({}, this.props.change);
		attrs[name] = value
		this.props.updateChange(attrs)
	}

	handleSave() {

	}

	handleExecute() {

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
	address : PropTypes.string.isRequired,
	
	user : PropTypes.object,
	change : PropTypes.object, 
	errors : PropTypes.object,

	loadDatasetByAddress : PropTypes.func.isRequired,

	newChange : PropTypes.func.isRequired,
	updateChange : PropTypes.func.isRequired,
	saveChange : PropTypes.func.isRequired,
	executeChange : PropTypes.func.isRequired
}

NewChange.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	const address = [ ownProps.params.user, ownProps.params.dataset ].join(".")

	return Object.assign({
		address,
		user : selectSessionUser(state),
		change : state.models.changes.new
	}, ownProps)
}

export default connect(mapStateToProps, { 
	loadDatasetByAddress,

	newChange,
	updateChange,
	saveChange,
	executeChange
})(NewChange)