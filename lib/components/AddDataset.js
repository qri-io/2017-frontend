import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Base from './Base'
import DropFile from './form/DropFile'
import ValidInput from './form/ValidInput'
import LoadingButton from './chrome/LoadingButton'
import Spinner from './Spinner'

export default class AddDataset extends Base {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      message: '',
      dataset: {
        name: '',
        url: '',
        files: '',
        file_input: undefined
      }
    };

    [
      'onDatasetAddResponse',
      'onDatasetAddSuccess',
      'onDatasetAddFailure',
      'handleChange',
      'handleSubmit'
    ].forEach((m) => { this[m] = this[m].bind(this) })
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
  }

  shouldComponentUpdate () {
    return true
  }

  onDatasetAddSuccess () {
    this.state.dataset.file_input.value = ''
    this.setState({ message: 'Success! Your dataset was added.', loading: false, dataset: { name: '', files: undefined, file_input: undefined } })
    this.props.loadDatasets()
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
    this.props.initDataset(dataset.name, dataset.files, this.onDatasetAddResponse)
  }

  template (css) {
    const { loading, dataset, message } = this.state
    return (
      <div className={css('wrap')}>
        <h1>Add a Dataset</h1>
        <hr />
        <div className={css('width')}>
          <div className={css('name')}>
            <ValidInput type='text' name='name' label='Dataset Name' value={dataset.name} onChange={this.handleChange} />
          </div>
          <ValidInput type='text' name='url' label='Add Dataset From URL' value={dataset.url} onChange={this.handleChange} />
          <div className={css('center')}>OR</div>
          <DropFile name='files' onChange={this.handleChange} label='Add Dataset From Upload' />
          <LoadingButton className={css('button')} loading={loading} onClick={this.handleSubmit}><span>Add Dataset</span></LoadingButton>
          { loading ? <Spinner /> : undefined}
          { message ? <div className={css('message')}><p>{message}</p></div> : undefined}
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
      message: {
        marginTop: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40%'
      },
      center: {
        // marginLeft: 'auto',
        // marginRight: 'auto',
        // width: '100px'
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
