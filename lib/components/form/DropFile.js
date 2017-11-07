/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import { Palette, defaultPalette } from '../../propTypes/palette'

export default class DropFile extends Base {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      fileName: ''
    };

    [
      'handleChange',
      'handleDragLeave',
      'handleDrop',
      'handleDragOver',
      'handleDragEnd',
      'handleClickRemove'
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
    e.preventDefault()
    const { palette, name } = this.props
    let dt = e.dataTransfer
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
            e.currentTarget.setAttribute('style', `border: 2px solid ${palette.a}`)
            document.getElementById(`${name}DropText`).setAttribute('style', 'display:none')
            this.setState({error: '', fileName: f.name})
            document.getElementById(`${name}FileName`).setAttribute('style', 'display:flex')
          } else {
            this.setState({ error: 'Dataset files must be in CSV format' })
            e.currentTarget.setAttribute('style', `border: 2px dashed ${palette.gray}`)
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
    e.currentTarget.setAttribute('style', `border: 2px dashed ${color}`)
  }

  handleDragEnd (e) {
    e.preventDefault()
    console.log('dragEnd')
    let dt = e.dataTransfer
    if (dt.items) {
      for (var i = 0; i < dt.items.length; i++) {
        dt.items.remove(i)
      }
    } else {
      e.dataTransfer.clearData()
    }
  }

  handleDragLeave (e) {
    const color = this.props.palette.gray
    e.preventDefault()
    e.currentTarget.setAttribute('style', `border: 2px dashed ${color}`)
  }

  handleClickRemove (e) {
    const { palette, name } = this.props
    document.getElementById(`${name}FileName`).setAttribute('style', 'display:none')
    document.getElementById(`${name}DropText`).setAttribute('style', 'display:flex')
    document.getElementById('dropZone').setAttribute('style', `border: 2px dashed ${palette.gray}`)
    this.setState({fileName: ''})
    // TODO add to get rid of whereever we store the actual file, not sure what that is yet
    e.preventDefault()
  }

  template (css) {
    const {label, name} = this.props
    return (
      <div className={css('uploader')}>
        {label && <label className='control-label' htmlFor={name}>{label}</label>}
        <div id='dropZone' className={css('dropZone')} onDrop={this.handleDrop} onDragOver={this.handleDragOver} onDragEnd={this.handleDragEnd} onDragLeave={this.handleDragLeave}>
          <div id={`${name}DropText`} className={css('wrap')}>
            <div className={css('dropText')}>Drag and drop here or</div>
            <label htmlFor='fileUpload' className={css('selectFile')} >choose file</label>
            <input className={css('displayNone')} type='file' name={name} id='fileUpload' />
          </div>
          <div id={`${name}FileName`} className={`${css('wrap')} ${css('displayNone')}`} >
            <div className={css('fileName')} >
              <div className={css('remove')} onClick={this.handleClickRemove}>x</div>{this.state.fileName}
            </div>
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
        margin: '10px',
        color: palette.error,
        textWeight: '300'
      },
      fileName: {
        position: 'relative',
        border: `1px solid ${palette.gray}`,
        borderRadius: '8px',
        padding: '10px 20px'
      },
      remove: {
        position: 'absolute',
        top: '-8px',
        right: '-7px',
        cursor: 'pointer',
        background: '#55595c',
        borderRadius: '8px',
        paddingRight: '4px',
        paddingLeft: '4px',
        fontSize: '.7rem',
        ':hover': {
          color: palette.a
        }
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
