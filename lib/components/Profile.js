import React from 'react'
import PropTypes from 'prop-types'

import { Palette, defaultPalette } from '../propTypes/palette'
import DatasetRefProps from '../propTypes/datasetRefProps'
import ProfileProps from '../propTypes/profile'

import ProfileHeader from './ProfileHeader'
import TabPanel from './TabPanel'
import List from './List'
import DatasetItem from './item/DatasetItem'
import Spinner from './Spinner'
import NameDataset from './NameDataset'
import NoProfile from './NoProfile'

import Base from './Base'

const ADD_PROFILE_DATASET_MODAL = 'ADD_PROFILE_DATASET_MODAL'

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
      'handleSetPosterPhoto',
      'handleSetProfilePhoto',
      'handleMessage',
      'setNoProfile'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.profileid) {
      this.props.loadProfileByName(this.props.peername).then((action) => {
        if (action.type === 'PROFILE_FAILURE') {
          this.setState({noProfile: true})
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
    if (!nextProps.profileid) {
      this.props.loadProfileByName(nextProps.peername).then((action) => {
        if (action.type === 'PROFILE_FAILURE') {
          this.setState({noProfile: true})
        }
      })
    } else if (!nextProps.profile || this.props.profileid !== nextProps.profileid) {
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
    this.setState({tabIndex: index})
  }

  handleSetPosterPhoto (files) {
    this.props.setPosterPhoto(files)
  }

  handleSetProfilePhoto (files) {
    this.props.setProfilePhoto(files)
  }

  handleShowAddProfileDatasetModal (datasetRef) {
    const data = {
      datasetRef,
      handleNameDataset: this.handleAddDataset,
      hideModal: this.props.hideModal
    }
    this.props.showModal(ADD_PROFILE_DATASET_MODAL, this, data, false)
  }

  handleAddDataset (currentName, newName, path) {
    this.props.addDataset(path, newName, '', '').then(() => {
      this.props.loadDatasets(this.props.profileid)
      this.props.hideModal()
    })
  }

  modal (name, data = {}) {
    switch (name) {
      case ADD_PROFILE_DATASET_MODAL:
        return <NameDataset data={data} />
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
        <div className={css('wrap')}><List
          data={datasets}
          component={DatasetItem}
          // onSelectItem={this.onSelectDataset}
          emptyComponent={<p>{this.handleMessage()}</p>}
          palette={palette}
          onAdd={this.handleShowAddProfileDatasetModal}
          />
        </div>
      )
    }
  }

  template (css) {
    const { profile, peername, sessionProfile, peer } = this.props
    const { tabIndex, noProfile } = this.state

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
          setPosterPhoto={peer && this.handleSetPosterPhoto}
          setProfilePhoto={peer && this.handleSetProfilePhoto}
          profile={profile}
        />
        <div className={css('wrap')}>
          <div className={css('main')}>
            <div className={css('sidebar')} />
            <div className={css('content')}>
              <TabPanel
                index={tabIndex}
                labels={['Datasets']}
                onSelectPanel={this.changeTabIndex}
                components={[
                  this.renderProfileDatasets(css)
                ]}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }

  styles (props) {
    return {
      main: {
        marginTop: 40
      },
      content: {
        width: '70%',
        float: 'left',
        paddingLeft: 20,
        paddingRight: 20
      },
      sidebar: {
        width: '30%',
        float: 'right',
        paddingLeft: 20,
        paddingRight: 20
      },
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
      }
    }
  }
}

Profile.propTypes = {
  peer: PropTypes.bool,
  loadProfileById: PropTypes.func.isRequired,
  loadDatasets: PropTypes.func.isRequired,
  setPosterPhoto: PropTypes.func,
  setProfilePhoto: PropTypes.func,

  profile: ProfileProps,
  peername: PropTypes.string,
  profileid: PropTypes.string,
  datasets: PropTypes.arrayOf(DatasetRefProps),
  noNamespace: PropTypes.bool,
  loading: PropTypes.bool,
  nextPage: PropTypes.number,
  fetchedAll: PropTypes.bool,
  goBack: PropTypes.func.isRequired,
  palette: Palette

}

Profile.defaultProps = {
  palette: defaultPalette,
  peer: false
}
