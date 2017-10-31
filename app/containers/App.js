
import { connect } from 'react-redux'

import { hideMenu, resetMessage, resetErrorMessage, showModal, hideModal, pingApi } from '../actions/app'
import { layoutResize } from '../actions/layout'
import { loadSessionUser } from '../actions/session'

import { selectSessionUser } from '../selectors/session'

import App from '../components/App'

const AppContainer = connect(
  (state, ownProps) => {
    return {
      loadedApi: state.app.loadedApi,
      message: state.app.message,
      errorMessage: state.errorMessage,
      user: selectSessionUser(state),
      showMenu: state.app.showMenu,
      layout: state.layout,
      // https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
      location: state.routing.location,
      modal: state.app.modal
    }
  }, {
    resetMessage,
    resetErrorMessage,
    loadSessionUser,
    layoutResize,
    hideMenu,
    showModal,
    hideModal,
    pingApi
  }
)(App, 'App')

export default AppContainer
