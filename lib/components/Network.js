import React from 'react'
import PropTypes from 'prop-types'
// import { debounce } from 'lodash'

import {
  REGISTRY_LIST_FAILURE
} from '../constants/registry'

import List from './List'
import ProfileItem from './item/ProfileItem'
import Datasets from './Datasets'
import PageTitle from './PageTitle'

export default class Network extends React.PureComponent {
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

  componentDidMount () {
    if (!this.props.skipLoad && this.props.sessionProfile) {
      this.props.loadProfiles()
    }
    if (!this.props.datasets && !this.props.datasetsFetchedAll && !this.props.datasetsFetchedError) {
      this.props.loadRegistryDatasets().then(action => this.handleLoadDatasetsError(action))
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.skipLoad !== this.props.skipLoad && !this.props.skipload && this.props.sessionProfile) {
      this.props.loadProfiles()
    }
  }

  handleLoadDatasetsError (action) {
    if (action.type === REGISTRY_LIST_FAILURE) {
      this.setState({ message: 'There was an error loading datasets off the network.', error: true })
    } else {
      this.setState({ message: 'No Registry Datasets Found', error: false })
    }
  }

  render () {
    const {
      profiles,
      profilesLoading,
      profilesFetchedAll,
      datasets,
      datasetsLoading,
      datasetsFetchedAll,
      sessionProfile } = this.props

    const { message } = this.state

    return (
      <div className='network-wrap'>
        {sessionProfile && <div className='col border'>
          <header>
            <PageTitle pageTitle='Network' sectionTitle='peers' />
          </header>
          <div className='col'>
            <List
              data={profiles}
              component={ProfileItem}
              emptyComponent={<div className='network-empty'>
                <label>No Profiles available</label>
              </div>}
              loading={profilesLoading}
              fetchedAll={profilesFetchedAll}
              type='profiles'
            />
          </div>
        </div>}
        <div className='col border-right border-top border-bottom'>
          <header>
            <PageTitle pageTitle={sessionProfile ? '' : 'Network'} sectionTitle='datasets' />
          </header>
          <Datasets datasets={datasets} loading={datasetsLoading} fetchedAll={datasetsFetchedAll} message={message} />
        </div>
        <div className='col border-top'>
          <header />
        </div>
      </div>
    )
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
