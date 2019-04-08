/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'

import ProfilePhoto from './ProfilePhoto'
import Online from '../Online'
import Hash from '../Hash'
import { defaultPalette } from '../../propTypes/palette'

export default class ProfileHeader extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      uploadingPoster: false,
      uploadingProfile: false
    };

    [
      'handleSetProfilePhoto',
      'handleSetProfilePoster'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleSetProfilePhoto (e) {
    this.props.setProfilePhoto(e.target.files)
  }

  handleSetProfilePoster (e) {
    this.props.setProfilePoster(e.target.files)
  }

  renderChooseProfilePoster () {
    return (
      <div className='profile-header-set-poster-wrap'>
        <label className='btn btn-dark' htmlFor='posterPhotoInput'>Set Poster Photo</label>
        <input
          className='profile-header-hidden'
          type='file'
          name='posterPhoto'
          id='posterPhotoInput'
          onChange={this.handleSetProfilePoster}
          ref={(input) => { this.posterPhotoInput = input }}
        />
      </div>
    )
  }
  renderChooseProfilePhoto () {
    return (
      <input
        className='profile-header-hidden'
        type='file'
        name='profilePhoto'
        id='profilePhotoInput'
        onChange={this.handleSetProfilePhoto}
        ref={(input) => { this.profilePhotoInput = input }}
      />
    )
  }

  render () {
    const { profile, setProfilePoster, setProfilePhoto } = this.props

    var style = { backgroundColor: defaultPalette.neutralBold }
    if (profile.poster) {
      style['background'] = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url("${__BUILD__.API_URL}${profile.poster}")`
    }

    return (
      <div className='profile-header-wrap' style={style}>
        <div className='profile-header-page-header'>
          {setProfilePoster && this.renderChooseProfilePoster()}
        </div>
        <div className='profile-header-info'>
          <div className='profile-header-photo'>
            <label htmlFor={'profilePhotoInput'} className={setProfilePhoto ? 'profile-header-cursor-pointer' : 'profile-header-cursor-default'}>
              <ProfilePhoto size='xlg' profile={profile} />
            </label>
            {setProfilePhoto && this.renderChooseProfilePhoto()}
          </div>
          <div className='profile-header-peername'>
            <h1 className='profile-header-title'>{profile.peername || 'unnamed peer'}</h1>
            <Online online={profile.online} />
            <Hash style={{ color: '#fff' }} hash={'/ipfs/' + profile.id} noPrefix />
          </div>
        </div>
      </div>
    )
  }
}

ProfileHeader.propTypes = {
  onGoBack: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  setProfilePoster: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  setProfilePhoto: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
}

ProfileHeader.defaultProps = {
}
