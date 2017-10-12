import React, { PropTypes } from 'react'

const QueryItem = ({ data, onSelect }) => {
  const query = data
  return (
    <div className='queryItem' onClick={onSelect}>
      <hr />
      <h5 className='title'>{query.name || query.dataset.queryString || 'unnamed query'}</h5>
      <small>{query.path}</small>
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
