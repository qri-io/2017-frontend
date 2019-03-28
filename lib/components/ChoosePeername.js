import React from 'react'
import Base from './Base'
import AppDrag from './AppDrag'
import ReadOnly from './ReadOnly'
import TextInput from './form/TextInput'
import Spinner from './chrome/Spinner'

import { SET_SESSION_PROFILE_SUCCESS } from '../constants/session'

import { defaultPalette } from '../propTypes/palette'

export default class ChoosePeername extends Base {
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

  componentWillReceiveProps (nextProps) {
    if (!nextProps.localProfile && nextProps.sessionProfile) {
      this.props.createLocalSession(nextProps.sessionProfile)
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

  template (css) {
    const { sessionProfile, localProfile } = this.props
    if (!sessionProfile) {
      return <ReadOnly />
    }
    if (!localProfile) {
      return (
        <div className={css('page')}>
          <AppDrag />
          <div className={css('center')}>
            <Spinner />
          </div>
        </div>
      )
    }
    return (
      <div className={css('page')}>
        <AppDrag />
        <div className={css('center')}>
          <div className={css('header')}>
            <h1>Choose Your Peername</h1>
            <h6>Your peername is your identity on the Qri network</h6>
          </div>
          <div className={css('peername')}>
            <TextInput
              label='peername: '
              value={localProfile.peername}
              errorText={this.state.error}
              onChange={this.handleChange} />
          </div>
          <div className={css('accept')}>
            {this.state.loading ? <Spinner center={false} /> : <a className='linkLarge' onClick={this.handleSave}>Take me to Qri <span className='icon-inline'>right</span></a>}
          </div>
        </div>
      </div>
    )
  }
  styles () {
    const palette = defaultPalette
    return {
      'page': {
        background: palette.background,
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
      },
      'center': {
        width: 600,
        padding: '5em',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
      },
      accept: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'baseline'
      },
      peername: {
        height: 60
      }
    }
  }
}

ChoosePeername.propTypes = {
}

ChoosePeername.defaultProps = {
  onAccept: () => {},
  onExit: () => {}
}
