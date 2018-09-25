import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import Spinner from '../chrome/Spinner'
import ProfileForm from '../form/ProfileForm'
import Button from '../chrome/Button'
import { Palette, defaultPalette } from '../../propTypes/palette'
import ReadOnly from '../ReadOnly'

import { SET_SESSION_PROFILE_SUCCESS } from '../../constants/session'

export default class ProfileEditor extends Base {
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

  componentWillMount () {
    if (!this.props.profile) {
      this.props.loadSessionProfile()
    } else if (!this.props.localProfile) {
      this.props.createLocalSession(this.props.profile)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.profile && !nextProps.profile) {
      this.props.loadSessionProfile()
    } else if (!nextProps.localProfile && nextProps.profile) {
      this.props.createLocalSession(nextProps.profile)
    } else {
      this.setState({ loading: false })
    }
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

  renderButtons (css) {
    return (
      <div className={css('buttons')}>
        <Button color='a' type='submit' text='Save' onClick={this.handleSave} loading={this.state.loading} disabled={!(this.state.peername)} />
        <div className={css('cancel')}>
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

  template (css) {
    if (!this.props.profile) {
      return (<ReadOnly />)
    }

    const { localProfile } = this.props
    return (
      <div className={css('wrap')}>
        <header>
          <h1>Profile Editor</h1>
        </header>
        { localProfile ? <div><ProfileForm
          profile={localProfile}
          onChange={this.handleChange}
        />{this.renderButtons(css)}<div className={css('note')}>All fields optional, except peername. All fields are publically displayed</div></div> : <Spinner />}
        <div className={css('message')}>
          {this.state.message}
        </div>
      </div>
    )
  }

  styles () {
    const { palette } = this.props
    return {
      wrap: {
        marginTop: 40,
        paddingLeft: 20,
        paddingRight: 20
      },
      name: {
        color: palette.b,
        fontFamily: '"source code pro", "courier", "monospace"',
        fontWeight: '300'
      },
      tabPanelWrap: {
        margin: 20
      },
      buttons: {
        float: 'right'
      },
      cancel: {
        marginLeft: 10,
        display: 'inline-block'
      },
      message: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: '45%'
      },
      note: {
        position: 'absolute',
        bottom: 30,
        width: '35%'
      }
    }
  }
}

ProfileEditor.propTypes = {
  profile: PropTypes.object,
  palette: Palette
}

ProfileEditor.defaultProps = {
  palette: defaultPalette
}
