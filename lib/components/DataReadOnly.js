import React from 'react'
import Base from './Base'

import { Palette, defaultPalette } from '../propTypes/palette'

export default class DataReadOnly extends Base {
  template (css) {
    return (
      <div className={css('')}>
        <p>This data can only be viewed by downloading qri. Head <a href='https://github.com/qri-io/qri/releases'>here</a> to download and set up your own qri server. </p>
      </div>
    )
  }
  styles () {
    return {
    }
  }
}

DataReadOnly.propTypes = {
  palette: Palette
}

DataReadOnly.defaultProps = {
  palette: defaultPalette
}
