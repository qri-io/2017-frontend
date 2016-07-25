import React, { PropTypes } from 'react'
import { connect } from 'redux'

import { loadChange, saveChange } from '../actions/change'

class Change extends React.Component {

	componentWillMount() {
		this.props.loadChange(handle, slug, number);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.handle != this.props.handle || nextProps.slug != this.props.slug || nextProps.number != this.props.number) {
			this.props.loadChange(handle, slug, number);
		}
	}

	render() {
		const { handle, slug, number, change } = this.props
		return (
			<div className="change container">
				<h1>Change</h1>
				<h3>{handle} {slug} {number}</h3>
			</div>
		);
	}
}

Change.propTypes = {
	handle : PropTypes.string.isRequired,
	slug : PropTypes.string.isRequired,
	number : PropTypes.string.isRequired,

	dataset : PropTypes.object,
	change : PropTypes.object,

	loadChange : PropTypes.func.isRequired,
	saveChange : PropTypes.func,
	deleteChange : PropTypes.func
}

Change.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	return Object.assign({}, {

	}, ownProps.params, ownProps);
}

export default connect(mapStateToProps, {
	loadChange,
	saveChange
})(Change);