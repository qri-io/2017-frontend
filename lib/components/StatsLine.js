import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'

export default class StatsLine extends Base {
  constructor (props) {
    super(props);
    [
      'renderStat',
      'parseDate'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  parseDate (datetime) {
    if (!datetime) {
      return 'no date given'
    }
    const date = new Date(datetime)
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  renderStat (stat, css, index, style) {
    if (stat && stat.value && stat.name) {
      const num = stat.value > 1000 ? Math.round(stat.value / 1000) + 'K' : stat.value
      return <span key={index}><span>{num} {stat.name}</span><span className={css('separated')}>|</span></span>
    }
  }

  template (css) {
    const { stats, style, updated, published } = this.props
    return (
      <div className={`statsLine ${css('wrap')}`}>
        <div className={css('wrapStats')} style={style} >
          {stats.map((stat, index) => this.renderStat(stat, css, index))}
          {updated ? <span>{this.parseDate(updated)}</span> : undefined}
        </div>
        {published && <span>published</span>}
      </div>
    )
  }

  styles () {
    return {
      wrapStats: {
        display: 'flex',
        alignItems: 'center'
      },
      separated: {
        margin: '0 5px'
      },
      icon: {
        fontSize: 10
      },
      wrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }
  }
}

StatsLine.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
  muted: PropTypes.bool,
  extraSpace: PropTypes.bool,
  style: PropTypes.object
}

StatsLine.defaultProps = {
  style: {},
  stats: [],
  muted: false,
  extraSpace: false,
  large: false
}
