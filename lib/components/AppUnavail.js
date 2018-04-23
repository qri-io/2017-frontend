import React from 'react'
import Base from './Base'

import { defaultPalette } from '../propTypes/palette'

export default class AppUnavail extends Base {
  template (css) {
    return (
      <div className={css('page')}>
        <div className={css('center')}>
          <h4>Qri backend is unavailable</h4>
          <p>😭 😭 😭</p>
          <hr />
          <p>If you are running locally try typing</p>
          <p><b>qri connect</b></p>
          <p>into your terminal to start up your local qri server</p>
        </div>
      </div>
    )
  }
  styles () {
    const palette = defaultPalette
    return {
      'page': {
        background: palette.background,
        position: 'absolute',
        width: '100%',
        height: '100%',
        minHeight: 1000,
        top: 0,
        left: 0
      },
      'center': {
        width: 300,
        height: 300,
        margin: '10em auto',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        textAlign: 'center'
      }
    }
  }
}

AppUnavail.propTypes = {
}

AppUnavail.defaultProps = {
}
