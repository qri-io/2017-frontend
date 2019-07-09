import React from 'react'
// import PropTypes from 'prop-types'
import { execTimeString } from '../../utils/date'

const LogItem = ({ data = {}, small, rename, border, showPublishedStatus }) => {
  const job = data
  return (
    <div className={`dataset-item-wrap ${border && 'border-bottom '}`}>
      <p className='right'>{execTimeString(job.lastRunStart, job.lastRunStop)}</p>
      <h5>{job.name}</h5>
      <small>{job.lastError}</small>
    </div>
  )
}

LogItem.propTypes = {
}

LogItem.defaultProps = {
}

export default LogItem
