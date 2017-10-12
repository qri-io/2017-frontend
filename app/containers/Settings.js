import { connect } from 'react-redux'

// import { loadSettings } from '../actions/settings'
// import { selectSettings } from '../selectors/settings'

import Settings from '../components/Settings'

const SettingsContainer = connect(
  (state, ownProps) => {
    return Object.assign({
      // TODO - stuff.
    }, ownProps)
  }, {
    // loadSettings
  }
)(Settings, 'Settings')

export default SettingsContainer
