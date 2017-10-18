import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

import { Palette, defaultPalette } from '../../propTypes/palette'
import Base from '../Base'

export default class DatasetItem extends Base {
  // TODO dataset is assigned a value but  never used, consider depreciation
  // const { dataset } = data

  template (css) {
    const { data, link } = this.props
    const path = data.path.slice(6, -13)
    if (link) {
      return (
        <div className='dataset item' >
          <Link to={{pathname: `/dataset/${path}`}} >
            <b className={css('name')}>{data.name || <i>unnamed dataset</i>}</b>
            <h3>{(data.dataset && data.dataset.title) || <i>untitled dataset</i>}</h3>
          </Link>
          <p className={css('path')}>{data.path}</p>
        </div>
      )
    } else {
      return (
        <div className='dataset item' >
          <b className={css('name')}>{data.name || <i>unnamed dataset</i>}</b>
          <h3>{(data.dataset && data.dataset.title) || <i>untitled dataset</i>}</h3>
          <p className={css('path')}>{data.path}</p>
          {/* <ul>
            {data.schema.fields && data.schema.fields.map((table, i) => <li key={i}>{table.name}</li>)}
          </ul> */}
        </div>
      )
    }
  }

  styles (props) {
    const { palette } = props
    return {
      name: {
        color: palette.b,
        fontFamily: '"source code pro", "courier", "monospace"'
      },
      path: {
        color: palette.path
      }
    }
  }
}

DatasetItem.propTypes = {
  link: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  palette: Palette
}

DatasetItem.defaultProps = {
  palette: defaultPalette
}
