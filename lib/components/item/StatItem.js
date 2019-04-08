import React from 'react'
import PropTypes from 'prop-types'

export default class StatItem extends React.PureComponent {
  render () {
    const { data: stat, style } = this.props
    return (
      <div className='stat-item-wrap' style={style} >
        <div className='stat-item-icon-wrap'><span className='icon-inline' >{stat.icon}</span></div>
        <div className='stat-item-text-wrap'>
          <div><p className='stat-item-no-margin'>{stat.title}</p></div>
          <h1 className='stat-item-no-margin'>{stat.stat}</h1>
        </div>
      </div>
    )
  }
}

StatItem.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
  muted: PropTypes.bool,
  extraSpace: PropTypes.bool,
  style: PropTypes.object
}

StatItem.defaultProps = {
  style: {},
  stats: [],
  muted: false,
  extraSpace: false,
  large: false
}
