import React from 'react'
import PropTypes from 'prop-types'

import { debounce } from 'lodash'
import { connect } from 'react-redux'

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
    let file_input = this.state.dataset.file_input
    if (e.target.type === 'file') {
      file_input = e.target
    }
    this.setState(Object.assign({}, this.state, {
      dataset: Object.assign(this.state.dataset, { [name]: value, file_input: file_input })
    }))
    this.handleButtonToggle()
  }

  shouldComponentUpdate () {
    return true
  }

  onDatasetAddSuccess () {
    this.state.dataset.file_input.value = ''
    this.setState({
      message: 'Success! Your dataset was added.',
      loading: false,
      dataset: { name: '', files: undefined, file_input: undefined, url: '' }
    })
    this.props.loadDatasets()
    this.handleButtonToggle()
  }

  onDatasetAddFailure (error) {
    this.setState({ message: `Error: ${error}`})
  }

  onDatasetAddResponse (error) {
    this.setState({ loading: false })
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
    let enable = !!dataset.name && ((dataset.url.length > 7 && !urlError) || (dataset.files && dataset.file_input))
    this.setState({disabled: !enable})
  }

  template (css) {
    const { loading, dataset, message, disabled } = this.state
    return (
      <div className={css('wrap')}>
        <h1>Add a Dataset</h1>
        <hr />
        <div className={css('width')}>
          <div className={css('name')}>
            <ValidInput type='text' name='name' label='Dataset Name' value={dataset.name} onChange={this.handleChange} />
          </div>
          <UrlInput type='text' name='url' label='Add Dataset From URL' value={dataset.url} onChange={this.handleUrlChange} error={this.state.urlError} disabled={this.state.dataset.files} />
          <div>OR</div>
          <DropFile name='files' onChange={this.handleChange} label='Add Dataset From Upload' disabled={this.state.dataset.url} />
          <div className={css('buttonWrap')}>
            <LoadingButton className={css('button')} loading={disabled} onClick={this.handleSubmit}><span>Add Dataset</span></LoadingButton>
            { loading ? <Spinner /> : undefined}
            { message ? <div className={css('message')}>{message}</div> : undefined}
          </div>
        </div>
        <hr />
      </div>
    )
  }

  styles (props) {
    return {
      wrap: {
        paddingLeft: '20px',
        paddingRight: '20px'
      },
      button: {
        marginTop: '10px'
      },
      buttonWrap: {
        height: '60px',
        width: '100%',
        display: 'flex'
      },
      message: {
        display: 'inline-block',
        width: '70%',
        marginTop: '10px',
        marginLeft: '20px'
      },
      width: {
        width: '550px'
      },
      name: {
        marginBottom: '60px'
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
