import React from 'react'
import PropTypes from 'prop-types'
// import { debounce } from 'lodash'

import Base from './Base'
import ReadOnly from './ReadOnly'
import List from './List'
import ProfileItem from './item/ProfileItem'
import Spinner from './Spinner'

export default class Profiles extends Base {
  constructor (props) {
    super(props)
    // this.state = { loading: props.profiles.length === 0 };
    this.state = {
      loading: !(props.fetchedAll || props.profiles.length > 0)
    };

    // TODO - restore search
    // this.debounceRunProfileSearch = debounce((searchString) => {
    //   this.setState({ loading: false })
    //   if (searchString) {
    //     this.props.runProfileSearch(searchString)
    //   }
    // }
    // , 250);

    [
      'onSelectProfile',
      // 'handleProfileSearch',
      'handleLoadNextPage',
      'renderNoProfiles'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.skipLoad) {
      this.props.loadProfiles()
      this.props.connections()
    } else if (this.state.loading === true && this.props.profiles.length > 0) {
      console.log('in else if')
      this.setState({loading: false})
    }
  }

  componentWillReceiveProps (nextProps) {
    // if (this.state.loading === true && nextProps.profiles.length > 0 && (this.props.profiles.length === 0 || nextProps.noProfiles)) {
    //   this.setState({ loading: false })
    // }
    if (this.state.loading === true && nextProps.loading === false) {
      this.setState({loading: false})
    }
  }

  onSelectProfile (index, profileRef) {
    console.log('Profile selected')
    // this.props.showModal(DATASET_DETAILS_MODAL, this, datasetRef, true)
  }

  handleLoadNextPage () {
    this.props.connections()
    this.props.loadProfiles(this.props.nextPage)
  }

  // TODO - restore search
  // handleProfileSearch (searchString) {
  //   this.props.setProfileSearch(searchString)
  //   this.setState({ loading: true })
  //   this.debounceRunProfileSearch(searchString)
  // }

  renderNoProfiles (css) {
    return (
      <div className={css('noProfiles')}>
        <label>No Profiles</label>
      </div>
    )
  }

  template (css) {
    if (!this.props.sessionProfile) {
      return <ReadOnly />
    }

    const { loading } = this.state
    const { profiles } = this.props

    if (loading) {
      return (
        <div className={css('wrap')}>
          <header>
            {/* <input
              id={'search'}
              name={'search'}
              type={'text'}
              className='searchBox'
              value={searchString}
              placeholder={'search'}
              onChange={(e) => { this.handleProfileSearch(e.target.value) }}
            /> */}
            <hr />
          </header>
          <Spinner />
        </div>
      )
    }

    return (
      <div className={css('wrap')}>
        <header className={css('header')}>
          <h1>Profiles</h1>
          <hr />
        </header>
        <div className='col-md-8'>
          <List
            data={profiles}
            component={ProfileItem}
            onSelectItem={this.onSelectProfile}
            emptyComponent={this.renderNoProfiles(css)}
            loading={this.props.loading}
            fetchedAll={this.props.fetchedAll}
            onClick={this.handleLoadNextPage}
            type='profiles'
          />
        </div>
        <div className='col-md-4' />
      </div>
    )
  }

  styles () {
    return {
      noProfiles: {
        marginLeft: 20
      },
      wrap: {
        marginTop: 40
      },
      header: {
        paddingLeft: 20,
        paddingRight: 20
      },
      searchBox: {
        display: 'inline-block',
        width: '50%',
        fontSize: '1rem',
        lineHeight: '1.25',
        color: '#55595c',
        backgroundColor: '#fff',
        border: '0.5px solid rgba(0, 0, 0, 0.15)',
        overflow: 'auto',
        borderRadius: '0.25rem',
        marginBottom: 10,
        paddingLeft: 8
      }
    }
  }
}

Profiles.propTypes = {
  searchString: PropTypes.string,
  profiles: PropTypes.array.isRequired,
  // nextPage: PropTypes.number.isRequired,
  fetchedAll: PropTypes.bool,
  loadProfiles: PropTypes.func.isRequired,
  skipLoad: PropTypes.bool
}

Profiles.defaultProps = {
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
