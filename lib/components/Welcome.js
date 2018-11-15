import React from 'react'
import Base from './Base'
import AppDrag from './AppDrag'
import QuitApp from './QuitApp.APP_TARGET'
import ExternalLink from './ExternalLink.APP_TARGET'
import version from '../../version'

import { defaultPalette } from '../propTypes/palette'

export default class Welcome extends Base {
  template (css) {
    return (
      <div className={css('page')}>
        <AppDrag />
        <div className={css('center')}>
          <div className={css('header')}>
            <h1>Welcome To Qri!</h1>
            <h6>You're using version {version}</h6>
          </div>
          <div>
            <p>We’re currently in Beta. There will be bugs, and features will change quickly &amp; often. We hope you’ll come on this adventure with us! Our <ExternalLink href='https://github.com/qri-io/frontend'>github org</ExternalLink> is the best place to stay informed.</p>
            <div className={css('notes')}>
              A few notes before we get started:<br />
              <ul>
                <li>By using Qri you agree to our <ExternalLink href='https://qri.io/legal/tos'>Terms of Service</ExternalLink></li>
                <li>All Data on Qri is Public</li>
              </ul>
            </div>
          </div>
          <div className={css('accept')}>
            <a className='linkLarge' onClick={this.props.onAccept}>Let's Get Started <span className='icon-inline'>right</span></a><br />
            <QuitApp />
          </div>
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
        width: 600,
        padding: '5em',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
      },
      accept: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'baseline'
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
