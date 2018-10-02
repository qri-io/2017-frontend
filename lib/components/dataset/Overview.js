import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import MetaProps from '../../propTypes/metaProps.js'
import Base from '../Base'
import TagList from '../TagList'
import StatsBar from '../StatsBar'
import CommitItem from '../item/CommitItem'
import Button from '../chrome/Button'

import { defaultPalette } from '../../propTypes/palette'
import Schema from '../schema/schema.js'

export default class Overview extends Base {
  constructor (props) {
    super(props);
    [
      'filterFields',
      'renderFields',
      'renderTitle',
      'renderMeta',
      'renderSchema'
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
        <h5>{title}</h5>
        <NavLink className={css('nav')} to={url + '/' + link}>View Full</NavLink>
      </div>
    )
  }

  renderMeta (css, meta, name) {
    if (!meta) {
      if (name) {
        return (
          <h3 className={css('name')}>{name}</h3>
        )
      }
      return
    }
    return (
      <div className={css('wrap')}>
        <div className={css('titleWrap')}>
          <h3 className={css('name')}>{ (meta && meta.title) || name}</h3>
          {/* <div className={css('open')}> open data</div> */}
        </div>
        {meta && meta.keywords ? <TagList tags={meta.keywords} /> : undefined}
        {meta && meta.description ? <p>{meta.description}</p> : undefined}
        {meta && meta.downloadPath ? <a>{meta.downloadPath}</a> : undefined}
      </div>
    )
  }

  renderSchema (css, schema) {
    return (
      <div>
        <hr />
        <h5 className={css('name')}>Schema:</h5>
        <Schema schema={schema} style={{ margin: '10px 0' }} />
      </div>
    )
  }

  template (css) {
    const { datasetRef, profile, url } = this.props

    if (datasetRef === undefined || datasetRef.dataset === undefined) {
      return (<p>No overview found for this dataset.</p>)
    }

    const { dataset, name } = datasetRef
    const { meta, structure, commit } = dataset

    let md = meta
    if (typeof meta === 'string') {
      md = undefined
    }

    const index = url.indexOf('/overview')
    var newUrl = url.slice(0, index)
    if (index === -1) {
      newUrl = url
    }

    const updated = commit ? commit.timestamp : undefined

    return (
      <div className={css('wrap')}>
        {/* md && this.renderTitle(css, 'Meta', 'meta') */}
        {this.renderMeta(css, md, name)}
        {/* structure && updated && this.renderTitle(css, 'Structure', 'structure') */}
        {structure && updated && <StatsBar stats={this.stats(structure)} updated={updated} />}
        {/* commit && this.renderTitle(css, 'Commit', 'commit') */}
        {commit && <CommitItem data={datasetRef} profile={profile} index={0} /> }
        {structure && structure.schema && this.renderSchema(css, structure.schema)}
        {/* this.renderFields(md, css) */}
        <div className={css('buttonWrap')}><Button color='a' large full link={`${newUrl}/body`} text='TAKE ME TO THE DATA!' /></div>
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
      },
      buttonWrap: {
        marginTop: 40
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
