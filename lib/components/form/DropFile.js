/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import { Palette, defaultPalette } from '../../propTypes/palette'

export default class DropFile extends Base {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    };

    [
      'handleChange',
      'handleDragLeave',
      'handleDrop',
      'handleDragOver',
      'handleDragEnd'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  shouldComponentUpdate () {
    return true
  }

  handleChange (e) {
    const { name, onChange } = this.props
    onChange(name, e.target.files, e)
  }

  handleDrop (e) {
    console.log('ON DROP')
    e.preventDefault()
    const { palette, name } = this.props
    let dt = e.dataTransfer
    let dropZone = e.target.closest('#dropZone')
    if (dt.items) {
      if (dt.items.length > 1) {
        this.setState({ error: 'error, only one file allowed' })
      } else {
        if (dt.items[0].kind === 'file') {
          let f = dt.items[0].getAsFile()
          if (f.name.endsWith('.csv')) {
            // TODO handle what happens when the file is a-okay
            // remove 'Drag and drop here or choose file'
            // need to see a representation of the file in the box
            // with option to remove the file, that redisplays 'drag and drop here... etc'
            this.setState({error: ''})
          } else {
            this.setState({ error: 'Dataset files must be in CSV format' })
            dropZone.setAttribute('style', `border: 2px dashed ${palette.gray}`)
          }
        } else {
          this.setState({ error: 'Can only upload files'})
        }
      }
    }
  }

  handleDragOver (e) {
    const color = this.props.palette.a
    e.preventDefault()
    e.target.id === 'dropZone' ? e.target.setAttribute('style', `border: 2px dashed ${color}`) : undefined
  }

  handleDragEnd (e) {
    console.log('ON DRAG END')
    console.log(e)
    e.preventDefault()
  }

  handleDragLeave (e) {
    const color = this.props.palette.gray
    e.preventDefault()
    e.target.id === 'dropZone' ? e.target.setAttribute('style', `border: 2px dashed ${color}`) : undefined
  }

  template (css) {
    const {label, name} = this.props
    return (
      <div className={css('uploader')}>
        {label && <label className='control-label' htmlFor={name}>{label}</label>}
        <div id='dropZone' className={css('dropZone')} onDrop={this.handleDrop} onDragOver={this.handleDragOver} onDragEnd={this.handleDragEnd} onDragLeave={this.handleDragLeave}>
          <div className={css('wrap')}>
            <div className={css('dropText')}>Drag and drop here or</div>
            <label htmlFor='fileUpload' className={css('selectFile')} >choose file</label>
            <input className={css('displayNone')} type='file' name={name} id='fileUpload' />
          </div>
        </div>
        <div id={`${name}Error`} className={css('error')}>{this.state.error}</div>
      </div>
    )
  }
  styles () {
    const { palette } = this.props
    return {
      dropZone: {
        border: `2px dashed ${palette.gray}`,
        borderRadius: '5px',
        width: '100%',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      wrap: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '150px'
      },
      uploader: {
        marginTop: '20px',
        marginBottom: '20px'
      },
      dropText: {
        fontWeight: '300',
        display: 'block'
      },
      displayNone: {
        display: 'none'
      },
      selectFile: {
        color: palette.a,
        cursor: 'pointer',
        textTransform: 'none',
        margin: 'auto',
        width: '100px',
        display: 'block',
        ':hover': {
          textDecoration: 'underline'
        }
      },
      error: {
        height: '40px',
        color: palette.error,
        textWeight: '300'
      }
    }
  }
}

DropFile.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
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
