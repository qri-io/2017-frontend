import React, { PropTypes } from 'react'

const LoadingButton = ({ loading, children, onClick }) => {
  return (
    <button disabled={loading} onClick={onClick} className='btn btn-primary'>{children}</button>
  )
}

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element,
  onClick: PropTypes.func
}

LoadingButton.defaultProps = {
  loading: false
}

export default LoadingButton
