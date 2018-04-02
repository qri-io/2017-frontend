import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'

export default class StatItemList extends Base {
  constructor (props) {
    super(props);
    [
      'renderStat'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderStat (stat, css, index) {
    return (
      <div className={css('statWrap')} key={index}>
        <p className={css('noMargin')}>{stat.title}</p>
        <h3 className={css('noMargin')}>{stat.stat}</h3>
      </div>
    )
  }

  template (css) {
    const { stats, style } = this.props
    return (
      <div className={css('wrap')} style={style} >{stats.map((stat, index) => this.renderStat(stat, css, index))}</div>
    )
  }

  styles () {
    return {
      wrap: {
      },
      statWrap: {
        marginRight: 30,
        display: 'inline-block'
      },
      noMargin: {
        margin: 0
      }
    }
  }
}

StatItemList.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
  muted: PropTypes.bool,
  extraSpace: PropTypes.bool,
  style: PropTypes.object
}

StatItemList.defaultProps = {
  style: {},
  stats: [],
  muted: false,
  extraSpace: false,
  large: false
}
