import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'

export default class StatsBar extends Base {
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

  renderStat (stat, space, css, index, style) {
    if (stat && stat.name) {
      const num = stat.value > 1000 ? Math.round(stat.value / 1000) + 'K' : stat.value
      return (
        <span key={index} className={css(space)}>
          {num}
          <br /><label className='label'>{stat.name}</label>
        </span>
      )
    }
  }

  template (css) {
    const { stats, extraSpace, large, style, updated } = this.props
    const space = extraSpace ? 'extraSpace' : 'space'
    const font = large ? 'stats-large' : 'stats-medium'
    return (
      <div className={`${css('wrap')} ${font}`} style={style} >
        {stats.map((stat, index) => this.renderStat(stat, space, css, index))}
        {updated ? <span className={css(space)}>{this.parseDate(updated)}<br /><label>updated</label></span> : undefined}
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        display: 'flex',
        width: '100%',
        marginTop: 40,
        paddingTop: 12,
        paddingBottom: 10,
        borderRadius: 3
      },
      space: {
        marginRight: 15,
        flex: '2 1 80px',
        textAlign: 'center'
      }
    }
  }
}

StatsBar.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
  muted: PropTypes.bool,
  extraSpace: PropTypes.bool,
  style: PropTypes.object
}

StatsBar.defaultProps = {
  style: {},
  stats: [],
  muted: false,
  extraSpace: false,
  large: false
}
