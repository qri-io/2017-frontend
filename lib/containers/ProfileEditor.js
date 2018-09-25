import { connect } from 'react-redux'

import { loadSessionProfile, saveSessionProfile, updateSession, createLocalSession } from '../actions/session'
import { selectSessionProfile, selectLocalProfile } from '../selectors/session'
import { hideModal } from '../actions/app'

import ProfileEditor from '../components/profile/ProfileEditor'

const ProfileEditorContainer = connect(
  (state, ownProps) => {
    return Object.assign({
      profile: selectSessionProfile(state),
      localProfile: selectLocalProfile(state)
    }, ownProps)
  }, {
    loadSessionProfile,
    updateSession,
    saveSessionProfile,
    createLocalSession,
    hideModal
  }
)(ProfileEditor, 'ProfileEditor')

export default ProfileEditorContainer
