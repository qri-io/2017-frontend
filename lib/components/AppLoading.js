import React from 'react'

import Spinner from './chrome/Spinner'
import AppDrag from './AppDrag'
import version from '../../version'

export default class AppLoading extends React.PureComponent {
  render () {
    return (
    // this component often loads and renders before any styling has arrived
    // styles are inlined here to avoid visual stutter
      <div style={{ background: 'white', position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
        <AppDrag />
        <div style={{ width: 300, height: 300, margin: '10em auto', top: 0, left: 0, bottom: 0, right: 0, textAlign: 'center' }}>
          <h4>Starting qri (aka "query") version {version}</h4>
          <p>Have a wonderful day!</p>
          <Spinner />
        </div>
      </div>
    )
  }
}

AppLoading.propTypes = {
}

AppLoading.defaultProps = {
}
