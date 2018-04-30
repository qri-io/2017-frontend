/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'
import ProfilePhoto from './ProfilePhoto'

import { defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class ProfileHeader extends Base {
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
    console.log(e.target.value)
    this.props.setProfilePhoto(e.target.files)
  }

  handleSetProfilePoster (e) {
    console.log(e.target.value)
    this.props.setProfilePoster(e.target.files)
  }

  renderChooseProfilePoster (css) {
    return (
      <div className={css('setPosterWrap')}>
        <label className='btn btn-dark' htmlFor='posterPhotoInput'>Set Poster Photo</label>
        <input
          className={css('hidden')}
          type='file'
          name='posterPhoto'
          id='posterPhotoInput'
          onChange={this.handleSetProfilePoster}
          ref={(input) => { this.posterPhotoInput = input }}
        />
      </div>
    )
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
    const { onGoBack, profile, setProfilePoster, setProfilePhoto } = this.props

    var style = { backgroundColor: defaultPalette.neutralBold }
    if (profile.poster) {
      style['backgroundImage'] = `url("${__BUILD__.API_URL}${profile.poster}")`
    }

    return (
      <div className={css('wrap')} style={style}>
        <div className={css('pageHeader')}>
          <Button
            color='dark'
            onClick={onGoBack}
            text='Back'
          />
          {setProfilePoster && this.renderChooseProfilePoster(css)}
        </div>
        <div className={css('info')}>
          <div className={css('photo')}>
            <label htmlFor={'profilePhotoInput'} className={setProfilePhoto ? css('cursorPointer') : css('cursorDefault')}>
              <ProfilePhoto size='lg' profile={profile} />
            </label>
            {setProfilePhoto && this.renderChooseProfilePhoto(css)}
          </div>
          <div className={css('peername')}>
            <h1 className={css('title')}>{profile.peername || 'unnamed peer'}</h1>
            { /* peer.name ? <b className={css('name')}>{profile.name}</b> : undefined */ }
            <p className={css('path')}>{profile.id}</p>
          </div>
        </div>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette

    return {
      wrap: {
        height: 300,
        position: 'relative',
        zIndex: 1,
        backgroundSize: 'cover',
        borderBottom: `2px solid ${palette.text}`
      },
      info: {
        position: 'absolute',
        bottom: -50,
        left: 0,
        ':after': {
          content: '',
          display: 'table',
          clear: 'both'
        }
      },
      name: {
        color: palette.b,
        fontFamily: '"source code pro", "courier", "monospace"',
        fontWeight: '300'
      },
      photo: {
        float: 'left'
      },
      peername: {
        float: 'left',
        marginTop: 30
      },
      title: {
        color: palette.sink,
        borderRadius: 3,
        display: 'inline',
        padding: '4px 10px'
      },
      path: {
        marginTop: 10,
        borderRadius: 3,
        padding: '4px 10px',
        color: palette.sink
      },
      hidden: {
        display: 'none'
      },
      setPosterWrap: {
        float: 'right',
        marginRight: 20
      },
      cursorPointer: {
        cursor: 'pointer'
      },
      cursorDefault: {
        cursor: 'default'
      },
      pageHeader: {
        padding: '40px 0 0 20px',
        display: 'flex',
        justifyContent: 'space-between'
      }
    }
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
