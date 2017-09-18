import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const RoleItem = ({ index, data, onSelect }) => {
  const handleSelect = () => {
    onSelect(index, data)
  }
  return (
    <div className='role item'>
      <h4 onClick={handleSelect} className='red'><Link to=''>{data.address}</Link></h4>
      <p>{data.type}</p>
    </div>
  )
}

RoleItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
}

RoleItem.defaultProps = {
}

export default RoleItem
