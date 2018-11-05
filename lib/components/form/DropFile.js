/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import { defaultPalette } from '../../propTypes/palette'

export default class DropFile extends Base {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      fileName: '',
      dropZoneState: 'reset',
      dropTextState: 'displayFlex',
      fileNameState: 'displayNone'
    };

    [
      'handleChange',
      'handleDragLeave',
      'handleDrop',
      'handleDragOver',
      'handleDragEnd',
      'handleClickRemove',
      'handleResetDropZone',
      'handleAddFile'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleAddFile (files, e) {
    const { name, onChange } = this.props
    this.setState(Object.assign({}, {
      error: '',
      fileName: files[0].name,
      dropZoneState: 'dropped',
      fileNameState: 'displayFlex',
      dropTextState: 'displayNone'
    }))
    onChange(name, files, e)
  }

  handleResetDropZone (error, e) {
    const { name, onChange } = this.props
    this.setState(Object.assign({}, {
      error: error,
      fileName: '',
      dropZoneState: 'reset',
      fileNameState: 'displayNone',
      dropTextState: 'displayFlex'
    }))
    onChange(name, undefined, e)
  }

  handleChange (e) {
    const { json, csv, yaml } = this.props
    var formats = { json, csv, yaml }
    formats = Object.keys(formats).filter((key) => formats[key])

    if (e.target.files.length > 1) {
      this.handleResetDropZone('error, only one file allowed', e)
    } else if
    ((csv && e.target.files[0].name.endsWith('.csv')) ||
      (json && e.target.files[0].name.endsWith('.json')) ||
      (yaml && e.target.files[0].name.endsWith('.yaml'))) {
      this.handleAddFile(e.target.files, e)
    } else {
      this.handleResetDropZone('Files must be in one of these formats: ')
    }
  }

  handleDrop (e) {
    e.preventDefault()
    const { disabled, json, csv, yaml } = this.props
    var formats = { json, csv, yaml }
    formats = Object.keys(formats).filter((key) => formats[key])

    if (!disabled) {
      let dt = e.dataTransfer
      if (dt.items) {
        if (dt.items.length > 1) {
          this.handleResetDropZone('error, only one file allowed', e)
        } else if (dt.items[0].kind === 'file') {
          let f = dt.items[0].getAsFile()
          if (
            (csv && f.name.endsWith('.csv')) ||
            (json && f.name.endsWith('.json')) ||
            (yaml && f.name.endsWith('.yaml'))
          ) {
            this.handleAddFile([f], e)
          } else {
            this.handleResetDropZone(`Files must be in one of these formats: ${formats}`, e)
          }
        } else {
          this.handleResetDropZone(`Files must be in one of these formats: ${formats}`, e)
        }
      }
    } else {
      this.setState({ error: '' })
    }
  }

  handleDragOver (e) {
    const { disabled } = this.props
    e.preventDefault()
    if (!disabled) {
      this.setState({ dropZoneState: 'dragOver' })
    } else {
      this.setState({ error: 'Only url or file upload needed' })
    }
  }

  handleDragEnd (e) {
    e.preventDefault()
    if (!this.props.disabled) {
      let dt = e.dataTransfer
      if (dt.items) {
        for (var i = 0; i < dt.items.length; i++) {
          dt.items.remove(i)
        }
      } else {
        e.dataTransfer.clearData()
      }
    } else {
      this.setState({ error: '' })
    }
  }

  handleDragLeave (e) {
    e.preventDefault()
    this.setState({ dropZoneState: 'reset' })
    this.setState({ error: '' })
  }

  handleClickRemove (e) {
    this.handleResetDropZone('', e)
    this.fileUpload.value = ''
    e.preventDefault()
  }

  template (css) {
    const { label, name, disabled } = this.props
    const { dropZoneState, dropTextState, fileNameState } = this.state
    return (
      <div className={css('uploader')}>
        {label && <label className={css('label')} htmlFor={name}>{label}</label>}
        <div id={`${name}DropZone`}
          className={`${css('dropZone')} ${css(dropZoneState)}`}
          onDrop={this.handleDrop}
          onDragOver={this.handleDragOver}
          onDragEnd={this.handleDragEnd}
          onDragLeave={this.handleDragLeave}
        >
          <div id={`${name}DropText`} className={`${css('wrap')} ${css(dropTextState)}`} >
            <div className={css('dropText')}>Drag and drop here or</div>
            <label htmlFor={`${name}FileUpload`} className={disabled ? css('selectFileDisabled') : css('selectFile')} >choose file</label>
            <input
              className={css('displayNone')}
              type='file'
              name={name}
              id={`${name}FileUpload`}
              onChange={this.handleChange}
              disabled={!!disabled}
              ref={(input) => { this.fileUpload = input }}
            />
          </div>
          <div id={`${name}FileName`} className={`${css('wrap')} ${css(fileNameState)}`} >
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
    const palette = defaultPalette
    return {
      dropZone: {
        borderRadius: '5px',
        width: '100%',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      reset: {
        border: `2px dashed ${palette.primaryMuted}`
      },
      dragOver: {
        border: `2px dashed ${palette.primary}`
      },
      dropped: {
        border: `2px solid ${palette.primary}`
      },
      wrap: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '150px'
      },
      uploader: {
        marginBottom: '20px'
      },
      dropText: {
        fontWeight: '300',
        display: 'block'
      },
      displayNone: {
        display: 'none'
      },
      displayFlex: {
        display: 'flex'
      },
      selectFile: {
        color: palette.primary,
        cursor: 'pointer',
        textTransform: 'none',
        margin: 'auto',
        width: '100px',
        display: 'block',
        ':hover': {
          textDecoration: 'underline'
        }
      },
      selectFileDisabled: {
        color: palette.primaryMuted,
        textTransform: 'none',
        margin: 'auto',
        width: '100px',
        display: 'block'
      },
      error: {
        height: '40px',
        margin: '10px',
        color: palette.error,
        textWeight: '300'
      },
      fileName: {
        position: 'relative',
        border: `1px solid ${palette.primaryMuted}`,
        borderRadius: '8px',
        padding: '10px 20px'
      },
      remove: {
        position: 'absolute',
        top: '-7px',
        right: '-7px',
        cursor: 'pointer',
        background: palette.primaryLight,
        borderRadius: '8px',
        paddingRight: '4px',
        paddingLeft: '4px',
        fontSize: '.7rem',
        ':hover': {
          color: palette.primary
        }
      },
      label: {
        color: palette.primaryMuted
      }
    }
  }
}

DropFile.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  json: PropTypes.bool,
  csv: PropTypes.bool,
  yaml: PropTypes.bool
}

DropFile.defaultProps = {
  name: 'file',
  disabled: ''
}
