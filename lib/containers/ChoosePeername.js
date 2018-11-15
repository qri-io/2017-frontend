import { connect } from 'react-redux'

import { loadDatasets } from '../actions/dataset'
import { loadSessionProfile, saveSessionProfile, updateSession, createLocalSession } from '../actions/session'
import { selectSessionProfile, selectLocalProfile } from '../selectors/session'
import { hasSetPeername } from '../actions/app'

import ChoosePeername from '../components/ChoosePeername'

const ChoosePeernameContainer = connect(
  (state, ownProps) => {
    return Object.assign({
      sessionProfile: selectSessionProfile(state),
      localProfile: selectLocalProfile(state)
    }, ownProps)
  }, {
    loadSessionProfile,
    updateSession,
    saveSessionProfile,
    createLocalSession,
    hasSetPeername,
    loadDatasets
  }
)(ChoosePeername, 'ChoosePeername')

export default ChoosePeernameContainer
