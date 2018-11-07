import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import StatsLine from '../StatsLine'
import DatasetName from '../DatasetName'
import Base from '../Base'
import fileSize from '../../utils/filesize'

export default class DatasetItem extends Base {
  constructor (props) {
    super(props);

    [
      'titleString'
    ].forEach((m) => { this[m] = this[m].bind(this) })
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

    return [
      {
        name: (entries === 1) ? 'entry' : 'entries',
        value: entries
      },
      fileSize(length)
    ]
  }

  template (css) {
    const { data, rename, border } = this.props
    const title = this.titleString()

    const path = `/${data.peername}/${data.name}/at${data.path}`
    return (
      <Link className={`${css('wrap')} ${border && 'border-bottom '}`} to={{ pathname: path }} >
        {title && <h3 className={css('title')}>{title}</h3>}
        <DatasetName rename={rename} peername={data.peername} name={data.name || 'unnamed dataset'} style={{ display: 'inline-block', margin: '0 0 13px 0', wordWrap: 'break-word' }} />
        { data.dataset && data.dataset.structure ? <StatsLine stats={this.stats(data)} updated={data.dataset && data.dataset.commit && data.dataset.commit.timestamp} /> : undefined}
      </Link>
    )
  }

  styles () {
    return {
      wrap: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column'
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
