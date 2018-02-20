import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Palette, defaultPalette } from '../../propTypes/palette'
import ProfilePhoto from '../ProfilePhoto'
import Hash from '../Hash'
import Datestamp from '../Datestamp'
import Base from '../Base'

export default class CommitItem extends Base {
  template (css) {
    const { data, index } = this.props
    const commit = data.dataset ? data.dataset.commit : {}
    const path = data && data.path
    const message = commit.title ? commit.title : `change #${index}`
    const endpoint = `/dataset/${path.slice(6, -13)}`

    return (
      <div className={css('wrap')} >
        <Link className={css('photo')} to={{pathname: endpoint}}>
          <ProfilePhoto peer={data} />
        </Link>
        <Link className={css('info')} to={{pathname: endpoint}}>
          <h5 className={css('title')}>{message || (index ? `commit #${index + 1}` : 'Current Dataset')}</h5>
          <Hash hash={path} noPrefix short />
          <Datestamp dateString={commit.timestamp} muted />
        </Link>
      </div>
    )
  }

  styles (props) {
    const { palette } = props
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
        color: palette.muted,
        fontFamily: '"source code pro", "courier", "monospace"'
      },
      path: {
        color: palette.muted,
        marginBottom: 0
      }
    }
  }
}

CommitItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  palette: Palette
}

CommitItem.defaultProps = {
  palette: defaultPalette
}
