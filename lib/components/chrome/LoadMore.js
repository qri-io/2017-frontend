import React from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import Button from './Button'

const LoadMore = ({ fetchedAll, onClick, loading }) => {
  if (loading) {
    return (
      <Spinner />
    )
  }
  return (
    <div className='load-more-wrap'>
      { fetchedAll
        ? <div className='load-more-end' />
        : <Button color='primary' onClick={onClick} text='load more' /> }
    </div>
  )
}

LoadMore.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchedAll: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default LoadMore
