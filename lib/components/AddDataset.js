/* global alert */
import React from 'react'
import PropTypes from 'prop-types'

import { debounce } from 'lodash'

import Base from './Base'
import ReadOnly from './ReadOnly'
import DropFile from './form/DropFile'
import ValidInput from './form/ValidInput'
import UrlInput from './form/UrlInput'
import Button from './Button'
import RadioInput from './form/RadioInput'

import { DATASET_INIT_SUCCESS } from '../constants/dataset'

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
        file: undefined,
        body: undefined,
        bodyInput: undefined
      },
      radio: 'file'
    };

    [
      'onDatasetAddResponse',
      'onDatasetAddSuccess',
      'onDatasetAddFailure',
      'handleChange',
      'handleSubmit',
      'handleUrlChange',
      'handleRadioChange',
      'handleValidateUrl',
      'handleButtonToggle'
    ].forEach((m) => { this[m] = this[m].bind(this) })

    this.debounceValidateUrl = debounce((url) => {
      this.handleValidateUrl(url)
    }
      , 0)
  }

  handleChange (name, value, e) {
    let bodyInput = this.state.dataset.bodyInput
    if (e.target.type === 'file') {
      bodyInput = e.target
    }
    if (name === 'name' && value.slice(-1) === ' ') {
      return
    }
    this.setState(Object.assign({}, this.state, {
      dataset: Object.assign({}, this.state.dataset, { [name]: value, bodyInput: bodyInput })
    }))
  }

  // shouldComponentUpdate () {
  //   return true
  // }

  componentDidUpdate () {
    this.handleButtonToggle()
  }

  onDatasetAddSuccess () {
    this.setState({ loading: false })
    this.props.loadDatasets(this.props.id).then(() => {
      this.props.goBack()
      alert(`${this.state.dataset.name} added to datasets!`)
    })
  }

  onDatasetAddFailure (error) {
    console.log(`DATASET_INIT_FAILURE: ${error}`)
    this.setState({ loading: false, message: `Error: ${error}` })
  }

  onDatasetAddResponse (action) {
    if (action.type === DATASET_INIT_SUCCESS) {
      this.onDatasetAddSuccess()
    } else {
      this.onDatasetAddFailure(action.error)
    }
  }

  handleSubmit (e) {
    const { dataset } = this.state
    e.preventDefault()
    this.setState({ loading: true, message: '' })
    this.props.initDataset(dataset.name, dataset.file, dataset.body, dataset.url).then(action => this.onDatasetAddResponse(action))
  }

  handleValidateUrl (url) {
    if (url.startsWith('http://') || url.startsWith('https://') || !url) {
      this.setState({urlError: ''})
    } else {
      this.setState({urlError: 'Error: url must begin with "http://" or "https://"'})
    }
  }

  handleRadioChange (e) {
    this.setState({radio: e.target.value})
  }

  handleUrlChange (name, value, e) {
    this.debounceValidateUrl(value)
    this.handleChange(name, value, e)
  }

  handleButtonToggle () {
    const { dataset, urlError } = this.state
    let enable = !!dataset.name && ((dataset.url.length > 7 && !urlError) || dataset.file, dataset.body)
    this.setState({disabled: !enable})
  }

  template (css) {
    if (!this.props.id) {
      return (<ReadOnly />)
    }

    const { loading, dataset, message, disabled } = this.state
    return (
      <div className={css('wrap')}>
        <div className={css('content')}>
          <h1>Add a Dataset</h1>
          <div>
            <div className={css('name')}>
              <div className={css('datasetNameText')}>My new dataset is called </div><ValidInput type='text' name='name' label='Dataset Name' value={dataset.name} onChange={this.handleChange} inline width={150} />
            </div>
            <div className={css('bodyWrap')}>
              <div className={css('bodyText')}>
              I want Qri to get the body of the dataset from a <RadioInput name='body' value='file' text='file' color='a' onChange={this.handleRadioChange} defaultChecked /> or <RadioInput name='body' value='url' text='url' color='a' onChange={this.handleRadioChange} />
              </div>
              <div className={this.state.radio === 'url' ? css('block') : css('none')}>
                <UrlInput type='text' name='url' label='Add Dataset From URL' value={dataset.url} onChange={this.handleUrlChange} error={this.state.urlError} disabled={this.state.dataset.file} />
              </div>
              <div className={this.state.radio === 'file' ? css('block') : css('none')}>
                <DropFile name='body' onChange={this.handleChange} label='Add Body From Upload' disabled={this.state.dataset.url} csv json />
              </div>
            </div>
            <div className={css('fileWrap')}>
              <div className={css('fileText')}>I want to add a dataset file to fill out the structure, metadata, transformation, and/or commit details (optional):</div>
              <DropFile name='file' onChange={this.handleChange} label='Add Dataset .yaml or .json file' yaml json />
            </div>
            <div className={css('buttonWrap')}>
              <Button loading={loading} disabled={disabled} onClick={this.handleSubmit} text='Add Dataset' name='add-dataset' />
              <div className={css('message')}>{loading ? undefined : message }</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
      },
      content: {
        margin: '40px auto',
        maxWidth: 600
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
        marginTop: 40,
        marginBottom: 60,
        display: 'flex',
        alignItems: 'center'
      },
      spinnerOffset: {
        marginLeft: 50
      },
      datasetNameText: {
        display: 'inline-block',
        marginRight: 10,
        marginBottom: 36
      },
      bodyWrap: {
        display: 'flex',
        flexDirection: 'column'
      },
      bodyText: {
        marginBottom: 20,
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between'
      },
      block: {
        display: 'block',
        height: 225
      },
      none: {
        display: 'none'
      },
      fileText: {
        marginBottom: 20
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
