import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ProfilePhoto from '../ProfilePhoto'
import { Palette, defaultPalette } from '../../propTypes/palette'
import Base from '../Base'

export default class PeerItem extends Base {
  template (css) {
    const { data } = this.props
    return (
      <div className={css('wrap')} >
        <Link className={css('photo')} to={{ pathname: `/peers/${data.id}` }}>
          <ProfilePhoto peer={data} />
        </Link>
        <div className={css('info')}>
          { data.connected ? <b className={css('name')}> ⚡</b> : undefined }
          <Link to={{ pathname: `/peers/${data.id}` }}>
            <h3 className={css('title')}>{data.peername || 'unnamed peer'}</h3>
          </Link>
          {data.name && <p className={css('muted', 'name')}>{data.name}</p>}
          {/* <p className={css('muted')}><b>32</b> Datasets</p> */}
          <p className={css('muted')}>&nbsp;</p>
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
      wrap: {
        margin: 20,
        padding: 0
      },
      photo: {
        float: 'left'
      },
      info: {
        display: 'inline-block',
        marginLeft: 10
      },
      title: {
        color: palette.text,
        marginBottom: -1,
        marginTop: -5
      },
      muted: {
        color: palette.muted
      },
      name: {
        color: palette.muted,
        marginBottom: -1,
        marginTop: -3
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
