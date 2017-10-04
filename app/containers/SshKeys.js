import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { selectLocalSessionUser, selectSshKeys } from '../selectors/session'
import { loadSshKeys, createSshKey, deleteSshKey } from '../actions/session'

import ValidInput from '../components/form/ValidInput'
import ValidTextarea from '../components/form/ValidTextarea'
import validateUser from '../validators/user'

import Spinner from '../components/Spinner'

class SshKeys extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showErrors: false,
      saving: false,
      loading: true,
      key: {
        name: '',
        key: ''
      }
    };

    [
      'handleChange',
      'handleSave',
      'handleDelete'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    this.props.loadSshKeys()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.keys && this.state.loading) {
      this.setState({ loading: false })
    }
  }

  handleDelete (key) {
    this.props.deleteSshKey(key.name, key.sha256)
  }
  handleChange (name, value) {
    let key = Object.assign({}, this.state.key)
    key[name] = value
    this.setState({ key })
  }
  handleSave (e) {
    // const { createSshKey } = this.props;
    e.preventDefault()

    // if (!validation.isValid) {
    //  if (!this.state.showErrors) {
    //    this.setState({ showErrors : true });
    //  }
    // } else {
    this.setState({ saving: true })
    this.props.createSshKey(this.state.key.name, this.state.key.key)
    // }
  }
  render () {
    const { key, showErrors, loading } = this.state
    const { keys, validation } = this.props

    if (loading) {
      return <Spinner />
    }

    return (
      <div className='container'>
        <div className='col-md-9 col-md-offset-3'>
          <h3>Your SSH Keys:</h3>
          <ul>
            {keys.map((k, i) => {
              return (
                <li key={i}>
                  <p>{k.name}</p>
                  <small>SHA256:</small>
                  <p>{k.sha256}</p>
                  <button
                    className='btn btn-small btn-warning'
                    onClick={() => {
                      this.handleDelete(k)
                    }}
                  >Delete</button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='clear' />
        <div className='col-md-6 col-md-offset-3'>
          <header>
            <h3>Add a Key:</h3>
            <ValidInput type='text' label='name' name='name' value={key.name} showError={showErrors} error={validation.name} onChange={this.handleChange} />
            <ValidTextarea label='paste key here' name='key' value={key.key} showError={showErrors} error={validation.description} onChange={this.handleChange} />
            <button className='btn btn-primary' disabled={showErrors} onClick={this.handleSave}>Add Key</button>
          </header>
        </div>
      </div>
    )
  }
}

SshKeys.propTypes = {
  // user: PropTypes.object,
  keys: PropTypes.array,
  validation: PropTypes.object,

  loadSshKeys: PropTypes.func.isRequired,
  createSshKey: PropTypes.func.isRequired,
  deleteSshKey: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  const user = selectLocalSessionUser(state)
  return {
    user,
    validation: validateUser(user),
    keys: selectSshKeys(state)
  }
}

export default connect(mapStateToProps, {
  loadSshKeys,
  createSshKey,
  deleteSshKey
})(SshKeys)