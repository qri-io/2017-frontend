import React from 'react'
import Base from './Base'
import AppDrag from './AppDrag'
import Button from './chrome/Button'

import { defaultPalette } from '../propTypes/palette'

export default class ReadOnly extends Base {
  template (css) {
    return (
      <div className={css('page')}>
        <AppDrag />
        <div className={css('center')}>
          <h4>This qri server </h4>
          <h4>is in read-only mode!</h4>
          <p>Only calls to <span className='linkMedium'>/network</span> <br /> and <span className='linkMedium'>/[peername]/[datasetname]</span> are active</p>
          <Button link='/network' text='Go To Network' />
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
        width: 600,
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

ReadOnly.propTypes = {
}

ReadOnly.defaultProps = {
}
