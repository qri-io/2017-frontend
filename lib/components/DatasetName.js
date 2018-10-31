import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class DatasetName extends Base {
  constructor (props) {
    super(props);
    [
      'renderName'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderName (css, link, peername, name) {
    if (link) {
      return (
        <span>
          <NavLink className={css('datasetName')} to={'/' + peername}>{peername}</NavLink>
          <span className={css('slash')}>/</span>
          <NavLink className={css('datasetName')} to={`/${peername}/${name}`
          }>{name}</NavLink>
        </span>
      )
    }

    if (peername) {
      return (<span>{peername}/{name}</span>)
    }
    return (<span>{name}</span>)
  }

  template (css) {
    const { peername, name, large, style, rename, xlarge, link } = this.props
    const datasetClass = large ? 'linkLarge' : 'linkMedium'
    return (
      <div className={`${datasetClass} ${xlarge ? css('xlarge') : undefined}`} style={style}>
        { this.renderName(css, link, peername, name) }
        { rename ? <span title='edit dataset name' className={`icon-inline ${css('edit')}`} onClick={() => rename()}>pen</span> : undefined }
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      slash: {
        color: '#000'
      },
      edit: {
        marginLeft: 8,
        cursor: 'pointer',
        color: palette.primaryMuted,
        ':hover': {
          color: palette.primary
        }
      },
      xlarge: {
        fontSize: 30
      }
    }
  }
}

DatasetName.propTypes = {
  style: PropTypes.object,
  peername: PropTypes.string,
  name: PropTypes.string.isRequired,
  large: PropTypes.bool.isRequired,
  rename: PropTypes.func
}

DatasetName.defaultProps = {
  style: {},
  large: false
}
