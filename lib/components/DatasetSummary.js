import React from 'react'
import PropTypes from 'prop-types'
import MetaProps from '../propTypes/metaProps.js'
import Base from './Base'
import Button from './Button'
import TagList from './TagList'
import StatsLine from './StatsLine'

import { defaultPalette } from '../propTypes/palette'

export default class DatasetSummary extends Base {
  constructor (props) {
    super(props);
    [
      'filterFields',
      'renderFields'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  filterFields (meta) {
    const filter = [
      'title',
      'keywords',
      'description',
      'downloadPath',
      'qri'
    ]

    return Object.keys(meta)
      .filter(key => !filter.includes(key) && !(meta[key].constructor === Object && Object.keys(meta[key]).length === 0))
      .reduce((res, key) => Object.assign(res, { [key]: meta[key] }), {})
  }

  datasetLength (l) {
    var length = {name: '', value: 0}
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

  stats (structure) {
    const length = structure.length
    const entries = structure.entries || 0
    const errors = structure.errCount || 0

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

  renderFields (meta, css) {
    const filteredMeta = this.filterFields(meta)
    return Object.keys(filteredMeta)
      .map((key, i) => {
        return (
          <p key={i} className={css('fields')}>
            <span className={css('key')}>
              {JSON.stringify(key)}:
            </span>
            <span className={css('value')}>
              {meta[key]}
            </span>
          </p>
        )
      })
  }

  template (css) {
    const { meta, structure } = this.props

    if (meta === undefined) {
      return (<p>No summary found for this dataset.</p>)
    }

    let md = meta
    if (typeof meta === 'string') {
      md = {path: meta}
    }
    return (
      <div className={css('flex')}>
        <div className={css('meta')} >
          {md.title ? <h3>{md.title}</h3> : undefined}
          {md.keywords ? <TagList tags={md.keywords} /> : undefined}
          {md.description ? <p>{md.description}</p> : undefined}
          {md.downloadPath ? <a>{md.downloadPath}</a> : undefined}
          {structure ? <StatsLine muted stats={this.stats(structure)} /> : undefined}
          {this.renderFields(md, css)}
        </div>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      flex: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      fields: {
        fontSize: 14,
        marginTop: 20
      },
      value: {
        marginLeft: 5
      },
      key: {
        color: palette.neutral
      },
      meta: {
        marginRight: 20
      }
    }
  }
}

DatasetSummary.propTypes = {
  meta: MetaProps,
  onClickEdit: PropTypes.func
}

DatasetSummary.defaultProps = {
}
