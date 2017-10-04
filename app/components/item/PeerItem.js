import React, { PropTypes } from 'react'

const PeerItem = ({ data, onSelect }) => {
  return (
    <div className='peerItem' onClick={onSelect}>
      <hr />
      <h5 className='title'>{data.name || 'unnamed query'}</h5>
      <small>{data.statement}</small>
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
