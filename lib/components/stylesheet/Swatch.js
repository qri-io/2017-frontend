import React from 'react'
import PropTypes from 'prop-types'

export default class Swatch extends React.PureComponent {
  render () {
    const { style, title, hex } = this.props
    return (
      <div className='swatch-wrap'>
        <div className='swatch' style={style} />
        <p>{title}</p>
        <p>{hex}</p>
      </div>
    )
  }
}

Swatch.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string,
  hex: PropTypes.string
}
