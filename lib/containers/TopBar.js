import { connect } from 'react-redux'

import { setLocationBarText, setSearch } from '../actions/app'
import { loadHistoryByName } from '../actions/history'
import { selectSessionProfileId } from '../selectors/session'
import history from '../history'
import { selectLocation } from '../selectors/app'
import { runDatasetSearch } from '../actions/dataset'

import TopBar from '../components/chrome/TopBar'

const TopBarContainer = connect(
  (state, ownProps) => {
    return {
      sessionProfile: selectSessionProfileId(state),
      showMenu: state.app.showMenu,
      layout: state.layout.topbar,
      location: history.location,
      viewMode: state.app.viewMode,
      searchString: selectLocation(state),
      history
    }
  }, {
    loadHistoryByName,
    setLocationBarText,
    runDatasetSearch,
    setSearch
  }
)(TopBar, 'TopBar')

export default TopBarContainer
