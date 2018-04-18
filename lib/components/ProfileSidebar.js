import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'
import Base from './Base'
import StatItemList from './StatItemList'

export default class ProfileSidebar extends Base {
  template (css) {
    const { profile, statItemList } = this.props
    return (
      <div className={css('wrap')}>
        <div className={css('hr')} />
        <div className={css('info')}>
          <StatItemList stats={statItemList} style={{marginBottom: 40}} />
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
    const palette = defaultPalette
    return {
      wrap: {
      },
      hr: {
        borderTop: `1px solid ${palette.sidebar}`,
        marginTop: 0
      },
      info: {
        marginTop: 20
      }
    }
  }
}

ProfileSidebar.propTypes = {
  profile: PropTypes.object.isRequired
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
