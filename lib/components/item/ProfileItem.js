import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ProfilePhoto from '../profile/ProfilePhoto'
import Online from '../Online'
import { defaultPalette } from '../../propTypes/palette'
import Base from '../Base'

export default class ProfileItem extends Base {
  template (css) {
    const { data, showStatus } = this.props

    return (
      <div className={`sectionWidth ${css('wrap')}`} >
        <Link className={css('photo')} to={{ pathname: `/${data.peername}` }}>
          <ProfilePhoto profile={data} />
        </Link>
        <div className={css('info')} >
          { data.connected ? <b className={css('name')}> ⚡</b> : undefined }
          <Link to={{ pathname: `/${data.peername}` }}>
            <h3 className={css('title')}>{data.peername || 'unnamed peer'}</h3>
          </Link>
          {data.name && <p className={css('muted', 'name')}>{data.name}</p>}
          {showStatus ? <Online online={data.online} small style={{ marginTop: 2 }} /> : undefined}
        </div>
      </div>
    )
  }

  styles (props) {
    const palette = defaultPalette
    return {
      wrap: {
        padding: 20
      },
      photo: {
        float: 'left'
      },
      info: {
        display: 'inline-block',
        marginLeft: 10,
        maxWidth: 220
      },
      title: {
        color: palette.text,
        marginBottom: -1,
        marginTop: -5
      },
      muted: {
        color: palette.primaryDark
      },
      name: {
        color: palette.primaryDark,
        marginBottom: -1,
        marginTop: -3
      },
      path: {
        color: palette.primaryMuted
      }
    }
  }
}

ProfileItem.propTypes = {
  data: PropTypes.object.isRequired,
  link: PropTypes.bool,
  showStatus: PropTypes.bool
  // onSelect: PropTypes.func.isRequired
}

ProfileItem.defaultProps = {
  showStatus: true
}
