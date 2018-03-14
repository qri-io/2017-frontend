import React from 'react'
import PropTypes from 'prop-types'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class ReadOnlyBlock extends Base {
  template (css) {
    if (!READ_ONLY) {
      return (
        <p>
          Attempting to use the ReadOnlyBlock component without having the READ_ONLY variable set to true in the configuration file.
        </p>
      )
    }
    if (!READ_ONLY_TEXT) {
      return (
        <p>
          Attempting to use the ReadOnlyBlock component without having the READ_ONLY_TEST variable set in the configuration file. READ_ONLY_TEXT is the text you want displayed in the ReadOnlyBlock component.
        </p>
      )
    }
    const text = READ_ONLY_TEXT
    return (
      <div className={'inline'} >
        <p>{text}</p>
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
      inline: {
        margin: 0,
        padding: 0,
        display: 'inline'
      },
      link: {
        marginLeft: 10,
        marginRight: 10,
        color: palette.gray
      }
    }
  }
}

ReadOnlyBlock.propTypes = {

}

ReadOnlyBlock.defaultProps = {
  palette: defaultPalette
}
