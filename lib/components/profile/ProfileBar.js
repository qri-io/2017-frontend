import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import Online from '../Online'
import ProfilePhoto from './ProfilePhoto'

export default class ProfileBar extends Base {
  template (css) {
    const { profile } = this.props

    if (!profile) {
      return (<div>No profile information</div>)
    }
    return (
      <div className={css('wrap')}>
        <div className={css('header')} >
          <ProfilePhoto profile={profile} size='lg' />
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
        flexDirection: 'column'
      },
      detail: {
        marginBottom: 20
      }
    }
  }
}

ProfileBar.propTypes = {
  profile: PropTypes.object.isRequired,
  peer: PropTypes.bool,
  onClick: PropTypes.func
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
