import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { loadUserByUsername } from '../actions/user'
import { selectUserByUsername } from '../selectors/user'


class User extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.loadUserByUsername(this.props.username);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.username != this.props.username) {
			nextProps.loadUserByUsername(nextProps.username)
		}
	}

	render() {
		const { username, user, datasets } = this.props;
		
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
				<h3>{ user.username }</h3>
				<h3>Datasets:</h3>
				{datasets.map((ds, i) => {
					return (
						<div class="dataset" key={i}>
							<Link to={ "/" + ds.address.replace(".", "/", -1) }><h4>{ ds.name }</h4></Link>
							<p>{ ds.description }</p>
						</div>
					);
				})}
			</div>
		);
	}
}

User.propTypes = {
	username : PropTypes.string.isRequired,
	user : PropTypes.object,
	datasets : PropTypes.array,

	loadUserByUsername : PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
	return Object.assign({
		username : ownProps.params.user,
		user : selectUserByUsername(state, ownProps.params.user),
		datasets : [],
	}, ownProps)
}

export default connect(mapStateToProps, {
	loadUserByUsername
})(User)