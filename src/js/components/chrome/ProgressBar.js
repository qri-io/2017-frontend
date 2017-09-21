import React, { PropTypes } from 'react'

const ProgressBar = ({ total, progress, size, backgroundColor }) => {
  const width = ((progress / (total || 0.001)) * 100)
  return (
    <div className={`progressbar ${size}`}>
      <div className={`progress`} style={{ width: `${width}%`, backgroundColor }} />
    </div>
  )
}

ProgressBar.propTypes = {
  total: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  size: PropTypes.string,
  backgroundColor: PropTypes.string
}

ProgressBar.defaultProps = {
  total: 100,
  progress: 0,
  size: 'standard',
  backgroundColor: '#8888888'
}

export default ProgressBar
