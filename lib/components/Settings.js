import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import TabPanel from './TabPanel'
import Spinner from './Spinner'
import ProfileForm from './form/ProfileForm'
import { Palette, defaultPalette } from '../propTypes/palette'

export default class Settings extends Base {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    };
    [
      'handleSetPanel',
      'renderProfile',
      'renderTheme',
      'handleChange',
      'handleCancel',
      'handleSave'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    this.props.loadSettings()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.profile && !nextProps.profile) {
      this.props.loadSettings()
    } else if (!nextProps.localProfile && nextProps.profile) {
      this.props.updateProfile(nextProps.profile)
    } else {
      this.setState({loading: false})
    }
  }

  handleChange (name, value) {
    const { localProfile } = this.props
    const change = Object.assign(localProfile, { [name]: value })
    this.props.updateProfile(change)
  }

  handleSave () {
    this.props.saveProfile(this.props.localProfile)
    this.props.loadSettings()
  }

  handleSetPanel (i) {
    return this.props.setPanelIndex(i)
  }

  handleCancel () {
    this.props.updateProfile(this.props.profile)
  }

  renderProfile (css) {
    const { loading } = this.state
    if (loading) {
      return (<Spinner />)
    }
    return (
      <div className={css('tabPanelWrap')}>
        <ProfileForm
          profile={this.props.localProfile}
          onChange={this.handleChange}
          onSubmit={this.handleSave}
          onCancel={this.handleCancel}
        />
      </div>
    )
  }

  renderTheme (css) {
    return (
      <div className={css('tabPanelWrap')}><label>themes coming soon!</label></div>
    )
  }

  template (css) {
    const { index, profile } = this.props
    return (
      <div className={css('wrap')} >
        <header>
          <h1>Settings</h1>
          { profile && profile.id ? <p><b className={css('name')}>my hash:</b> {profile.id}</p> : undefined}
          <hr />
        </header>
        <TabPanel
          index={index}
          labels={['Profile', 'Theme']}
          onSelectPanel={this.handleSetPanel}
          components={[
            this.renderProfile(css),
            this.renderTheme(css)
          ]}
          />
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

Settings.propTypes = {
  settings: PropTypes.object,
  palette: Palette
}

Settings.defaultProps = {
  palette: defaultPalette
}
