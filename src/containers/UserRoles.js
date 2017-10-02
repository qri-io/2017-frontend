import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { loadUser, loadUserRoles } from '../actions/user'
import { selectUserByUsername } from '../selectors/user'
import { selectUserRoles } from '../selectors/role'

import List from '../components/List'
import RoleItem from '../components/item/RoleItem'
import Spinner from '../components/Spinner'

class Roles extends React.Component {
  constructor (props) {
    super(props);
    [
      'handleSelectItem',
      'handleLoadNextPage'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    this.props.loadUser(this.props.username)
    this.props.loadUserRoles(this.props.username, this.props.nextPage)
  }

  componentWillReceiveProps () {
    // if (nextProps.roles.length && !this.props.roles.length) {
    //  this.props.loadRoles(this.props.nextPage);
    // }
  }

  handleSelectItem (index, role) {
    const adr = role.address.replace('.', '/', -1)
    this.props.push(`/${adr}`)
  }

  handleLoadNextPage () {
    this.props.loadRoles(this.props.nextPage)
  }

  render () {
    const { roles, loading, fetchedAll, username } = this.props

    return (
      <div className='container'>
        <div className='row'>
          <header className='yellow col-md-12'>
            <hr className='yellow' />
            <h1>{username}&apos;s roles</h1>
          </header>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <List data={roles} component={RoleItem} onSelectItem={this.handleSelectItem} />
            { loading ? <Spinner /> : undefined }
            { (!loading && !fetchedAll) ? <button className='btn btn-large btn-primary' onClick={this.handleLoadNextPage}>Load More</button> : undefined }
          </div>
        </div>
      </div>
    )
  }
}

Roles.propTypes = {
  // user: PropTypes.object,
  roles: PropTypes.array.isRequired,

  username: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  nextPage: PropTypes.number.isRequired,
  fetchedAll: PropTypes.bool,

  push: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadUserRoles: PropTypes.func.isRequired
}

Roles.defaultProps = {
}

function mapStateToProps (state, ownProps) {
  const { username } = ownProps.params
  const pagination = state.pagination.userRoles[`${username}.roles`]
  const user = selectUserByUsername(state, username)

  return Object.assign({
    user,
    roles: selectUserRoles(state, user),

    username,
    loading: (pagination) ? pagination.isFetching : false,
    nextPage: (pagination) ? (pagination.pageCount + 1) : 1,
    fetchedAll: (pagination) ? pagination.fetchedAll : false

  }, ownProps)
}

export default connect(mapStateToProps, {
  push,
  loadUser,
  loadUserRoles
})(Roles)
