import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ProfilePhoto from '../profile/ProfilePhoto'
import Online from '../Online'
const ProfileItem = ({ data, showStatus }) => {
  return (
    <div className='sectionWidth profile-item-wrap' >
      <Link className='profile-item-photo' to={{ pathname: `/${data.peername}` }}>
        <ProfilePhoto profile={data} />
      </Link>
      <div className='profile-item-info' >
        { data.connected ? <b className='profile-item-name'> ⚡</b> : undefined }
        <Link to={{ pathname: `/${data.peername}` }}>
          <h3 className='profile-item-title'>{data.peername || 'unnamed peer'}</h3>
        </Link>
        {data.name && <p className='profile-item-muted profile-item-name'>{data.name}</p>}
        {showStatus ? <Online online={data.online} small style={{ marginTop: 2 }} /> : undefined}
      </div>
    </div>
  )
}

ProfileItem.propTypes = {
  data: PropTypes.object.isRequired,
  link: PropTypes.bool,
  showStatus: PropTypes.bool
}

ProfileItem.defaultProps = {
  showStatus: true
}

export default ProfileItem
