import React from 'react'
import PropTypes from 'prop-types'
// import { debounce } from 'lodash'

import Base from './Base'
import ReadOnly from './ReadOnly'
import List from './List'
import ProfileItem from './item/ProfileItem'
import Datasets from './Datasets'
import PageTitle from './PageTitle'

export default class Network extends Base {
  componentWillMount () {
    if (!this.props.skipLoad) {
      this.props.loadProfiles()
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
    if (!this.props.sessionProfile) {
      return <ReadOnly />
    }

    const {
      profiles,
      profilesLoading,
      profilesFetchedAll,
      datasets,
      datasetsLoading,
      datasetsFetchedAll } = this.props

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
          <Datasets datasets={datasets} loading={datasetsLoading} fetchedAll={datasetsFetchedAll} />
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
