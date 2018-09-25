import React from 'react'
import PropTypes from 'prop-types'

import DatasetRefProps from '../../propTypes/datasetRefProps'
import ProfileProps from '../../propTypes/profile'

import ProfileHeader from './ProfileHeader'
import TabPanel from '../TabPanel'
import List from '../List'
import DatasetItem from '../item/DatasetItem'
import Spinner from '../Spinner'
import NoProfile from './NoProfile'
import ProfileSidebar from './ProfileSidebar'
import ProfileEditorContainer from '../../containers/ProfileEditor'
import ReadOnly from '../ReadOnly'

import Base from '../Base'

const EDIT_PROFILE_MODAL = 'EDIT_PROFILE_MODAL'

export default class Profile extends Base {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: 0,
      noProfile: false
    };

    [
      'changeTabIndex',
      'renderProfileDatasets',
      'handleGoBack',
      'handleAddDataset',
      'handleShowAddProfileDatasetModal',
      'handleSetProfilePoster',
      'handleSetProfilePhoto',
      'handleShowEditProfileModal',
      'handleMessage',
      'setNoProfile'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.peer && !this.props.sessionProfileId) {
      this.props.loadSessionProfile()
    } else if (!this.props.profileid) {
      this.props.loadProfileByName(this.props.peername).then((action) => {
        if (action.type === 'PROFILE_FAILURE') {
          this.setState({ noProfile: true })
        }
      })
    } else if (!this.props.profile) {
      this.props.loadProfileById(this.props.profileid).then(() => {
        this.props.loadDatasets(this.props.profileid, 1, 30)
      })
    } else if (this.props.datasets.length === 0 && !this.props.noDatasets) {
      this.props.loadDatasets(this.props.profileid, 1, 30)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.noProfile) {
      return
    }
    if (!nextProps.peer && !nextProps.sessionProfileId) {
      this.props.loadSessionProfile()
    } else if (this.props.peername !== nextProps.peername) {
      this.props.loadProfileByName(nextProps.peername).then((action) => {
        if (action.type === 'PROFILE_FAILURE') {
          this.setState({ noProfile: true })
        }
      })
    } else if (this.props.profileid !== nextProps.profileid) {
      this.props.loadProfileById(nextProps.profileid).then(() => {
        this.props.loadDatasets(nextProps.profileid, 1, 30)
      })
    } else if (!nextProps.datasets.length === 0 && !this.props.noDatasets) {
      this.props.loadDatasets(nextProps.profileid, 1, 30)
    }
  }

  setNoProfile (error = '') {
    if (error) {
      this.setState({ noProfile: true })
    }
  }

  handleGoBack () {
    this.props.goBack()
  }

  changeTabIndex (index) {
    this.setState({ tabIndex: index })
  }

  handleSetProfilePoster (files) {
    this.props.setProfilePoster(files)
  }

  handleSetProfilePhoto (files) {
    this.props.setProfilePhoto(files)
  }

  handleShowEditProfileModal () {
    this.props.showModal(EDIT_PROFILE_MODAL, this, this.props.profile, true, false)
  }

  handleAddDataset (currentName, newName, path) {
    this.props.addDataset(path, newName, '', '').then(() => {
      this.props.loadDatasets(this.props.profileid)
      this.props.hideModal()
    })
  }

  modal (name, data = {}) {
    switch (name) {
      case EDIT_PROFILE_MODAL:
        return <ProfileEditorContainer />
      default:
        return undefined
    }
  }

  handleMessage () {
    const { error, profile } = this.props
    let message = 'Profile has no Datasets'
    if (error.includes('routing: not found')) {
      message = `${profile.peername} is not currently connected`
    } else if (error) {
      message = 'Error loading Datasets. Check console for more info.'
    }
    return message
  }

  renderProfileDatasets (css) {
    const { datasets, palette } = this.props

    if (this.props.loading) {
      return <Spinner />
    } else {
      return (
        <List
          data={datasets}
          component={DatasetItem}
          // onSelectItem={this.onSelectDataset}
          emptyComponent={<p>{this.handleMessage()}</p>}
          palette={palette}
          onAdd={this.handleShowAddProfileDatasetModal}
        />
      )
    }
  }

  template (css) {
    const { profile, peername, sessionProfile, peer, sessionProfileId } = this.props
    const { tabIndex, noProfile } = this.state

    if (!sessionProfileId && !peer) {
      return <ReadOnly />
    }

    if (noProfile) {
      return <NoProfile onGoBack={this.handleGoBack} peername={peername} sessionProfile={sessionProfile} />
    }

    if (!profile) {
      return <Spinner />
    }

    return (
      <div>
        <ProfileHeader
          onGoBack={this.handleGoBack}
          setProfilePoster={!peer && this.handleSetProfilePoster}
          setProfilePhoto={!peer && this.handleSetProfilePhoto}
          profile={profile}
        />
        <div className={css('wrap')}>
          <div className={css('main')}>
            <div className={css('content')}>
              <TabPanel
                index={tabIndex}
                labels={['Datasets']}
                onSelectPanel={this.changeTabIndex}
                components={[
                  this.renderProfileDatasets(css)
                ]}
                clearBackground
              />
            </div>
            <div className={css('sidebar')}>
              <ProfileSidebar profile={profile} peer={peer} onClick={this.handleShowEditProfileModal} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  styles () {
    return {
      main: {
        margin: '40px auto',
        display: 'flex',
        justifyContent: 'space-around',
        maxWidth: 960
      },
      content: {
        width: '60%'
      },
      sidebar: {
        width: '30%'
      }
    }
  }
}

Profile.propTypes = {
  peer: PropTypes.bool,
  loadProfileById: PropTypes.func.isRequired,
  loadDatasets: PropTypes.func.isRequired,
  setProfilePoster: PropTypes.func,
  setProfilePhoto: PropTypes.func,

  profile: ProfileProps,
  peername: PropTypes.string,
  profileid: PropTypes.string,
  datasets: PropTypes.arrayOf(DatasetRefProps),
  noNamespace: PropTypes.bool,
  loading: PropTypes.bool,
  nextPage: PropTypes.number,
  fetchedAll: PropTypes.bool,
  goBack: PropTypes.func.isRequired

}

Profile.defaultProps = {
}
