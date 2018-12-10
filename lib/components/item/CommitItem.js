import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { defaultPalette } from '../../propTypes/palette'
import ProfilePhoto from '../profile/ProfilePhoto'
import Hash from '../Hash'
import Datestamp from '../Datestamp'
import Base from '../Base'

export default class CommitItem extends Base {
  template (css) {
    const { data, index, currentID, profile, registryVersion } = this.props
    const commit = data.dataset ? data.dataset.commit : {}
    const path = data && data.path
    const peername = data && data.peername
    const name = data && data.name
    const title = commit.title ? commit.title : `change #${index}`
    const message = commit.message
    const endpoint = `/${peername}/${name}/at${path}`

    const info = currentID === path ? css('info', 'noClick') : css('info')

    return (
      <div className={css('wrap')} >
        <Link className={css('photo')} to={{ pathname: endpoint }}>
          <ProfilePhoto profile={profile} />
        </Link>
        <Link className={`${info} ${css('color')}`} to={currentID === path ? {} : { pathname: endpoint }}>
          <div className={css('flex')}><span className={css('peername')} >{peername}: </span><h5 className={css('title')}>{title || (index ? `commit #${index + 1}` : 'Current Dataset')}</h5></div>
          {message && <span className={css('message')}>{message}</span>}
          <Hash hash={path} noPrefix style={{ display: 'inline-block' }} />
          <Datestamp dateString={commit.timestamp} muted />
        </Link>
        {registryVersion === path && <div className='icon-inline' style={{ marginLeft: 5 }} title='published version'>star</div>}
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      color: {
        color: palette.text,
        cursor: 'pointer',
        ':hover': {
          color: palette.text
        },
        ':active': {
          color: palette.text
        }
      },
      flex: {
        display: 'flex',
        alignItems: 'baseline'
      },
      wrap: {
        margin: 20,
        display: 'flex',
        alignItems: 'center'
      },
      photo: {
        display: 'inline-block'
      },
      title: {
        color: palette.text,
        marginBottom: 0
      },
      info: {
        marginLeft: 10,
        display: 'inline-block'
      },
      name: {
        color: palette.primaryDark,
        fontFamily: '"source code pro", "courier", "monospace"'
      },
      path: {
        color: palette.primaryDark,
        marginBottom: 0
      },
      noClick: {
        cursor: 'default',
        borderRadius: 3,
        border: '1px solid #50C9F4',
        padding: 8
      },
      peername: {
        marginRight: 5,
        color: palette.primary
      }
    }
  }
}

CommitItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

CommitItem.defaultProps = {
}
