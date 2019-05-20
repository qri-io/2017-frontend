import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const LoadMore = ({ loading, onLoadMore }) => {
  return (
    <div className='load-more'>Load more entries:
      <Button text='100' loading={loading} onClick={() => onLoadMore(100)} />
      <Button text='500' loading={loading} onClick={() => onLoadMore(500)} />
      <Button text='1000' loading={loading} onClick={() => onLoadMore(1000)} />
    </div>
  )
}

LoadMore.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default LoadMore
