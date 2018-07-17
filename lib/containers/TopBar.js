
import { connect } from 'react-redux'

import { hideMenu, resetMessage, resetErrorMessage, showModal, hideModal, pingApi, apiConnectionFail, setViewMode } from '../actions/app'
import { layoutResize } from '../actions/layout'
import { loadDatasets } from '../actions/dataset'
import { loadProfiles } from '../actions/profiles'
import { loadHistoryByName } from '../actions/history'
import { loadSessionProfile } from '../actions/session'
import { selectSessionProfileId, selectSessionDatasetIds, selectSessionDatasets } from '../selectors/session'

import TopBar from '../components/TopBar'

const TopBarContainer = connect(
  (state, ownProps) => {
    let goBack, goForward
    if (ownProps.history) {
      goBack = ownProps.history.goBack,
      goForward = ownProps.history.goForward
    }

    return {
      apiConnection: state.app.apiConnection,
      message: state.app.message,
      errorMessage: state.errorMessage,
      sessionProfile: selectSessionProfileId(state),
      showMenu: state.app.showMenu,
      layout: state.layout.topbar,
      // https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
      location: state.routing.location,
      modal: state.app.modal,
      datasetIds: selectSessionDatasetIds(state),
      datasets: selectSessionDatasets(state),

      viewMode: state.app.viewMode,

      goBack,
      goForward
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
    loadProfiles,
    loadHistoryByName,
    setViewMode
  }
)(TopBar, 'TopBar')

export default TopBarContainer
