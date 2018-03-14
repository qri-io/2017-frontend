/* globals READ_ONLY, READ_ONLY_LINKS */
import React from 'react'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class ReadOnlyInline extends Base {
  template (css) {
    if (!READ_ONLY) {
      return (
        <p>
          Attempting to use the ReadOnlyInline component without having the READ_ONLY variable set to true in the configuration file.
        </p>
      )
    }
    if (!READ_ONLY_LINKS) {
      return (
        <p>
          Attempting to use the ReadOnlyInline component without having the READ_ONLY_LINKS variable set in the configuration file. READ_ONLY_LINKS should be an array of objects. Each object should have two keys: 'name' and 'link'. The 'name' will be displayed and the 'link' will be the url provided for the href field in the "<a />" tag.
        </p>
      )
    }

    const links = READ_ONLY_LINKS
    return (
      <div className={'inline'} >
        { links.map((obj, index) => <a key={index} href={obj.link} className={`right ${css('link')}`}>{obj.name}</a>)}
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

ReadOnlyInline.propTypes = {
  palette: Palette
}

ReadOnlyInline.defaultProps = {
  palette: defaultPalette
}
