import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ProfilePhoto from '../profile/ProfilePhoto'
import Hash from '../Hash'
import Datestamp from '../Datestamp'

const CommitItem = ({ data, index, currentID, profile, registryVersion, sessionProfile }) => {
  const commit = data.dataset ? data.dataset.commit : {}
  const path = data && data.path
  const peername = data && data.peername
  const name = data && data.name
  const title = commit.title ? commit.title : `change #${index}`
  const message = commit.message
  const endpoint = `/${peername}/${name}/at${path}`

  const info = currentID === path ? 'commit-item-info commit-info-no-click' : 'commit-item-info'

  return (
    <div className='commit-item-wrap' >
      {sessionProfile ? <Link className='commit-item-photo' to={{ pathname: endpoint }}>
        <ProfilePhoto profile={profile} />
      </Link> : <ProfilePhoto profile={profile} /> }
      <Link className={`${info} commit-item-color`} to={currentID === path ? {} : { pathname: endpoint }}>
        <div className='commit-item-flex'><span className='commit-item-peername' >{peername}: </span><h5 className='commit-item-title'>{title || (index ? `commit #${index + 1}` : 'Current Dataset')}</h5></div>
        {message && <span>{message}</span>}
        <Hash hash={path} noPrefix style={{ display: 'inline-block' }} />
        <Datestamp dateString={commit.timestamp} muted />
      </Link>
      {sessionProfile && registryVersion === path && <div className='icon-inline' style={{ marginLeft: 5 }} title='published version'>star</div>}
    </div>
  )
}

CommitItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

CommitItem.defaultProps = {
}

export default CommitItem
