import React from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import Button from './Button'

export default class LoadMore extends React.PureComponent {
  constructor (props) {
    super(props);
    [
      'renderLoadMore',
      'renderEnd'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderLoadMore (onClick) {
    return (
      <Button color='primary' onClick={onClick} text='load more' />
    )
  }

  renderEnd (type) {
    return (
      <div className='load-more-end' />
    )
  }

  render () {
    const { fetchedAll, onClick, type, loading } = this.props
    if (loading) {
      return (
        <Spinner />
      )
    }
    return (
      <div className='load-more-wrap'>
        { fetchedAll ? this.renderEnd(type) : this.renderLoadMore(onClick) }
      </div>
    )
  }
}

LoadMore.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchedAll: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}
