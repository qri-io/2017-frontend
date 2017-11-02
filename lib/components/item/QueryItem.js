import React, { PropTypes } from 'react'

import Base from '../Base'
import { Palette, defaultPalette } from '../../propTypes/palette'

export default class QueryItem extends Base {
  constructor (props) {
    super(props)
  }

  template (css) {
    const { data, onSelect } = this.props
    return (
      <div className='queryItem' onClick={onSelect}>
        <h5 className={`title ${css('color')}`}>{data.name || (data.dataset && data.dataset.queryString) || 'unnamed query'}</h5>
        <p><i>{data.path}</i></p>
      </div>
    )
  }
  styles (props) {
    const { palette } = props
    return {
      color: {
        color: palette.a
      }
    }
  }
}

QueryItem.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  palette: Palette
}

QueryItem.defaultProps = {
  palette: defaultPalette
}
