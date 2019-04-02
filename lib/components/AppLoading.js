import React from 'react'
import Base from './Base'
import Spinner from './chrome/Spinner'
import AppDrag from './AppDrag'
import version from '../../version'

import { defaultPalette } from '../propTypes/palette'

export default class AppLoading extends Base {
  render (css) {
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
