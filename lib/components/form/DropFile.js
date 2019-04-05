/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'

export default class DropFile extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      fileName: '',
      dropZoneState: 'drop-file-reset',
      dropTextState: 'drop-file-display-flex',
      fileNameState: 'drop-file-display-none'
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
      dropZoneState: 'drop-file-dropped',
      fileNameState: 'drop-file-display-flex',
      dropTextState: 'drop-file-display-none'
    }))
    onChange(name, files, e)
  }

  handleResetDropZone (error, e) {
    const { name, onChange } = this.props
    this.setState(Object.assign({}, {
      error: error,
      fileName: '',
      dropZoneState: 'drop-file-reset',
      fileNameState: 'drop-file-display-none',
      dropTextState: 'drop-file-display-flex'
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
      this.setState({ dropZoneState: 'drop-file-drag-over' })
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
    this.setState({ dropZoneState: 'drop-file-reset' })
    this.setState({ error: '' })
  }

  handleClickRemove (e) {
    this.handleResetDropZone('', e)
    this.fileUpload.value = ''
    e.preventDefault()
  }

  render () {
    const { label, name, disabled } = this.props
    const { dropZoneState, dropTextState, fileNameState } = this.state
    return (
      <div className='drop-file-uploader'>
        {label && <label className='drop-file-label' htmlFor={name}>{label}</label>}
        <div id={`${name}DropZone`}
          className={`drop-file-drop-zone ${dropZoneState}`}
          onDrop={this.handleDrop}
          onDragOver={this.handleDragOver}
          onDragEnd={this.handleDragEnd}
          onDragLeave={this.handleDragLeave}
        >
          <div id={`${name}DropText`} className={`drop-file-wrap ${dropTextState}`} >
            <div className='drop-file-drop-text'>Drag and drop here or</div>
            <label htmlFor={`${name}FileUpload`} className={disabled ? 'drop-file-select-file-disabled' : 'drop-file-select-file'} >choose file</label>
            <input
              className='drop-file-display-none'
              type='file'
              name={name}
              id={`${name}FileUpload`}
              onChange={this.handleChange}
              disabled={!!disabled}
              ref={(input) => { this.fileUpload = input }}
            />
          </div>
          <div id={`${name}FileName`} className={`drop-file-wrap ${fileNameState}`} >
            <div className='drop-file-file-name' >
              <div className='drop-file-remove' onClick={this.handleClickRemove}>x</div>{this.state.fileName}
            </div>
          </div>
        </div>
        <div id={`${name}Error`} className='drop-file-error'>{this.state.error}</div>
      </div>
    )
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
