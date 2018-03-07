/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'

import PageHeader from './PageHeader'
import ProfilePhoto from './ProfilePhoto'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class PeerHeader extends Base {
  constructor (props) {
    super(props)
    this.state = {
      uploadingPoster: false,
      uploadingProfile: false
    };

    [
      'handleSetProfilePhoto',
      'handleSetPosterPhoto'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleSetProfilePhoto (e) {
    console.log(e.target.value)
    this.props.setProfilePhoto(e.target.files)
  }

  handleSetPosterPhoto (e) {
    console.log(e.target.value)
    this.props.setPosterPhoto(e.target.files)
  }

  renderChoosePosterPhoto (css) {
    return (
      <div className={css('setPosterWrap')}>
        <label className='btn btn-primary' htmlFor='posterPhotoInput'>Set Poster Photo</label>
        <input
          className={css('hidden')}
          type='file'
          name='posterPhoto'
          id='posterPhotoInput'
          onChange={this.handleSetPosterPhoto}
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
    const { onGoBack, peer, setPosterPhoto, setProfilePhoto } = this.props
    return (
      <div className={css('wrap')} style={{
        backgroundImage: peer.poster ? `url("${__BUILD__.API_URL}${peer.poster}")` : '#111'
      }}>
        <PageHeader
          onGoBack={onGoBack}
          profile
        />
        {setPosterPhoto && this.renderChoosePosterPhoto(css)}
        <div className={css('info')}>
          <div className={css('photo')}>
            <label htmlFor={'profilePhotoInput'} className={css('profilePhotoInputLabel')}>
              <ProfilePhoto size='lg' peer={peer} />
            </label>
            {setProfilePhoto && this.renderChooseProfilePhoto(css)}
          </div>
          <div className={css('peername')}>
            <h1 className={css('title')}>{peer.peername || 'unnamed peer'}</h1>
            { /* peer.name ? <b className={css('name')}>{peer.name}</b> : undefined */ }
            <p className={css('path')}>{peer.id}</p>
          </div>
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette, setProfilePhoto } = props
    return {
      wrap: {
        height: 300,
        position: 'relative',
        zIndex: 1,
        backgroundSize: 'cover'
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
        borderRadius: 3,
        background: 'rgba(0,0,0,0.5)',
        display: 'inline',
        padding: '4px 10px'
      },
      path: {
        marginTop: 10,
        borderRadius: 3,
        padding: '4px 10px',
        background: 'rgba(0,0,0,0.5)',
        color: palette.path
      },
      hidden: {
        display: 'none'
      },
      setPosterWrap: {
        float: 'right',
        marginRight: 20
      },
      profilePhotoInputLabel: {
        cursor: setProfilePhoto ? 'pointer' : 'default'
      }
    }
  }
}

PeerHeader.propTypes = {
  onGoBack: PropTypes.func.isRequired,
  peer: PropTypes.object.isRequired,
  setPosterPhoto: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  setProfilePhoto: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),

  palette: Palette
}

PeerHeader.defaultProps = {
  palette: defaultPalette
}
