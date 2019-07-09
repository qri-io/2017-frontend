import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { DATASETS_FAILURE } from '../../constants/dataset'
import ReadOnly from '../ReadOnly'
// import Datasets from '../Datasets'
import Logs from './Logs'
import PageTitle from '../PageTitle'
import StatsSection from '../StatsSection'
import Button from '../chrome/Button'

class Updates extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      message: 'No Logs',
      error: false
    };

    [
      'handleLoadLogsError',
      'handleReloadLogs',
      'handleLoadNextLogsPage'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentDidMount () {
    if (this.props.sessionProfileId && this.props.jobs && !this.props.jobs.length) {
      this.props.clearPaginationIds('updateJobs', 'updateJobs')
      this.props.loadLogs().then(action => this.handleLoadLogsError(action))
    }

    if (this.props.sessionProfileId && this.props.logs && !this.props.logs.length) {
      this.props.clearPaginationIds('updateLogs', 'updateLogs')
      this.props.loadLogs().then(action => this.handleLoadLogsError(action))
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.sessionProfileId !== this.props.sessionProfileId) {
      this.props.loadLogs().then(action => this.handleLoadLogsError(action))
    }
  }

  handleLoadLogsError (action) {
    if (action.type === DATASETS_FAILURE) {
      this.setState({ message: 'There was an error loading your Datasets.', error: true })
    } else {
      this.setState({ message: 'No Datasets', error: false })
    }
  }

  handleLoadNextLogsPage () {
    this.props.loadLogs(this.props.logsNextPage).then(action => this.handleLoadLogsError(action))
  }

  handleReloadLogs () {
    this.props.loadLogs(this.props.logsNextPage - 1).then(action => this.handleLoadLogsError(action))
  }

  render () {
    if (!this.props.sessionProfileId) {
      return (<ReadOnly />)
    }
    const { message, error } = this.state
    const { logs, logsFetchedAll, stats, logsLoading, hitBottom } = this.props
    return (
      <div className='collection-wrap'>
        <div className='col border'>
          <header className='border-bottom'>
            <PageTitle pageTitle='Updates' sectionTitle='local' />
          </header>
          <Logs
            logs={logs}
            loading={logsLoading}
            fetchedAll={logsFetchedAll}
            message={message}
            hitBottom={hitBottom}
            loadNextPage={this.handleLoadNextLogsPage}
          />
        </div>
        <div className='col favored border-top'>
          <header className='border-bottom'>
            <StatsSection stats={stats} />
          </header>
        </div>
      </div>
    )
  }
}

export default withRouter(Updates)

Updates.propTypes = {
  // searchString: PropTypes.string,
  // datasets: PropTypes.array.isRequired,
  // nextPage: PropTypes.number.isRequired,
  // fetchedAll: PropTypes.bool,
  // loadLogs: PropTypes.func.isRequired,
  // skipLoad: PropTypes.bool,
  // padding: PropTypes.bool.isRequired,
  // smallItems: PropTypes.bool,
  // datasetsCount: PropTypes.number,
  // repoSize: PropTypes.shape({
  //   name: PropTypes.string,
  //   value: PropTypes.number
  // })
}

Updates.defaultProps = {
  skipLoad: false,
  smallItems: false,
  padding: true,
  stats: [
    {
      title: 'datasets',
      stat: '4'
    },
    {
      title: 'commits',
      stat: '240'
    },
    {
      title: 'total repo size',
      stat: '46MB'
    }]
}
