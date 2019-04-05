import React from 'react'
import PropTypes from 'prop-types'
import Online from '../Online'
import ProfilePhoto from './ProfilePhoto'

export default class ProfileBar extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      uploadingPhoto: false
    };

    [
      'handleSetProfilePhoto'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleSetProfilePhoto (e) {
    this.props.setProfilePhoto(e.target.files)
  }

  renderChooseProfilePhoto () {
    return (
      <input
        className='profile-bar-hidden'
        type='file'
        name='profilePhoto'
        id='profilePhotoInput'
        onChange={this.handleSetProfilePhoto}
        ref={(input) => { this.profilePhotoInput = input }}
      />
    )
  }

  render () {
    const { profile, peer } = this.props

    if (!profile) {
      return (<div>Profile '{this.props.peername}' not be found or cannot be loaded</div>)
    }
    return (
      <div className='profile-bar-wrap'>
        <div className='profile-bar-header' >
          <div className='profile-bar-photo'>
            <label htmlFor={'profilePhotoInput'} className={!peer ? 'profile-bar-cursor-pointer' : 'profile-bar-cursor-default'} >
              <ProfilePhoto profile={profile} size='lg' />
            </label>
            {!peer && this.renderChooseProfilePhoto()}
          </div>
          <div className='profile-bar-names'>
            <h4>{profile.peername}</h4>
            {profile.name && <p>{profile.name}</p>}
            <Online online={profile.online} blue />
          </div>
        </div>
        <div className='profile-bar-info'>
          { profile.homeUrl ? <div className='profile-bar-detail'><label>website:</label><br />{profile.homeUrl}</div> : undefined }
          { profile.twitter ? <div className='profile-bar-detail'><label>twitter:</label><br />{profile.twitter}</div> : undefined }
          { profile.email ? <div className='profile-bar-detail'><label>email:</label><br />{profile.email}</div> : undefined }
          { profile.description ? <div className='profile-bar-detail'><label>bio:</label><br />{profile.description}</div> : undefined}
        </div>
      </div>
    )
  }
}

ProfileBar.propTypes = {
  profile: PropTypes.object.isRequired,
  peer: PropTypes.bool
}

ProfileBar.defaultProps = {
  statItemList: [
    {
      title: 'dataset',
      stat: '14'
    },
    {
      title: 'time online',
      stat: '3:32:01'
    },
    {
      title: 'repo size',
      stat: '2.4Gib'
    }]
}
