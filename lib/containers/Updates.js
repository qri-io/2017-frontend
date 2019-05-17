import { connect } from 'react-redux'

import { showModal, clearPaginationIds } from '../actions/app'
import { loadJobs, loadLogs } from '../actions/update'
import {
  jobsSection, selectJobs, selectNoJobs,
  logsSection, selectLogs, selectNoLogs
} from '../selectors/update'
import { selectSessionProfileId } from '../selectors/session'
import { selectStats } from '../selectors/stats'
import { selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'

import Updates from '../components/update/Updates'

const UpdatesContainer = connect(
  (state, ownProps) => {
    const sessionProfileId = selectSessionProfileId(state)

    return Object.assign({
      sessionProfileId,

      jobs: selectJobs(state),
      noJobs: selectNoJobs(state),
      jobsLoading: selectIsFetching(state, jobsSection, jobsSection),
      jobsNextPage: selectPageCount(state, jobsSection, jobsSection) + 1,
      jobsFetchedAll: selectFetchedAll(state, jobsSection, jobsSection),

      logs: selectLogs(state),
      noLogs: selectNoLogs(state),
      logsLoading: selectIsFetching(state, logsSection, logsSection),
      logsNextPage: selectPageCount(state, logsSection, logsSection) + 1,
      logsFetchedAll: selectFetchedAll(state, logsSection, logsSection),

      stats: selectStats(state),
      hitBottom: state.app.hitBottom
    }, ownProps)
  }, {
    loadJobs,
    loadLogs,

    showModal,
    clearPaginationIds
  }
)(Updates, 'Updates')

export default UpdatesContainer
