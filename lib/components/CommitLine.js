import React from 'react'
import PropTypes from 'prop-types'
import Hash from './Hash'

import { defaultPalette } from '../propTypes/palette'
import { relDate } from '../utils/date'

import Base from './Base'

export default class CommitLine extends Base {
  template (css) {
    const { muted, extraSpace, large, style, path, commit } = this.props
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
          {commit.created && <span className={css(space)}>{relDate(commit.created)}</span> }
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
