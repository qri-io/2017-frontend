import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Palette, defaultPalette } from '../../propTypes/palette'
import Base from '../Base'

export default class PeerItem extends Base {
  template (css) {
    const { data, link } = this.props
    if (link) {
      return (
        <div className='peerItem' >
          { data.type ? <b className={css('name')}>{data.type}</b> : undefined }
          <Link to={{ pathname: `/peers/${data.id}` }}>
            <h3 className='title'>{data.username || 'unnamed peer'}</h3>
          </Link>
          <p className={css('path')}>{data.id}</p>
          {/* <hr /> */}
        </div>
      )
    } else {
      return (
        <div className='peerItem' >
          { data.type ? <b className={css('name')}>{data.type}</b> : undefined }
          <h3 className='title'>{data.username || 'unnamed peer'}</h3>
          <p className={css('path')}>{data.id}</p>
          {/* <hr /> */}
        </div>
      )
    }
  }

  styles (props) {
    const { palette } = props
    return {
      name: {
        color: palette.b,
        fontFamily: '"source code pro", "courier", "monospace"'
      },
      path: {
        color: palette.path
      }
    }
  }
}

PeerItem.propTypes = {
  data: PropTypes.object.isRequired,
  link: PropTypes.bool,
  palette: Palette
  // onSelect: PropTypes.func.isRequired
}

PeerItem.defaultProps = {
  palette: defaultPalette
}
