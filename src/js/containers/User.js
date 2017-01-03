import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { loadUserByUsername, loadUserDatasets, loadUserQueries } from '../actions/user'
import { selectSessionUser } from '../selectors/session'
import { selectUserByUsername } from '../selectors/user'
import { selectUserDatasets } from '../selectors/dataset'
import { selectUserQueries } from '../selectors/query'

import List from '../components/List';
import DatasetItem from '../components/DatasetItem';
import QueryItem from '../components/QueryItem';

class User extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.loadUserByUsername(this.props.username);
		// this.props.loadUserDatasets(this.props.username);
		// this.props.loadUserQueries(this.props.username);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.username != this.props.username) {
			nextProps.loadUserByUsername(nextProps.username)
			// nextProps.loadUserDatasets(this.props.username);
			// nextProps.loadUserQueries(this.props.username);
		}
	}

	render() {
		const { username, user, datasets, queries, permissions } = this.props;
		
		if (!user) {
			return (
				<div className="user container">
					<h3>Not Found</h3>
				</div>
			);
		}

		return (
			<div className="user container">
				<header className="col-md-12">
					<small>USER</small>
					<h2>
						<Link to={"/" + user.username }>{ user.username }</Link>
					</h2>
					{ permissions.edit ? <Link to="/settings" >settings</Link> : undefined }
					<p>{ user.description }</p>
				</header>
				{/*<div className="col-md-12">
					<hr />
					<h6>QUERIES:</h6>
					<List data={queries} component={QueryItem} />
				</div>
				<div className="col-md-12">
					<hr />
					<h6>DATASETS:</h6>
					<List data={datasets} component={DatasetItem} />
				</div>*/}
			</div>
		);
	}
}

User.propTypes = {
	username : PropTypes.string.isRequired,
	user : PropTypes.object,
	datasets : PropTypes.array,
	queries : PropTypes.array,

	permissions: PropTypes.object.isRequired,

	loadUserByUsername : PropTypes.func.isRequired,
	loadUserDatasets : PropTypes.func.isRequired,
	loadUserQueries : PropTypes.func.isRequired,
}

User.defaultProps = {
}

function mapStateToProps(state, ownProps) {
	const username = ownProps.params.user;
	
	let permissions = {
		edit : false,
		del : false
	}

	const session = selectSessionUser(state);
	if (session && session.username == username) {
		permissions.edit = true;
		permissions.del = true;
	}

	return Object.assign({
		username,
		user : selectUserByUsername(state, username),
		datasets : selectUserDatasets(state, username),
		queries: selectUserQueries(state, username),
		permissions
	}, ownProps)
}

export default connect(mapStateToProps, {
	loadUserByUsername,
	loadUserDatasets,
	loadUserQueries
})(User)