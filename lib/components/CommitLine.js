import React from 'react'
import PropTypes from 'prop-types'
import Hash from './Hash'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class CommitLine extends Base {
  constructor (props) {
    super(props);
    [
      'parseRelDate'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  parseRelDate (date) {
    if (!date) {
      return 'no date given'
    }

    // Make a fuzzy time
    var delta = Math.round((+new Date() - date) / 1000)

    let minute = 60; let hour = minute * 60; let day = hour * 24; 
    let week = day * 7

    var fuzzy

    if (delta < 30) {
      fuzzy = 'just then.'
    } else if (delta < minute) {
      fuzzy = delta + ' seconds ago.'
    } else if (delta < 2 * minute) {
      fuzzy = 'a minute ago.'
    } else if (delta < hour) {
      fuzzy = Math.floor(delta / minute) + ' minutes ago.'
    } else if (Math.floor(delta / hour) == 1) {
      fuzzy = '1 hour ago.'
    } else if (delta < day) {
      fuzzy = Math.floor(delta / hour) + ' hours ago.'
    } else if (delta < day * 2) {
      fuzzy = 'yesterday'
    }
    return fuzzy
  }

  template (css) {
    const { stats, muted, extraSpace, large, style, updated, path, commit } = this.props
    const space = extraSpace ? 'extraSpace' : 'space'
    const displayLarge = large ? '' : 'stats'
    const displayMuted = muted ? 'muted' : ''
    return (
      <div className={`${css('wrap')} stats-line-large ${displayLarge} ${displayMuted ? css(displayMuted) : undefined}`} style={style} >
        <div className={css('left')}>
          <p>{commit.title}</p>
        </div>
        <div className={css('right')}>
          <Hash hash={path} />
          {commit.created && <span className={css(space)}>{this.parseRelDate(commit.created)}</span> }
        </div>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        display: 'flex',
        width: '100%',
        marginTop: 10,
        paddingTop: 12,
        paddingBottom: 10,
        borderRadius: 3
      },
      left: {
        flex: '1 1 80px'
      },
      right: {
        marginRight: 15,
        flex: '2 1 80px',
        textAlign: 'right',
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

CommitLine.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
  muted: PropTypes.bool,
  extraSpace: PropTypes.bool,
  style: PropTypes.object
}

CommitLine.defaultProps = {
  style: {},
  stats: [],
  muted: false,
  extraSpace: false,
  large: false
}
