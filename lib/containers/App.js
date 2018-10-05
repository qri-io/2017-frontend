
import { connect } from 'react-redux'

import { hideMenu, resetMessage, resetErrorMessage, showModal, hideModal, pingApi, apiConnectionFail } from '../actions/app'
import { layoutResize } from '../actions/layout'
import { loadDatasets } from '../actions/dataset'
import { loadProfiles } from '../actions/profiles'
import { loadHistoryByName } from '../actions/history'
import { loadSessionProfile } from '../actions/session'
import { selectSessionProfileId, selectSessionDatasetIds, selectSessionDatasets } from '../selectors/session'

import App from '../components/App'

const AppContainer = connect(
  (state, ownProps) => {
    return Object.assign({
      editorDirty: state.editor.dirty,
      acceptedTOS: state.app.acceptedTOS,
      apiConnection: state.app.apiConnection,
      message: state.app.message,
      errorMessage: state.errorMessage,
      sessionProfile: selectSessionProfileId(state),
      showMenu: state.app.showMenu,
      layout: state.layout,
      // https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
      location: state.router.location,
      modal: state.app.modal,
      datasetIds: selectSessionDatasetIds(state),
      datasets: selectSessionDatasets(state)
    }, ownProps)
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
    loadProfiles,
    loadHistoryByName
  }
)(App, 'App')

export default AppContainer
