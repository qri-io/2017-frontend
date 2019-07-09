import React from 'react'
// import PropTypes from 'prop-types'

const JobItem = ({ data = {}, small, rename, border, showPublishedStatus }) => {
  const job = data
  return (
    <div className={`dataset-item-wrap ${border && 'border-bottom '}`}>
      <h5>{job.name}</h5>
    </div>
  )
}

JobItem.propTypes = {
}

JobItem.defaultProps = {
}

export default JobItem
