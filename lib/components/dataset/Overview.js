import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import MetaProps from '../../propTypes/metaProps.js'
import fileSize from '../../utils/filesize'
import TagList from '../TagList'
import StatsBar from '../StatsBar'
import CommitItem from '../item/CommitItem'
import MetaSummary from './MetaSummary'

import Schema from '../schema/schema.js'
import ExternalLink from '../ExternalLink.APP_TARGET'

export default class Overview extends React.PureComponent {
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

  renderFields (meta) {
    if (!meta) {
      return undefined
    }
    const filteredMeta = this.filterFields(meta)
    return Object.keys(filteredMeta)
      .map((key, i) => {
        return (
          <p key={i} className='overview-fields'>
            <span className='overview-key'>
              {JSON.stringify(key)}:
            </span>
            <span className='overview-value'>
              {JSON.stringify(meta[key])}
            </span>
          </p>
        )
      })
  }

  renderTitle (title, link) {
    const { url } = this.props
    return (
      <div className='overview-flex'>
        <h5>{title}</h5>
        <NavLink className='overview-nav' to={url + '/' + link}>View Full</NavLink>
      </div>
    )
  }

  renderMeta (meta, name) {
    if (!meta) {
      if (name) {
        return (
          <h3 className='overview-name'>{name}</h3>
        )
      }
      return
    }
    return (
      <div className='overview-wrap'>
        <div className='overview-title-wrap'>
          <h3 className='overview-name'>{ (meta && meta.title) || name}</h3>
          {/* <div className='overview-open'> open data</div> */}
        </div>
        {meta && meta.keywords && <TagList tags={meta.keywords} />}
        {meta && meta.description && <p>{meta.description}</p>}
        {meta && meta.downloadPath && <ExternalLink href={meta.downloadPath}>{meta.downloadPath}</ExternalLink>}
      </div>
    )
  }

  renderSchema (schema) {
    return (
      <div className='overview-schema-wrap border-top'>
        <h5 className='overview-name'>Schema:</h5>
        <Schema schema={schema} style={{ margin: '10px 0' }} />
      </div>
    )
  }

  render () {
    const { datasetRef, profile, registryVersion, sessionProfile, layout } = this.props

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
      <div className='overview-wrap' style={{ width: layout.width - 306 }}>
        {/* md && this.renderTitle('Meta', 'meta') */}
        <MetaSummary meta={md} name={name} />
        {/* structure && updated && this.renderTitle('Structure', 'structure') */}
        {structure && updated && <div className='border-top border-bottom'><StatsBar stats={this.stats(structure)} updated={updated} /></div>}
        {/* commit && this.renderTitle('Commit', 'commit') */}
        {commit && <CommitItem data={datasetRef} profile={profile} index={0} registryVersion={registryVersion} sessionProfile={sessionProfile} /> }
        {structure && structure.schema && this.renderSchema(structure.schema)}
      </div>
    )
  }
}

Overview.propTypes = {
  meta: MetaProps,
  onClickEdit: PropTypes.func
}

Overview.defaultProps = {
}
