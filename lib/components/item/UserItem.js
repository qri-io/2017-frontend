import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const UserItem = ({ index, data, onSelect }) => {
  const handleSelect = () => { onSelect(index, data) }
  return (
    <div className='user item col-xl-3 col-lg-4 col-md-6 col-sm-12'>
      <h4 onClick={handleSelect}>
        <Link className='namespace' to={`/users/${data.username}`}>{data.username}</Link>
      </h4>
    </div>
  )
}

UserItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
}

UserItem.defaultProps = {
}

export default UserItem
