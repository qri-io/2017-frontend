/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import { Palette, defaultPalette } from '../../propTypes/palette'

export default class DropFile extends Base {
  constructor (props) {
    super(props);

    [
      'handleChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleChange (e) {
    const { name, onChange } = this.props
    onChange(name, e.target.files, e)
  }

  handleDrop () {

  }

  handleDragOver () {

  }

  handleDragEnd () {

  }

  template (css) {
    return (
      <div className={css('uploader')}>
        <div id='drop_zone' className={css('drop_zone')} ondrop={this.handleDrop} ondragover={this.handleDragOver} ondragend={this.handleDragEnd}>
          <strong>Drag one or more files to this Drop Zone ...</strong>
        </div>
      </div>
    )
  }
  styles () {
    const { palette } = this.props
    return {
      drop_zone: {
        border: `2px solid ${palette.gray}`,
        width: '100%',
        height: '100px'
      },
      uploader: {
        marginTop: '20px',
        marginBottom: '20px'
      }
    }
  }
}

DropFile.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  palette: Palette
}

DropFile.defaultProps = {
  name: 'file',
  palette: defaultPalette
}

      // <input
        // name='file'
        // type='file'
        // disabled={disabled}
        // className='form-control'
        // onChange={handleChange}
      // />
