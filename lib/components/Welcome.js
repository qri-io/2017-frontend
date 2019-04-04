import React from 'react'
import Base from './Base'
import AppDrag from './AppDrag'
import QuitApp from './QuitApp.APP_TARGET'
import ExternalLink from './ExternalLink.APP_TARGET'
import version from '../../version'

export default class Welcome extends Base {
  render () {
    return (
      <div className='welcome-page'>
        <AppDrag />
        <div className='welcome-center'>
          <div>
            <h1>Welcome To Qri!</h1>
            <h6>You're using version {version}</h6>
          </div>
          <div>
            <p>We’re currently in Beta. There will be bugs, and features will change quickly &amp; often. We hope you’ll come on this adventure with us! Our <ExternalLink href='https://github.com/qri-io/frontend'>github org</ExternalLink> is the best place to stay informed.</p>
            <div>
              A few notes before we get started:<br />
              <ul>
                <li>By using Qri you agree to our <ExternalLink href='https://qri.io/legal/tos'>Terms of Service</ExternalLink></li>
                <li>All Data on Qri is Public</li>
              </ul>
            </div>
          </div>
          <div className='welcome-accept'>
            <a className='linkLarge' onClick={this.props.onAccept}>Let's Get Started <span className='icon-inline'>right</span></a><br />
            <QuitApp />
          </div>
        </div>
      </div>
    )
  }
}

Welcome.propTypes = {
}

Welcome.defaultProps = {
  onAccept: () => {},
  onExit: () => {}
}
