import React, { PropTypes } from 'react'

import Base from './Base'
import Spinner from './Spinner'

export default class LoadMore extends Base {
  constructor (props) {
    super(props);
    [
	    'renderLoadMore',
	    'renderEnd'
    ].forEach((m) => this[m] = this[m].bind(this))
  }

  renderLoadMore (css, onClick) {
  	return (
    <button className={`btn btn-primary center ${css('button')}`} onClick={onClick}><label className={css('margin')}>load more</label></button>
  		)
  }

  renderEnd (css, type) {
  	return (
    <div className={css('button')} ><label className={css('margin')}>{`end of ${type}`}</label></div>
  		)
  }

  template (css) {
    const { fetchedAll, onClick, type, loading } = this.props
    if (loading) {
      <Spinner />
    }
    return (
      <div className={css('wrap')}>
        { fetchedAll ? this.renderEnd(css, type) : this.renderLoadMore(css, onClick) }
      </div>
    )
  }

  styles () {
    return {
    	wrap: {
    		width: '100%'
    	},
      button: {
      	display: 'black',
      	marginLeft: '200px'
      },
      margin: {
      	margin: 0
      }
    }
  }
}

LoadMore.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchedAll: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}
