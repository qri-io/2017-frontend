import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import MetaProps from '../propTypes/metaProps.js'
import Base from './Base'
import TagList from './TagList'
import StatsLineLarge from './StatsLineLarge'
import CommitLine from './CommitLine'
import ComponentTable from './ComponentTable'
import MetaOverview from './MetaOverview'
// import CommitViewer from './CommitViewer'

import { defaultPalette } from '../propTypes/palette'

export default class Overview extends Base {
  constructor (props) {
    super(props);
    [
      'filterFields',
      'renderFields',
      'renderTitle'
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

  stats (structure) {
    if (structure === undefined) {
      return undefined
    }
    const length = structure.length
    const entries = structure.entries || 0
    const errors = structure.errCount || 0

    return [
      {
        name: 'body format',
        value: structure.format.toUpperCase()
      },
      this.datasetLength(length),
      {
        name: (entries === 1) ? 'entry' : 'entries',
        value: entries
      },
      {
        name: (errors === 1) ? 'error' : 'errors',
        value: errors
      }
    ]
  }

  renderFields (meta, css) {
    if (!meta) {
      return undefined
    }
    const filteredMeta = this.filterFields(meta)
    return Object.keys(filteredMeta)
      .map((key, i) => {
        return (
          <p key={i} className={css('fields')}>
            <span className={css('key')}>
              {JSON.stringify(key)}:
            </span>
            <span className={css('value')}>
              {JSON.stringify(meta[key])}
            </span>
          </p>
        )
      })
  }

  renderTitle (css, title, link) {
    const { url } = this.props
    return (
      <div className={css('flex')}>
        <h5>{title}</h5><NavLink className={css('nav')} to={url + '/' + link}>View Full</NavLink>
      </div>
    )
  }

  template (css) {
    const { datasetRef } = this.props

    if (datasetRef === undefined || datasetRef.dataset === undefined) {
      return (<p>No overview found for this dataset.</p>)
    }

    const { dataset } = datasetRef
    const { name } = dataset
    const { meta, structure, commit, transform, viz } = dataset

    let md = meta
    if (typeof meta === 'string') {
      md = undefined
    }

    const updated = commit ? commit.timestamp : undefined

    return (
      <div className={css('wrap')}>
        {md && this.renderTitle(css, 'Metadata', 'meta')}
        {md && <MetaOverview meta={md} name={name} />}
        {structure && updated && this.renderTitle(css, 'Structure', 'structure')}
        {structure && updated && <StatsLineLarge stats={this.stats(structure)} updated={updated} />}
        {/* commit && <CommitLine path={datasetRef.path} commit={commit} /> */}
        {/* this.renderFields(md, css) */}
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
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
      },
      open: {
        display: 'inline-block',
        background: palette.c,
        color: 'rgba(0,0,0,0.6)',
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: 20,
        padding: '4px 8px',
        fontSize: 12,
        marginLeft: 20
      },
      titleWrap: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 25
      },
      name: {
        margin: 0
      },
      flex: {
        marginTop: 40,
        display: 'flex',
        alignItems: 'baseline'
      },
      nav: {
        marginLeft: 5,
        fontSize: 14
      }
    }
  }
}

Overview.propTypes = {
  meta: MetaProps,
  onClickEdit: PropTypes.func
}

Overview.defaultProps = {
}
