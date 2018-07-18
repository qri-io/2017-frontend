import { connect } from 'react-redux'

import { setViewMode, setSearch } from '../actions/app'
import { loadHistoryByName } from '../actions/history'
import { selectSessionProfileId } from '../selectors/session'
import { history } from '../store/configureStore'
import { selectSearchString } from '../selectors/app'
import { runDatasetSearch } from '../actions/dataset'

import TopBar from '../components/TopBar'

const TopBarContainer = connect(
  (state, ownProps) => {
    return {
      sessionProfile: selectSessionProfileId(state),
      showMenu: state.app.showMenu,
      layout: state.layout.topbar,
      location: state.routing.location,
      viewMode: state.app.viewMode,
      searchString: selectSearchString(state),
      history
    }
  }, {
    loadHistoryByName,
    setViewMode,
    setSearch,
    runDatasetSearch
  }
)(TopBar, 'TopBar')

export default TopBarContainer
