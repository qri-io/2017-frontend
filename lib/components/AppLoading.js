import React from 'react'

import Spinner from './chrome/Spinner'
import AppDrag from './AppDrag'
import version from '../../version'

export default class AppLoading extends React.PureComponent {
  render () {
    return (
      <div className='app-loading-page'>
        <AppDrag />
        <div className='app-loading-center'>
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
