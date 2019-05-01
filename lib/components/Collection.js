import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { DATASETS_FAILURE } from '../constants/dataset'
import ReadOnly from './ReadOnly'
import Datasets from './Datasets'
import PageTitle from './PageTitle'
import StatsSection from './StatsSection'
import Button from './chrome/Button'

class Collection extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      message: 'No Datasets',
      error: false
    };

    [
      'handleLoadDatasetsError',
      'handleReloadDatasets',
      'handleLoadNextPage'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentDidMount () {
    if (this.props.sessionProfileId && this.props.datasets && !this.props.datasets.length) {
      this.props.clearPaginationIds('popularDatasets', this.props.sessionProfileId)
      this.props.loadDatasets(this.props.sessionProfileId).then(action => this.handleLoadDatasetsError(action))
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.sessionProfileId !== this.props.sessionProfileId) {
      this.props.loadDatasets(this.props.sessionProfileId).then(action => this.handleLoadDatasetsError(action))
    }
  }

  handleLoadDatasetsError (action) {
    if (action.type === DATASETS_FAILURE) {
      this.setState({ message: 'There was an error loading your Datasets.', error: true })
    } else {
      this.setState({ message: 'No Datasets', error: false })
    }
  }

  handleLoadNextPage () {
    this.props.loadDatasets(this.props.sessionProfileId, this.props.nextPage).then(action => this.handleLoadDatasetsError(action))
  }

  handleReloadDatasets () {
    this.props.loadDatasets(this.props.sessionProfileId, this.props.nextPage - 1).then(action => this.handleLoadDatasetsError(action))
  }

  render () {
    if (!this.props.sessionProfileId) {
      return (<ReadOnly />)
    }
    const { message, error } = this.state
    const { datasets, fetchedAll, stats, loading, hitBottom } = this.props
    return (
      <div className='collection-wrap'>
        <div className='col border'>
          <header className='border-bottom'>
            <PageTitle pageTitle='Collection' sectionTitle='local' />
          </header>
          <Datasets
            datasets={datasets}
            loading={loading}
            fetchedAll={fetchedAll}
            message={message}
            showPublishedStatus
            hitBottom={hitBottom}
            loadNextPage={this.handleLoadNextPage}
          />
          {error && <div style={{ margin: 20 }}>
            <Button color='neutral-bold' onClick={this.handleReloadDatasets} text='reload datasets' />
          </div>}
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

export default withRouter(Collection)

Collection.propTypes = {
  searchString: PropTypes.string,
  datasets: PropTypes.array.isRequired,
  nextPage: PropTypes.number.isRequired,
  fetchedAll: PropTypes.bool,
  loadDatasets: PropTypes.func.isRequired,
  skipLoad: PropTypes.bool,
  padding: PropTypes.bool.isRequired,
  smallItems: PropTypes.bool,
  datasetsCount: PropTypes.number,
  repoSize: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number
  })
}

Collection.defaultProps = {
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
