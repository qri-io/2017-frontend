import React, { PropTypes } from 'react'
import { connect } from 'redux'

import { saveChangeRequest } from './actions/changeRequest'

class ChangeRequest extends React.Component {

	componentWillMount() {
		this.props.loadChangeRequest();
	}

	componentWillReceiveProps(nextProps) {

	}

	render() {
		return (
			<div className="changeRequest container">

			</div>
		);
	}
}

ChangeRequest.propTypes = {

}

ChangeRequest.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	return Object.assign({}, {
		
	}, ownProps);
}

export default connect(mapStateToProps, {
	saveChangeRequest
})(ChangeRequest);