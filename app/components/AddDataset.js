import React, { PropTypes } from 'react'
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
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 offset-md-2'>
              <h1 className={css('wrap')}>Add a Dataset</h1>
              <hr />
              <ValidInput type='text' name='name' label='Dataset Name' value={dataset.name} onChange={this.handleChange} />
              <DropFile name='files' onChange={this.handleChange} />
              <LoadingButton className={css('button')} loading={loading} onClick={this.handleSubmit}><span>Add Dataset</span></LoadingButton>
              { loading ? <Spinner /> : undefined}
              { message ? <div className={css('message')}><p>{message}</p></div> : undefined}
              <hr />
            </div>
          </div>
        </div>
      </div>
    )
  }

  styles (props) {
    return {
      button: {
        marginTop: '10px'
      },
      message: {
        marginTop: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40%'
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
