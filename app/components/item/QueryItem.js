import React, { PropTypes } from 'react'

const QueryItem = ({ data, onSelect }) => {
  return (
    <div className='queryItem' onClick={onSelect}>
      <hr />
      <h5 className='title'>{data.name || data.dataset.queryString || 'unnamed query'}</h5>
      <p><i>{data.path}</i></p>
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
