import { connect } from 'react-redux'

import { setViewMode } from '../actions/app'
import { loadHistoryByName } from '../actions/history'
import { selectSessionProfileId } from '../selectors/session'
import { history } from '../store/configureStore'
import { selectSearchString } from '../selectors/app'
import { setSearch } from '../actions/app'

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
    setSearch
  }
)(TopBar, 'TopBar')

export default TopBarContainer
