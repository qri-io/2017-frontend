import React, { PropTypes } from 'react'

const QueryItem = ({ data, onSelect }) => {
  return (
    <div className='queryItem' onClick={onSelect}>
      <hr />
      <h5 className='title'>{data.headline || data.name || 'unnamed query'}</h5>
      <small>{data.statement}</small>
    </div>
  )
}

QueryItem.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
}

QueryItem.defaultProps = {
}

export default QueryItem
