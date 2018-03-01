import React from 'react'
import Base from './Base'
import Spinner from './Spinner'
import Header from './Header'

import { Palette, defaultPalette } from '../propTypes/palette'

export default class AppLoading extends Base {
  template (css) {
    return (
      <div className={css('page')}>
        <Header />
        <div className={css('center')}>
          <h4>Starting qri (aka "query")</h4>
          <p>Have a wonderful day!</p>
          <Spinner />
        </div>
      </div>
    )
  }
  styles () {
    return {
      'page': {
        background: defaultPalette.background,
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

AppLoading.propTypes = {
  palette: Palette
}

AppLoading.defaultProps = {
  palette: defaultPalette
}
