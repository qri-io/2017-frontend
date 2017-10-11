import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import DropFile from './form/DropFile'
import ValidInput from './form/ValidInput'
import LoadingButton from './chrome/LoadingButton'

export default class AddDataset extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      dataset: {
        name: '',
        files: undefined
      }
    };

    [
      'handleChange',
      'handleSubmit'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleChange (name, value) {
    this.setState(Object.assign({}, this.state, {
      dataset: Object.assign(this.state.dataset, { [name]: value })
    }))
  }

  handleSubmit (e) {
    const { dataset } = this.state
    e.preventDefault()
    this.setState({ loading: true })
    this.props.initDataset(dataset.name, dataset.files, (action) => {
      this.setState({ loading: false })
      this.props.push('/')
    })
  }

  render () {
    const { loading, dataset } = this.state

    return (
      <div id='wrapper' className='page'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 offset-md-2'>
              <h1>Add a Dataset</h1>
              <hr />
              <ValidInput type='text' name='name' label='Dataset Name' value={dataset.name} onChange={this.handleChange} />
              <DropFile name='files' onChange={this.handleChange} />
              <LoadingButton loading={loading} onClick={this.handleSubmit}><span>Add Dataset</span></LoadingButton>
              <hr />
            </div>
          </div>
        </div>
      </div>
    )
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
