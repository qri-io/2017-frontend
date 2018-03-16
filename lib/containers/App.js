
import { connect } from 'react-redux'

import { hideMenu, resetMessage, resetErrorMessage, showModal, hideModal, pingApi } from '../actions/app'
import { layoutResize } from '../actions/layout'
import { loadSessionPeer } from '../actions/session'
import { selectSessionPeer } from '../selectors/session'

import App from '../components/App'

const AppContainer = connect(
  (state, ownProps) => {
    return {
      apiConnection: state.app.apiConnection,
      message: state.app.message,
      errorMessage: state.errorMessage,
      sessionPeer: selectSessionPeer(state),
      showMenu: state.app.showMenu,
      layout: state.layout,
      // https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
      location: state.routing.location,
      modal: state.app.modal
    }
  }, {
    resetMessage,
    resetErrorMessage,
    loadSessionPeer,
    layoutResize,
    hideMenu,
    showModal,
    hideModal,
    pingApi
  }
)(App, 'App')

export default AppContainer
