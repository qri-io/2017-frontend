import React from 'react'
import PropTypes from 'prop-types'

export default class Hash extends React.PureComponent {
  render () {
    const { hash, datasetRef, short, noPrefix, style, old } = this.props
    let displayHash = hash || datasetRef.path
    if (!displayHash || displayHash.length < 52) {
      displayHash = 'invalid hash'
    } else {
      displayHash = displayHash.slice('/ipfs/'.length)
      displayHash = short ? displayHash.slice(0, 2) + '...' + displayHash.slice(-6) : displayHash
    }
    return (
      <div className='hash' style={style} >
        {!noPrefix && <span>/ipfs/</span>}
        {displayHash}
        {old ? <span className='hash-old'>not latest version</span> : undefined}
      </div>
    )
  }
}

Hash.propTypes = {
  short: PropTypes.bool,
  noPrefix: PropTypes.bool,
  style: PropTypes.object
}

Hash.defaultProps = {
  style: {},
  short: false,
  noPrefix: false,
  datasetRef: {}
}
