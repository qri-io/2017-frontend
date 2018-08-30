import React from 'react'
import Base from './Base'
import AppDrag from './AppDrag'

import { defaultPalette } from '../propTypes/palette'

export default class Welcome extends Base {
  template (css) {
    return (
      <div className={css('page')}>
        <AppDrag />
        <div className={css('center')}>
          <h4>Welcome To Qri!</h4>
          <p>We’re currently in Beta. There will be bugs, and features will change quickly &amp; often. We hope you’ll come on this adventure with us!<br />
          Our github org is the best place to stay informed.<br />
          A few notes before we get started:<br />
            <ul>
              <li>By using Qri you agree to our <a target='_blank' href='https://qri.io/legal/tos'>Terms of Service</a></li>
              <li>All Data on Qri is Public</li>
            </ul>
            <a onClick={this.props.onAccept}>Let's Go!</a><br />
            <a onClick={this.props.onExit}>exit</a>
          </p>
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
        top: 0,
        left: 0
      },
      'center': {
        width: 500,
        margin: '10em auto 0 10em',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    }
  }
}

Welcome.propTypes = {
}

Welcome.defaultProps = {
  onAccept: () => {},
  onExit: () => {}
}
