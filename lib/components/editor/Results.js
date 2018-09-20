import React from 'react'
import Base from '../Base'

import { defaultPalette } from '../../propTypes/palette'

export default class Results extends Base {
  template (css) {
    return (
      <div className={css('page')}>
        <div className={css('center')}>
          <h4>Results</h4>
        </div>
      </div>
    )
  }
  styles () {
    const palette = defaultPalette
    return {
      'page': {
        background: palette.a,
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

Results.propTypes = {
}

Results.defaultProps = {
}
