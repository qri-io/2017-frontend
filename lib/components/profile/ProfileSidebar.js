import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import Button from '../Button'

export default class ProfileSidebar extends Base {
  template (css) {
    const { profile, peer, onClick } = this.props
    return (
      <div className={css('wrap')}>
        <div className={css('button')}>
          {peer ? undefined : <Button color='e' text='Edit' onClick={onClick} />}
        </div>
        <hr />
        <div className={css('info')}>
          {/* <StatItemList stats={statItemList} style={{marginBottom: 40}} /> */}
          { /* TODO - these links break errrrythang profile.homeUrl ? <p><a href={profile.homeUrl}>{profile.homeUrl}</a></p> : undefined */ }
          { profile.homeUrl ? <p>{profile.homeUrl}</p> : undefined }
          { /* TODO - profile.twitter ? <p><a href={`https://twitter.com/${profile.twitter}`}>{profile.twitter}</a></p> : undefined */ }
          { profile.twitter ? <p><b>twitter:</b> {profile.twitter}</p> : undefined }
          { profile.email ? <p><b>email:</b> {profile.email}</p> : undefined }
          { profile.description ? <p>{profile.description}</p> : undefined}
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        display: 'flex',
        flexDirection: 'column'
      },
      info: {
        marginTop: 20
      },
      button: {
        height: 57,
        alignSelf: 'flex-end'
      }
    }
  }
}

ProfileSidebar.propTypes = {
  profile: PropTypes.object.isRequired,
  peer: PropTypes.bool,
  onClick: PropTypes.func
}

ProfileSidebar.defaultProps = {
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
