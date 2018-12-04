import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import Online from '../Online'
import ProfilePhoto from './ProfilePhoto'

export default class ProfileBar extends Base {
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

  renderChooseProfilePhoto (css) {
    return (
      <input
        className={css('hidden')}
        type='file'
        name='profilePhoto'
        id='profilePhotoInput'
        onChange={this.handleSetProfilePhoto}
        ref={(input) => { this.profilePhotoInput = input }}
      />
    )
  }

  template (css) {
    const { profile, peer } = this.props

    if (!profile) {
      return (<div>Profile '{this.props.peername}' not be found or cannot be loaded</div>)
    }
    return (
      <div className={css('wrap')}>
        <div className={css('header')} >
          <div className={css('photo')}>
            <label htmlFor={'profilePhotoInput'} className={!peer ? css('cursorPointer') : css('cursorDefault')} >
              <ProfilePhoto profile={profile} size='lg' />
            </label>
            {!peer && this.renderChooseProfilePhoto(css)}
          </div>
          <div className={css('names')}>
            <h4>{profile.peername}</h4>
            {profile.name && <p>{profile.name}</p>}
            <Online online={profile.online} blue />
          </div>
        </div>
        <div className={css('info')}>
          { profile.homeUrl ? <div className={css('detail')}><label>website:</label><br />{profile.homeUrl}</div> : undefined }
          { profile.twitter ? <div className={css('detail')}><label>twitter:</label><br />{profile.twitter}</div> : undefined }
          { profile.email ? <div className={css('detail')}><label>email:</label><br />{profile.email}</div> : undefined }
          { profile.description ? <div className={css('detail')}><label>bio:</label><br />{profile.description}</div> : undefined}
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        display: 'flex',
        flexDirection: 'column',
        width: 360,
        margin: 20
      },
      header: {
        display: 'flex',
        marginBottom: 20
      },
      names: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: '0 20px'
      },
      info: {
        display: 'flex',
        flexDirection: 'column',
        width: 320
      },
      detail: {
        marginBottom: 20
      },
      photo: {
        flex: '0 0'
      },
      hidden: {
        display: 'none'
      },
      cursorPointer: {
        cursor: 'pointer'
      },
      cursorDefault: {
        cursor: 'default'
      }
    }
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
