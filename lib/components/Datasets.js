import React from 'react'
import { Switch, Route } from 'react-router'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// import { debounce } from 'lodash'

import { DATASETS_FAILURE } from '../constants/dataset'

import Base from './Base'
import ReadOnly from './ReadOnly'
import SearchResultsContainer from '../containers/SearchResults'

import List from './List'
import DatasetItem from './item/DatasetItem'
import Spinner from './chrome/Spinner'
import Header from './Header'
import Button from './chrome/Button'
import { addActiveToLink } from '../utils/links.js'

class Datasets extends Base {
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
      'handleLoadNextPage',
      'renderLocalDatasets'
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

  renderLocalDatasets (css) {
    const { message, loading, error } = this.state
    const { datasets, palette, smallItems } = this.props
    return (
      <span>
        {
          loading ? <Spinner />
            : <List
              data={datasets}
              component={DatasetItem}
              emptyComponent={<label>{message}</label>}
              small={smallItems}
              palette={palette}
              loading={this.props.loading}
              fetchedAll={this.props.fetchedAll}
              onClick={this.handleLoadNextPage}
              type='datasets'
            />
        }
        {error ? <div className={css('reload')}><Button color='neutral-bold' onClick={this.handleReloadDatasets} text='reload datasets' /></div> : undefined }
      </span>
    )
  }

  template (css) {
    const { match, noHeader } = this.props

    if (!this.props.sessionProfileId) {
      return (<ReadOnly />)
    }

    const linkList = [
      {
        name: 'Local',
        link: 'datasets/local'
      },
      {
        name: 'Search Results',
        link: 'datasets/search'
      }
    ]

    const pathname = this.props.location.pathname

    return (
      <div className={css('wrap')}>
        <div className={css('list')}>
          { noHeader ? undefined : <Header text='Datasets' linkList={addActiveToLink(linkList, pathname, 'Local')} url='/' /> }
          <div className='datasetContent'>
            <Switch>
              {/*  Route to search results */}
              <Route
                path={'/datasets/search'}
                component={SearchResultsContainer}
              />
              <Route
                path={'/search'}
                component={SearchResultsContainer}
              />
              {/*  Route to local datasets */}
              <Route
                path={'/datasets/local'}
                render={() => this.renderLocalDatasets(css)}
              />
              <Route
                path={match.path}
                render={() => this.renderLocalDatasets(css)}
              />
            </Switch>
          </div>
        </div>
      </div>
    )
  }

  styles () {
    return {
      marginTop: {
        marginTop: 40
      },
      wrap: {},
      searchBox: {
        display: 'inline-block',
        wsessionProfileIdth: '50%',
        fontSize: '.9rem',
        lineHeight: '.9rem'
      },
      list: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      hr: {
        marginTop: 0
      },
      reload: {
        marginBottom: 40
      }
    }
  }
}

export default withRouter(Datasets)

Datasets.propTypes = {
  searchString: PropTypes.string,
  datasets: PropTypes.array.isRequired,
  nextPage: PropTypes.number.isRequired,
  fetchedAll: PropTypes.bool,
  loadDatasets: PropTypes.func.isRequired,
  skipLoad: PropTypes.bool,
  padding: PropTypes.bool.isRequired,
  smallItems: PropTypes.bool
}

Datasets.defaultProps = {
  showStats: true,
  skipLoad: false,
  smallItems: false,
  padding: true,
  statItem: [
    {
      icon: 'document',
      title: 'network-wsessionProfileIde datasets',
      stat: '245k'
    },
    {
      icon: 'harddrive',
      title: 'network-wsessionProfileIde data size',
      stat: '4.5Tib'
    },
    {
      icon: 'link',
      title: 'transferred',
      stat: '2.4Gib'
    }]
}
