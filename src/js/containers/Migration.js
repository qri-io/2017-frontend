import React, { PropTypes } from 'react'
import { connect } from 'redux'

import { loadMigration, saveMigration } from '../actions/migration'

class Migration extends React.Component {

	componentWillMount() {
		this.props.loadMigration(handle, slug, number);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.handle != this.props.handle || nextProps.slug != this.props.slug || nextProps.number != this.props.number) {
			this.props.loadMigration(handle, slug, number);
		}
	}

	render() {
		const { handle, slug, number, migration } = this.props
		return (
			<div className="migration container">
				<h1>Migration</h1>
				<h3>{handle} {slug} {number}</h3>
			</div>
		);
	}
}

Migration.propTypes = {
	handle : PropTypes.string.isRequired,
	slug : PropTypes.string.isRequired,
	number : PropTypes.string.isRequired,

	dataset : PropTypes.object,
	migration : PropTypes.object,

	loadMigration : PropTypes.func.isRequired,
	saveMigration : PropTypes.func,
	deleteMigration : PropTypes.func
}

Migration.defaultProps = {

}

function mapStateToProps(state, ownProps) {
	return Object.assign({}, {

	}, ownProps.params, ownProps);
}

export default connect(mapStateToProps, {
	loadMigration,
	saveMigration
})(Migration);