import React, { PropTypes } from 'react'

import { Palette, defaultPalette } from '../../propTypes/palette'
import Base from '../Base'

export default class DatasetItem extends Base {
  // TODO dataset is assigned a value but  never used, consider depreciation
  // const { dataset } = data
  template (css) {
    const { index, data, onSelect } = this.props

    const handleSelect = () => {
      onSelect(index, data)
    }

    return (
      <div className='dataset item'>
        <b onClick={handleSelect} className={css('name')}>{data.name || <i>unnamed dataset</i>}</b>
        <h3>{(data.dataset && data.dataset.title) || <i>untitled dataset</i>}</h3>
        <p>{data.path}</p>
        {/* <ul>
          {data.schema.fields && data.schema.fields.map((table, i) => <li key={i}>{table.name}</li>)}
        </ul> */}
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
      name: {
        color: palette.b,
        fontFamily: '"source code pro", "courier", "monospace"'
      }
    }
  }
}

DatasetItem.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  palette: Palette
}

DatasetItem.defaultProps = {
  palette: defaultPalette
}
