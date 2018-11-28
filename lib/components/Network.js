import React from 'react'
import PropTypes from 'prop-types'
// import { debounce } from 'lodash'

import {
  REGISTRY_LIST_FAILURE
} from '../constants/registry'

import Base from './Base'
import List from './List'
import ProfileItem from './item/ProfileItem'
import Datasets from './Datasets'
import PageTitle from './PageTitle'

export default class Network extends Base {
  constructor (props) {
    super(props)
    this.state = {
      message: 'No Datasets',
      error: false
    };
    [
      'handleLoadDatasetsError'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.skipLoad) {
      this.props.loadProfiles()
    } else if (!this.props.datasets && !this.props.datasetsFetchedAll) {
      this.props.loadRegistryDatasets().then(action => this.handleLoadDatasetsError(action))
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.datasets && !nextProps.datasetsFetchedAll && !nextProps.datasetsLoading) {
      this.props.loadDatasets(nextProps.sessionProfileId).then(action => this.handleLoadDatasetsError(action))
    }
  }

  handleLoadDatasetsError (action) {
    if (action.type === REGISTRY_LIST_FAILURE) {
      this.setState({ message: 'There was an error loading your Datasets.', error: true })
    } else {
      this.setState({ message: 'No Datasets', error: false })
    }
  }

  renderNoProfiles (css) {
    return (
      <div className={css('empty')}>
        <label>No Profiles</label>
      </div>
    )
  }

  template (css) {
    const {
      profiles,
      profilesLoading,
      profilesFetchedAll,
      datasets,
      datasetsLoading,
      datasetsFetchedAll } = this.props

    const { message } = this.state

    return (
      <div className={css('wrap')}>
        <div className={`col border`}>
          <header>
            <PageTitle pageTitle='Network' sectionTitle='peers' />
          </header>
          <div className='col'>
            <List
              data={profiles}
              component={ProfileItem}
              emptyComponent={<div className={`${css('empty')}`}>
                <label>No Profiles available</label>
              </div>}
              loading={profilesLoading}
              fetchedAll={profilesFetchedAll}
              type='profiles'
            />
          </div>
        </div>
        <div className='col border-right border-top border-bottom'>
          <header>
            <PageTitle pageTitle='' sectionTitle='datasets' />
          </header>
          <Datasets datasets={datasets} loading={datasetsLoading} fetchedAll={datasetsFetchedAll} message={message} fromRegistry />
        </div>
        <div className='col border-top'>
          <header />
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        display: 'flex'
      },
      empty: {
        padding: 20
      },
      top: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      bottom: {
        display: 'flex',
        justifyContent: 'flex-start',
        bottom: 0
      }
    }
  }
}

Network.propTypes = {
  searchString: PropTypes.string,
  profiles: PropTypes.array.isRequired,
  fetchedAll: PropTypes.bool,
  loadProfiles: PropTypes.func.isRequired,
  skipLoad: PropTypes.bool
}

Network.defaultProps = {
  skipLoad: false,
  statItem: [
    {
      icon: 'flash',
      title: 'profiles connected',
      stat: '2'
    },
    {
      icon: 'up',
      title: 'uptime',
      stat: '3:32:01'
    },
    {
      icon: 'link',
      title: 'transferred',
      stat: '2.4Gib'
    }]
}
