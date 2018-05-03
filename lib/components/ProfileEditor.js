import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import TabPanel from './TabPanel'
import Spinner from './Spinner'
import ProfileForm from './form/ProfileForm'
import { Palette, defaultPalette } from '../propTypes/palette'

export default class ProfileEditor extends Base {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    };
    [
      'handleChange',
      'handleCancel',
      'handleSave'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    this.props.createLocalSession(this.props.profile)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.profile && !nextProps.profile) {
      this.props.loadSessionProfile()
    } else if (!nextProps.localProfile && nextProps.profile) {
      this.props.updateSession(nextProps.profile)
    } else {
      this.setState({loading: false})
    }
  }

  handleChange (name, value) {
    const { localProfile } = this.props
    const change = Object.assign(localProfile, { [name]: value })
    this.props.updateSession(change)
  }

  handleSave () {
    this.props.saveProfile(this.props.localProfile)
    this.props.loadProfileEditor()
  }

  handleCancel () {
    this.props.updateSession(this.props.profile)
  }

  template (css) {
    const { index, profile, localProfile} = this.props
    return (
      <div className={css('wrap')} >
        <header>
          <h1>ProfileEditor</h1>
          { profile && profile.id ? <p><b className={css('name')}>my hash:</b> {profile.id}</p> : undefined}
          <hr />
        </header>
        { localProfile ? <ProfileForm
          profile={localProfile}
          onChange={this.handleChange}
          onSubmit={this.handleSave}
          onCancel={this.handleCancel}
        /> : <Spinner />}
      </div>
    )
  }

  styles () {
    const {palette} = this.props
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
