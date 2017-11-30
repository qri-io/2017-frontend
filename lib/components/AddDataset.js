/* global alert */
import React from 'react'
import PropTypes from 'prop-types'

import { debounce } from 'lodash'

import Base from './Base'
import DropFile from './form/DropFile'
import ValidInput from './form/ValidInput'
import UrlInput from './form/UrlInput'
import LoadingButton from './chrome/LoadingButton'
import Spinner from './Spinner'

export default class AddDataset extends Base {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      disabled: true,
      message: '',
      urlError: '',
      dataset: {
        name: '',
        url: '',
        files: undefined,
        file_input: undefined
      }
    };

    [
      'onDatasetAddResponse',
      'onDatasetAddSuccess',
      'onDatasetAddFailure',
      'handleChange',
      'handleSubmit',
      'handleUrlChange',
      'handleValidateUrl',
      'handleButtonToggle'
    ].forEach((m) => { this[m] = this[m].bind(this) })

    this.debounceValidateUrl = debounce((url) => {
      this.handleValidateUrl(url)
    }
    , 0)
  }

  handleChange (name, value, e) {
    // console.log(name, value)
    let fileInput = this.state.dataset.file_input
    if (e.target.type === 'file') {
      fileInput = e.target
    }
    if (name === 'name' && value.slice(-1) === ' ') {
      return
    }
    this.setState(Object.assign({}, this.state, {
      dataset: Object.assign(this.state.dataset, { [name]: value, file_input: fileInput })
    }))
    this.handleButtonToggle()
  }

  shouldComponentUpdate () {
    return true
  }

  onDatasetAddSuccess () {
    this.setState({ loading: false })
    this.props.loadDatasets(() => {
      this.props.goBack()
      alert(`${this.state.dataset.name} added to datasets!`)
    })
  }

  onDatasetAddFailure (error) {
    this.setState({ loading: false, message: `Error: ${error}` })
  }

  onDatasetAddResponse (error) {
    error ? this.onDatasetAddFailure(error) : this.onDatasetAddSuccess()
  }

  handleSubmit (e) {
    const { dataset } = this.state
    e.preventDefault()
    this.setState({ loading: true, message: '' })
    this.props.initDataset(dataset.name, dataset.files, dataset.url, this.onDatasetAddResponse)
  }

  handleValidateUrl (url) {
    if (url.startsWith('http://') || url.startsWith('https://') || !url) {
      this.setState({urlError: ''})
    } else {
      this.setState({urlError: 'Error: url must begin with "http://" or "https://"'})
    }
    this.handleButtonToggle()
  }

  handleUrlChange (name, value, e) {
    this.debounceValidateUrl(value)
    this.handleChange(name, value, e)
  }

  handleButtonToggle () {
    const { dataset, urlError } = this.state
    let enable = !!dataset.name && ((dataset.url.length > 7 && !urlError) || dataset.files)
    this.setState({disabled: !enable})
  }

  template (css) {
    const { loading, dataset, message, disabled } = this.state
    return (
      <div className={css('wrap')}>
        <h1>Add a Dataset</h1>
        <hr />
        <div>
          <div className={css('name')}>
            <ValidInput type='text' name='name' label='Dataset Name' value={dataset.name} onChange={this.handleChange} />
          </div>
          <UrlInput type='text' name='url' label='Add Dataset From URL' value={dataset.url} onChange={this.handleUrlChange} error={this.state.urlError} disabled={this.state.dataset.files} />
          <div>OR</div>
          <DropFile name='files' onChange={this.handleChange} label='Add Dataset From Upload' disabled={this.state.dataset.url} />
          <div className={css('buttonWrap')}>
            <LoadingButton className={css('button')} loading={disabled} onClick={this.handleSubmit}><span>Add Dataset</span></LoadingButton>
            <div className={css('message')}>{loading ? <div className={css('spinnerOffset')} ><Spinner center={false} /></div> : message }</div>
          </div>
        </div>
      </div>
    )
  }

  styles (props) {
    return {
      wrap: {
        marginTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        width: 600
      },
      button: {
        marginTop: 10
      },
      buttonWrap: {
        height: 60,
        width: '100%',
        display: 'flex'
      },
      message: {
        display: 'inline-block',
        width: 250,
        margin: 'auto'
      },
      name: {
        marginBottom: 60
      },
      spinnerOffset: {
        marginLeft: 50
      }
    }
  }
}

AddDataset.propTypes = {
  initDataset: PropTypes.func
}

AddDataset.defaultProps = {
  permissions: {
    edit: false,
    migrate: false,
    change: false
  }
}
