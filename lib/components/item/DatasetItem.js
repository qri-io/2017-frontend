import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import StatsLine from '../StatsLine'
import DatasetName from '../DatasetName'
import { defaultPalette } from '../../propTypes/palette'
import Base from '../Base'
import Spinner from '../chrome/Spinner'

export default class DatasetItem extends Base {
  constructor (props) {
    super(props);

    [
      'handleOnMouseEnter',
      'handleOnMouseLeave',
      'renderOnAdd',
      'titleString'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleOnMouseEnter (e) {
    this.setState({ saveButtonState: 'displayInlineBlock' })
  }

  handleOnMouseLeave (e) {
    this.setState({ saveButtonState: 'displayNone' })
  }

  datasetLength (l) {
    var length = { name: '', value: 0 }
    if (l > Math.pow(2, 80)) {
      length.name = 'YB'
      length.value = Math.trunc(l / Math.pow(2, 80))
    } else if (l > Math.pow(2, 70)) {
      length.name = 'ZB'
      length.value = Math.trunc(l / Math.pow(2, 70))
    } else if (l > Math.pow(2, 60)) {
      length.name = 'EB'
      length.value = Math.trunc(l / Math.pow(2, 60))
    } else if (l > Math.pow(2, 50)) {
      length.name = 'PB'
      length.value = Math.trunc(l / Math.pow(2, 50))
    } else if (l > Math.pow(2, 40)) {
      length.name = 'TB'
      length.value = Math.trunc(l / Math.pow(2, 40))
    } else if (l > Math.pow(2, 30)) {
      length.name = 'GB'
      length.value = Math.trunc(l / Math.pow(2, 30))
    } else if (l > Math.pow(2, 20)) {
      length.name = 'MB'
      length.value = Math.trunc(l / Math.pow(2, 20))
    } else if (l > Math.pow(2, 10)) {
      length.name = 'KB'
      length.value = Math.trunc(l / Math.pow(2, 10))
    } else if (l > 0) {
      length.name = 'byte'
      length.value = l
    }
    if (l !== 1) {
      length.name += 's'
    }
    return length
  }

  titleString () {
    const { data = {}, small } = this.props
    const name = data.name || ''
    const { dataset = {} } = data
    const { meta = {} } = dataset
    if (small && meta && meta.title && meta.title.length > 30) {
      return `${meta.title.slice(0, 30)}...`
    }
    return (meta && meta.title) || name
  }

  stats (datasetRef) {
    const { dataset } = datasetRef

    const length = dataset.structure.length
    const entries = dataset.structure.entries || 0
    const errors = dataset.structure.errCount || 0

    return [
      {
        name: (errors === 1) ? 'error' : 'errors',
        value: errors
      },
      {
        name: (entries === 1) ? 'entry' : 'entries',
        value: entries
      },
      this.datasetLength(length)
    ]
  }

  renderOnAdd (e) {
    const { data } = this.props
    const name = data.name
    const peername = data.peername
    const path = data.path
    const peer = data.peer

    this.props.onAdd(peername, name, path, peer)
  }

  template (css) {
    const { data, link, small, isLatestDataset, rename } = this.props
    const title = this.titleString()

    // if the data is transfering, use a spinner to indicate action
    const spinner = data && data.transfering

    // const path = data && data.path && data.path.slice(6, -13)
    const path = `/${data.peername}/${data.name}/at${data.path}`
    if (link) {
      return (
        <div className={css('wrap', small && 'small')} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} >
          <div className='displayInlineBlock'>
            <div className={css('refWrap')} >
              <Link to={{ pathname: path }} >
                <h3 className={css('title')}>{title || <i>untitled dataset</i>}</h3>
                <DatasetName rename={rename} peername={data.peername} name={data.name || 'unnamed dataset'} style={{ display: 'inline-block', margin: '13px 0' }} />
              </Link>
              {spinner && <div className={css('spinner')}><Spinner button center={false} /></div>}
            </div>
            { data.dataset && data.dataset.structure ? <StatsLine stats={this.stats(data)} updated={data.dataset && data.dataset.commit && data.dataset.commit.timestamp} /> : undefined}
          </div>
        </div>
      )
    } else {
      return (
        <div className={css('wrap', small && 'small')} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} >
          {!isLatestDataset ? <div className={css('previousCommit')}>You are viewing a previous version of this dataset</div> : undefined}
          <div className='displayInlineBlock'>
            <div className={css('refWrap')} >
              <div>
                <h3>{title || 'untitled dataset'}</h3>
                <DatasetName rename={rename} peername={data.peername} name={data.name || 'unnamed dataset'} style={{ display: 'inline-block', margin: '13px 0' }} />
              </div>
              {spinner && <div className={css('spinner')}><Spinner button center={false} /></div>}
            </div>
            <StatsLine stats={this.stats(data)} extraSpace large style={{ marginTop: 30 }} updated={data.dataset && data.dataset.commit && data.dataset.commit.timestamp} />
          </div>
        </div>
      )
    }
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        margin: '25px'
      },
      small: {
        maxWidth: 300
      },
      name: {
        color: palette.primary,
        fontFamily: '"source code pro", "courier", "monospace"'
      },
      path: {
        color: palette.primaryMuted
      },
      title: {
        color: palette.text,
        marginBottom: 0
      },
      muted: {
        marginTop: 4,
        color: palette.primaryDark
      },
      displayInlineBlock: {
        display: 'inline-block'
      },
      previousCommit: {
        color: palette.error,
        position: 'absolute',
        marginTop: -15
      },
      refWrap: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      spinner: {
        paddingLeft: 10,
        marginTop: 20,
        display: 'inline-block'
      }
    }
  }
}

DatasetItem.propTypes = {
  small: PropTypes.bool,
  link: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  peer: PropTypes.bool,
  rename: PropTypes.func,
  isLatestDataset: PropTypes.bool
}

DatasetItem.defaultProps = {
  small: false
}
