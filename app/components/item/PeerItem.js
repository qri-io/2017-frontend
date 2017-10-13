import React, { PropTypes } from 'react'

const PeerItem = ({ data, onSelect }) => {
  return (
    <div className='peerItem' onClick={onSelect}>
      <h5 className='title'>{data.username || 'unnamed peer'}</h5>
      <small>{data.id}</small>
      <hr />
    </div>
  )
}

PeerItem.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
}

PeerItem.defaultProps = {
}

export default PeerItem
