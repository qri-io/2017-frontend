import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../chrome/Spinner'
import ProfileForm from '../form/ProfileForm'
import Button from '../chrome/Button'
import ReadOnly from '../ReadOnly'

import { SET_SESSION_PROFILE_SUCCESS } from '../../constants/session'

export default class ProfileEditor extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      message: '',
      peername: true
    };
    [
      'handleChange',
      'handleCancel',
      'handleSave',
      'renderButtons'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentDidMount () {
    if (!this.props.profile) {
      this.props.loadSessionProfile()
    } else if (!this.props.localProfile) {
      this.props.createLocalSession(this.props.profile)
    }
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.profile && !this.props.profile) {
      this.props.loadSessionProfile()
    } else if (!this.props.localProfile && this.props.profile) {
      this.props.createLocalSession(this.props.profile)
    } else {
      this.setState({ loading: false })
    }
  }

  componentWillUnmount () {
    this.handleCancel()
  }

  handleChange (name, value) {
    const { localProfile } = this.props
    const change = Object.assign(localProfile, { [name]: value })
    if (name === 'peername') {
      this.setState({ peername: !!value })
    }
    this.props.updateSession(change)
  }

  handleSave () {
    this.setState({
      loading: true,
      message: ''
    })
    this.props.saveSessionProfile(this.props.localProfile).then(action => {
      if (action.type === SET_SESSION_PROFILE_SUCCESS) {
        this.setState({
          loading: false,
          message: ''
        })
        this.props.hideModal()
      } else {
        console.log(`SET_SESSION_PROFILE_FAILURE: ${action.error}`)
        this.setState({
          loading: false,
          message: `Error updating profile: ${action.error}`
        })
      }
    })
  }

  renderButtons () {
    return (
      <div className='profile-editor-buttons'>
        <Button color='a' type='submit' text='Save' onClick={this.handleSave} loading={this.state.loading} disabled={!(this.state.peername)} />
        <div className='profile-editor-cancel'>
          <Button color='neutral-bold' onClick={this.handleCancel} text='Cancel' />
        </div>
      </div>
    )
  }

  handleCancel () {
    this.setState({ message: '' })
    this.props.updateSession(this.props.profile)
    this.props.hideModal()
  }

  render () {
    if (!this.props.profile) {
      return (<ReadOnly />)
    }

    const { localProfile } = this.props
    return (
      <div className='profile-editor-wrap'>
        <header>
          <h1 className='white'>Profile Editor</h1>
        </header>
        { localProfile ? <div><ProfileForm
          profile={localProfile}
          onChange={this.handleChange}
        />{this.renderButtons()}<div className='profile-editor-note'>{this.state.message || 'All fields optional, except peername. All fields are publically displayed'}</div></div> : <Spinner />}
      </div>
    )
  }
}

ProfileEditor.propTypes = {
  profile: PropTypes.object
}

ProfileEditor.defaultProps = {
}
