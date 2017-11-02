import React, { PropTypes } from 'react'

const LoadingButton = ({ loading, children, onClick, className }) => {
  return (
    <button disabled={loading} onClick={onClick} className={`btn btn-primary ${className}`}>{children}</button>
  )
}

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element,
  onClick: PropTypes.func,
  className: PropTypes.string
}

LoadingButton.defaultProps = {
  loading: false
}

export default LoadingButton
