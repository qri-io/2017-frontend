import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Base from './Base'
import DropFile from './form/DropFile'
import ValidInput from './form/ValidInput'
import LoadingButton from './chrome/LoadingButton'

export default class AddDataset extends Base {
  constructor (props) {
    super(props)
    console.log('in constructor')
    this.state = {
      loading: false,
      dataset: {
        name: 'movies',
        files: undefined
      }
    };

    [
      'handleChange',
      'handleSubmit'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleChange (name, value, e) {
    console.log('in handlechnage')
    console.log('before setState')
    console.log(this.state.dataset)
    this.setState(Object.assign({}, this.state, {
      dataset: Object.assign(this.state.dataset, { name: 'WOOO' })
    }))
    console.log('after setState')
    console.log(this.state.dataset)
  }

  handleSubmit (e) {
    console.log('In handle submit')
    const { dataset } = this.state
    e.preventDefault()
    this.setState({ loading: true })
    this.props.initDataset(dataset.name, dataset.files, (action) => {
      this.setState({ loading: false })
      this.props.push('/')
    })
  }

  template (css) {
    const { loading, dataset } = this.state
    console.log('in template')
    return (
      <div className={css('wrap')}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 offset-md-2'>
              <h1 className={css('wrap')}>Add a Dataset</h1>
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
