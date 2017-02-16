import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import validateChange from '../validators/change'
import { newChange, updateChange, saveChange, executeChange } from '../actions/change'
import { selectDatasetByAddress } from '../selectors/dataset'
import { selectLocalChangeById } from '../selectors/change'
import { selectSessionUser } from '../selectors/session'

import SessionRequired from '../components/SessionRequired'
import Spinner from '../components/Spinner'
import ValidInput from '../components/ValidInput'
import ValidTextarea from '../components/ValidTextarea'
import SelectField from '../components/SelectField'
import FieldsList from '../components/FieldsList'

class NewChange extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading : !props.dataset, showErrors : false };

		[
			'handleChange',
			'handleSave',
			'handleExecute',
		].forEach(m => this[m] = this[m].bind(this))
	}

  componentWillMount() {
  	this.props.newChange(this.props.address, {
  		user : this.props.user,
  		dataset : this.props.dataset,
  	});
  }

	componentWillReceiveProps(nextProps) {
		if (nextProps.address != this.props.address) {
			this.props.newChange(nextProps.address, {
	  		user : nextProps.user,
	  		dataset : nextProps.dataset,
	  	});
	  	this.setState({ loading : !nextProps.dataset });
		} else if (nextProps.dataset && this.state.loading) {
			this.setState({ loading : false });
		}
	}

	handleChange(name, value, e) {
		e.preventDefault();
		const attrs = Object.assign({}, this.props.change);
		attrs[name] = value
		this.props.updateChange(attrs)
	}

	handleSave(e) {
		e.preventDefault();
		if (!this.props.validation.isValid && !this.state.showErrors) {
			this.setState({ showErrors : true });
		} else if (this.props.validation.isValid) {
			this.props.saveChange(this.props.change);
		}
	}

	handleExecute(e) {

	}

	render() {
		const { loading, showErrors } = this.state;
		const { user, dataset, change, validation } = this.props;
		
		if (!user) {
			return <SessionRequired />
		}

		if (loading) {
			return (
				<div className="container">
					<Spinner />
				</div>
			);
		}

		if (!change) {
			return (
				<div className="dataset container">
					<p>Change</p>
				</div>
			);
		}

		return (
			<div id="wrapper">
				<div className="container">
					<div className="col-md-12">
						<form className="newChange">
							<h3>New Change</h3>
							<div class="form-group">
								<label for="type" className="control-label">Type:</label>
								<select id="type" className="form-control" name="type" onChange={(e) => { this.handleChange("type", e.target.value, e) }}>
									<option value="">-Choose Type-</option>
									<option>INSERT</option>
									<option>MODIFY</option>
									<option>DELETE</option>
								</select>
							</div>
							<SelectField label="Table" name="table_name" value={change.table_name} fields={dataset.fields || []} onChange={this.handleChange} />
							<ValidTextarea label="Description" name="description" value={change.description} showError={showErrors} error={validation.description} onChange={this.handleChange} />
							<ValidTextarea label="CSV Data" name="data" value={change.data} showError={showErrors} error={validation.description} onChange={this.handleChange} />
							<button className="btn btn-large submit"  disabled={(!validation.isValid && showErrors)} onClick={this.handleSave}>Create Change</button>
						</form>
					</div>
					{dataset.fields ? <FieldsList fields={dataset.fields} /> : undefined}
				</div>
			</div>
		);
	}
}

NewChange.propTypes = {
	address : PropTypes.string.isRequired,
	
	user : PropTypes.object,
	dataset : PropTypes.object,
	change : PropTypes.object, 
	validation : PropTypes.object,

	newChange : PropTypes.func.isRequired,
	updateChange : PropTypes.func.isRequired,
	saveChange : PropTypes.func.isRequired,
	executeChange : PropTypes.func.isRequired
}

NewChange.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	const address = [ ownProps.params.user, ownProps.params.dataset ].join(".");
	const change = selectLocalChangeById(state, "new");

	return Object.assign({
		address,
		change,
		user : selectSessionUser(state),
		dataset : selectDatasetByAddress(state, address),
		validation : validateChange(change)
	}, ownProps)
}

export default connect(mapStateToProps, { 
	newChange,
	updateChange,
	saveChange,
	executeChange
})(NewChange)