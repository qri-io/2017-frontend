import { connect } from 'react-redux'

import { loadSettings, setPanelIndex, updateProfile, saveProfile } from '../actions/settings'
import { selectProfile, selectPanelIndex, selectTheme, selectLocalProfile } from '../selectors/settings'

import Settings from '../components/Settings'

const SettingsContainer = connect(
  (state, ownProps) => {
    return Object.assign({
      profile: selectProfile(state),
      index: selectPanelIndex(state),
      theme: selectTheme(state),
      localProfile: selectLocalProfile(state)
    }, ownProps)
  }, {
    loadSettings,
    setPanelIndex,
    updateProfile,
    saveProfile
  }
)(Settings, 'Settings')

export default SettingsContainer
