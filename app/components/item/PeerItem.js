import React, { PropTypes } from 'react'

import { Link } from 'react-router-dom'
import Base from '../Base'

export default class PeerItem extends Base {
  template (css) {
    const { data, link } = this.props
    if (link) {
		  return (
  <div className='peerItem' >
    <Link to={{pathname: `/peers/${data.id}` }}>
      <h5 className='title'>{data.username || 'unnamed peer'}</h5>
    </Link>
    <small>{data.id}</small>
    <hr />
  </div>
	  	)
    } else {
		  return (
  <div className='peerItem' >
    <h5 className='title'>{data.username || 'unnamed peer'}</h5>
    <small>{data.id}</small>
    <hr />
  </div>
		  )
    }
  }
}

PeerItem.propTypes = {
  data: PropTypes.object.isRequired,
  link: PropTypes.bool
  // onSelect: PropTypes.func.isRequired
}

PeerItem.defaultProps = {
}
