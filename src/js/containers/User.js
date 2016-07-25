import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { loadUserByHandle } from '../actions/user'
import { selectUserByHandle } from '../selectors/user'


class User extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.loadUserByHandle(this.props.handle);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.handle != this.props.handle) {
			nextProps.loadUserByHandle(nextProps.handle)
		}
	}

	render() {
		const { handle, user } = this.props;
		
		if (!user) {
			return (
				<div className="user container">
					<h3>Not Found</h3>
				</div>
			);
		}

		return (
			<div className="user container">
				<h1>User Profile</h1>
				<h3>{ user.handle }</h3>
				<h3>Datasets:</h3>
				{user.datasets.map((ds, i) => {
					return (
						<div class="dataset" key={i}>
							<Link to={`/${ ds.ownerHandle }/${ ds.slug }`}><h4>{ ds.name }</h4></Link>
							<p>{ ds.description }</p>
						</div>
					);
				})}
			</div>
		);
	}
}

User.propTypes = {
	handle : PropTypes.string.isRequired,
	user : PropTypes.object,

	loadUserByHandle : PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
	return Object.assign({}, {
		user : selectUserByHandle(state, ownProps.params.handle)
	}, ownProps.params, ownProps)
}

export default connect(mapStateToProps, {
	loadUserByHandle
})(User)