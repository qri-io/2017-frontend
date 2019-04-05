import React from 'react'

import AppDrag from './AppDrag'
import ReadOnly from './ReadOnly'
import TextInput from './form/TextInput'
import Spinner from './chrome/Spinner'

import { SET_SESSION_PROFILE_SUCCESS } from '../constants/session'

export default class ChoosePeername extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: ''
    };

    [
      'handleChange',
      'handleSave'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentDidMount () {
    if (!this.props.sessionProfile) {
      this.props.loadSessionProfile()
    } else if (!this.props.localProfile) {
      this.props.createLocalSession(this.props.sessionProfile)
    }
  }

  componentDidUpdate (nextProps) {
    if (!this.props.localProfile && this.props.sessionProfile) {
      this.props.createLocalSession(this.props.sessionProfile)
    }
  }

  handleChange (name, value, event) {
    const { localProfile } = this.props
    if (value[value.length - 1] === ' ') {
      return
    }
    const change = Object.assign(localProfile, { peername: value })
    this.props.updateSession(change)
  }

  handleSave () {
    this.setState({
      loading: true,
      error: ''
    })
    this.props.saveSessionProfile(this.props.localProfile).then(action => {
      if (action.type === SET_SESSION_PROFILE_SUCCESS) {
        this.props.loadDatasets(this.props.sessionProfile.id).then(() =>
          this.props.hasSetPeername()
        )
      } else {
        this.setState({
          loading: false,
          error: `${action.error}`
        })
      }
    })
  }

  render () {
    const { sessionProfile, localProfile } = this.props
    if (!sessionProfile) {
      return <ReadOnly />
    }
    if (!localProfile) {
      return (
        <div className='choose-peername-page'>
          <AppDrag />
          <div className='choose-peername-center'>
            <Spinner />
          </div>
        </div>
      )
    }
    return (
      <div className='choose-peername-page'>
        <AppDrag />
        <div className='choose-peername-center'>
          <div>
            <h1>Choose Your Peername</h1>
            <h6>Your peername is your identity on the Qri network</h6>
          </div>
          <div className='choose-peername-peername'>
            <TextInput
              label='peername: '
              value={localProfile.peername}
              errorText={this.state.error}
              onChange={this.handleChange} />
          </div>
          <div className='choose-peername-accept'>
            {this.state.loading ? <Spinner center={false} /> : <a className='linkLarge' onClick={this.handleSave}>Take me to Qri <span className='icon-inline'>right</span></a>}
          </div>
        </div>
      </div>
    )
  }
}

ChoosePeername.propTypes = {
}

ChoosePeername.defaultProps = {
  onAccept: () => {},
  onExit: () => {}
}
