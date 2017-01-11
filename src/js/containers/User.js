import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { loadUserByUsername, loadUserDatasets, loadUserQueries, loadUserRoles } from '../actions/user'
import { selectSessionUser } from '../selectors/session'
import { selectUserByUsername } from '../selectors/user'
import { selectUserDatasets } from '../selectors/dataset'
import { selectUserQueries } from '../selectors/query'
import { selectUserRoles } from '../selectors/role'

import List from '../components/List';
import DatasetItem from '../components/item/DatasetItem';
import QueryItem from '../components/item/QueryItem';
import RoleItem from '../components/item/RoleItem';

class User extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.loadUserByUsername(this.props.username);
		this.props.loadUserRoles(this.props.username, this.props.nextPage);
		// this.props.loadUserDatasets(this.props.username);
		// this.props.loadUserQueries(this.props.username);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.username != this.props.username) {
			nextProps.loadUserByUsername(nextProps.username)
			// nextProps.loadUserDatasets(this.props.username);
			// nextProps.loadUserQueries(this.props.username);
			nextProps.loadUserRoles(this.props.username, this.props.nextPage);
		}
	}

	render() {
		const { username, user, datasets, queries, permissions, roles } = this.props;
		
		if (!user) {
			return (
				<div className="user container">
					<h3>Not Found</h3>
				</div>
			);
		}

		return (
			<div className="user container">
				<div className="row">
					<header className="yellow col-md-12">
						<hr className="yellow" />
						<h1><Link className="yellow" to={"/" + user.username }>{ user.username }</Link></h1>
						{ permissions.edit ? <Link to="/settings" >settings</Link> : undefined }
						<p>{ user.description }</p>
					</header>
				</div>
				<div className="row">
					<div className="roles yellow col-md-6">
						<hr className="yellow" />
						<h3>{username}'s roles</h3>
						<List data={roles} component={RoleItem} onSelectItem={this.handleSelectItem} />
					</div>
				</div>
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
	roles : PropTypes.array,

	permissions: PropTypes.object.isRequired,

	pages : PropTypes.object.isRequired,

	loadUserByUsername : PropTypes.func.isRequired,
	loadUserDatasets : PropTypes.func.isRequired,
	loadUserQueries : PropTypes.func.isRequired,
	loadUserRoles : PropTypes.func.isRequired
}

User.defaultProps = {
}

function mapStateToProps(state, ownProps) {
	const username = ownProps.params.user;
	const user = selectUserByUsername(state, username);
	const rolePages = state.pagination.userRoles[`${username}.roles`];
	
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
		user,
		datasets : selectUserDatasets(state, username),
		queries: selectUserQueries(state, username),
		roles : selectUserRoles(state, user),
		pages : {
			roles : {
				loading : (rolePages) ? rolePages.isFetching : false,
				nextPage : (rolePages) ? (rolePages.pageCount + 1) : 1,
				fetchedAll : (rolePages) ? rolePages.fetchedAll : false
			}
		},
		permissions
	}, ownProps)
}

export default connect(mapStateToProps, {
	loadUserByUsername,
	loadUserDatasets,
	loadUserQueries,
	loadUserRoles
})(User)