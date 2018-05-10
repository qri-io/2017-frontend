
import { connect } from 'react-redux'

import { hideMenu, resetMessage, resetErrorMessage, showModal, hideModal, pingApi, apiConnectionFail } from '../actions/app'
import { layoutResize } from '../actions/layout'
import { loadDatasets } from '../actions/dataset'
import { loadProfiles } from '../actions/profiles'
import { loadSessionProfile } from '../actions/session'
import { selectSessionProfileId } from '../selectors/session'

import App from '../components/App'

const AppContainer = connect(
  (state, ownProps) => {
    return {
      apiConnection: state.app.apiConnection,
      message: state.app.message,
      errorMessage: state.errorMessage,
      sessionProfile: selectSessionProfileId(state),
      showMenu: state.app.showMenu,
      layout: state.layout,
      // https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
      location: state.routing.location,
      modal: state.app.modal
    }
  }, {
    resetMessage,
    resetErrorMessage,
    loadSessionProfile,
    layoutResize,
    hideMenu,
    showModal,
    hideModal,
    pingApi,
    apiConnectionFail,
    loadDatasets,
    loadProfiles

  }
)(App, 'App')

export default AppContainer
