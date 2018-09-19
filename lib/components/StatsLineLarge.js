import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class StatsLineLarge extends Base {
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
      return <span key={index} className={css(space)}><strong>{num}</strong><br/>{stat.name}</span>
    }
  }

  template (css) {
    const { stats, muted, extraSpace, large, style, updated } = this.props
    const space = extraSpace ? 'extraSpace' : 'space'
    const displayLarge = large ? '' : 'stats'
    const displayMuted = muted ? 'muted' : ''
    return (
      <div className={`${css('wrap')} stats-line-large ${displayLarge} ${displayMuted ? css(displayMuted) : undefined}`} style={style} >
        {stats.map((stat, index) => this.renderStat(stat, space, css, index))}
        {updated ? <span className={css(space)}><strong>{this.parseDate(updated)}</strong><br/>updated</span> : undefined}
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        display: 'flex',
        width: '100%',
        marginTop: 40,
        paddingTop: 12,
        paddingBottom: 10,
        border: '1px solid #eee',
        borderRadius: 3
      },
      space: {
        marginRight: 15,
        flex: '2 1 80px',
        textAlign: 'center',
        color: palette.neutralBold
      },
      extraSpace: {
        marginRight: 50
      },
      muted: {
        color: palette.neutralBold
      },
      open: {
        color: palette.c
      }
    }
  }
}

StatsLineLarge.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
  muted: PropTypes.bool,
  extraSpace: PropTypes.bool,
  style: PropTypes.object
}

StatsLineLarge.defaultProps = {
  style: {},
  stats: [],
  muted: false,
  extraSpace: false,
  large: false
}
