import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// import { debounce } from 'lodash'

import { DATASETS_FAILURE } from '../constants/dataset'

import Base from './Base'
import ReadOnly from './ReadOnly'

import Datasets from './Datasets'
import PageTitle from './PageTitle'
import StatsSection from './StatsSection'
import Button from './chrome/Button'

class Collection extends Base {
  constructor (props) {
    super(props)

    this.state = {
      loading: !(props.fetchedAll || props.datasets.length > 0),
      message: 'No Datasets',
      error: false
    };

    [
      'handleLoadDatasetsError',
      'handleReloadDatasets',
      'handleLoadNextPage'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (this.props.sessionProfileId && this.props.datasets && !this.props.datasets.length) {
      this.props.clearPaginationIds('popularDatasets', this.props.sessionProfileId)
      this.props.loadDatasets(this.props.sessionProfileId).then(action => this.handleLoadDatasetsError(action))
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.sessionProfileId !== nextProps.sessionProfileId) {
      this.props.loadDatasets(nextProps.sessionProfileId).then(action => this.handleLoadDatasetsError(action))
    } else if (this.state.loading && (!nextProps.loading || this.state.error || nextProps.datasets.length || nextProps.fetchedAll || nextProps.noDatasets)) {
      this.setState({ loading: false })
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

  template (css) {
    if (!this.props.sessionProfileId) {
      return (<ReadOnly />)
    }

    const { message, loading, error } = this.state
    const { stats, datasets, fetchedAll } = this.props

    return (
      <div className={css('wrap')}>
        <div className={`sectionWidth border-top ${css('col1')}`} >
          <div className='border-bottom border-right headerHeight'>
            <PageTitle pageTitle='Collection' sectionTitle='local' />
          </div>
          <div className='sectionWidth' >
            <Datasets datasets={datasets} loading={loading} fetchedAll={fetchedAll} message={message} />
            {error ? <div className={css('reload')}><Button color='neutral-bold' onClick={this.handleReloadDatasets} text='reload datasets' /></div> : undefined }
          </div>
        </div>
        <div className={`border-top ${css('col2')}`}>
          <div className='border-bottom headerHeight' >
            <StatsSection stats={stats} />
          </div>
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        height: '100%',
        display: 'flex'
      },
      col2: {
        width: '100%'
      }
    }
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
  smallItems: PropTypes.bool
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
