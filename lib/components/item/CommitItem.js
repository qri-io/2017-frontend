import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { defaultPalette } from '../../propTypes/palette'
import ProfilePhoto from '../ProfilePhoto'
import Hash from '../Hash'
import Datestamp from '../Datestamp'
import Base from '../Base'

export default class CommitItem extends Base {
  componentWillMount () {
    if (this.data && this.data.profileID && !this.profile) {
      this.props.loadProfileById(this.data.profileID)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.data.profileID && !nextProps.profile) {
      this.props.loadProfileById(nextProps.data.profileID)
    }
  }

  template (css) {
    const { data, index, currentID, profile } = this.props
    const commit = data.dataset ? data.dataset.commit : {}
    const path = data && data.path
    const peername = data && data.peername
    const name = data && data.name
    const message = commit.title ? commit.title : `change #${index}`
    const endpoint = `/${peername}/${name}/at${path}`

    const info = currentID === path ? css('info', 'noClick') : css('info')

    return (
      <div className={css('wrap')} >
        <Link className={css('photo')} to={{pathname: endpoint}}>
          <ProfilePhoto profile={profile} />
        </Link>
        <Link className={info} to={currentID === path ? {} : {pathname: endpoint}}>
          <h5 className={css('title')}>{message || (index ? `commit #${index + 1}` : 'Current Dataset')}</h5>
          <Hash hash={path} noPrefix short style={{display: 'inline-block'}} />
          <Datestamp dateString={commit.timestamp} muted />
        </Link>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        margin: 20
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
        color: palette.neutralBold,
        fontFamily: '"source code pro", "courier", "monospace"'
      },
      path: {
        color: palette.neutralBold,
        marginBottom: 0
      },
      noClick: {
        cursor: 'default',
        borderRadius: 3,
        border: '1px solid #50C9F4',
        padding: 8
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
