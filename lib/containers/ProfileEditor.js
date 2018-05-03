import { connect } from 'react-redux'

import {loadSessionProfile, saveSessionProfile, updateSession, createLocalSession} from '../actions/session'
import {selectSessionProfile, selectLocalProfile} from '../selectors/session'

import ProfileEditor from '../components/ProfileEditor'

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
    createLocalSession
  }
)(ProfileEditor, 'ProfileEditor')

export default ProfileEditorContainer
