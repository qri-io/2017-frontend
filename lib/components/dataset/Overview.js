import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import MetaProps from '../../propTypes/metaProps.js'
import { defaultPalette } from '../../propTypes/palette'
import fileSize from '../../utils/filesize'

import Base from '../Base'
import TagList from '../TagList'
import StatsBar from '../StatsBar'
import CommitItem from '../item/CommitItem'
import MetaSummary from './MetaSummary'

import Schema from '../schema/schema.js'
import ExternalLink from '../ExternalLink.APP_TARGET'

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
      fileSize(length),
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
        {meta && meta.keywords && <TagList tags={meta.keywords} />}
        {meta && meta.description && <p>{meta.description}</p>}
        {meta && meta.downloadPath && <ExternalLink href={meta.downloadPath}>{meta.downloadPath}</ExternalLink>}
      </div>
    )
  }

  renderSchema (css, schema) {
    return (
      <div className={`${css('schemaWrap')} border-top`}>
        <h5 className={css('name')}>Schema:</h5>
        <Schema schema={schema} style={{ margin: '10px 0' }} />
      </div>
    )
  }

  template (css) {
    const { datasetRef, profile, registryVersion } = this.props

    if (datasetRef === undefined || datasetRef.dataset === undefined) {
      return (<p>No overview found for this dataset.</p>)
    }

    const { dataset, name } = datasetRef
    const { meta, structure, commit } = dataset

    let md = meta
    if (typeof meta === 'string') {
      md = undefined
    }

    // const index = url.indexOf('/overview')
    // var newUrl = url.slice(0, index)
    // if (index === -1) {
    //   newUrl = url
    // }

    const updated = commit ? commit.timestamp : undefined

    return (
      <div className={css('wrap')}>
        {/* md && this.renderTitle(css, 'Meta', 'meta') */}
        <MetaSummary meta={md} name={name} />
        {/* structure && updated && this.renderTitle(css, 'Structure', 'structure') */}
        {structure && updated && <div className='border-top border-bottom'><StatsBar stats={this.stats(structure)} updated={updated} /></div>}
        {/* commit && this.renderTitle(css, 'Commit', 'commit') */}
        {commit && <CommitItem data={datasetRef} profile={profile} index={0} registryVersion={registryVersion} /> }
        {structure && structure.schema && this.renderSchema(css, structure.schema)}
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        display: 'flex',
        flexDirection: 'column'
      },
      fields: {
        fontSize: 14,
        marginTop: 20
      },
      value: {
        marginLeft: 5
      },
      key: {
        color: palette.primaryMuted
      },
      meta: {
        marginRight: 20
      },
      open: {
        display: 'inline-block',
        background: palette.primary,
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
      },
      schemaWrap: {
        padding: 20
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
