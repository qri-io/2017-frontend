import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'

import TagList from './TagList'
import Base from './Base'

export default class MetaOverview extends Base {
  template (css) {
    const { meta, name } = this.props
    return (
      <div className={css('wrap')}>
        <div className={css('titleWrap')}>
          <h3 className={css('name')}>{ meta ? meta.title : name}</h3>
          {/* <div className={css('open')}> open data</div> */}
        </div>
        {meta && meta.keywords ? <TagList tags={meta.keywords} /> : undefined}
        {meta && meta.description ? <p>{meta.description}</p> : undefined}
        {meta && meta.downloadPath ? <a>{meta.downloadPath}</a> : undefined}
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      tableWrap: {
        width: '100%',
        marginTop: 10,
        borderRadius: 3,
        border: '1px solid #eee',
        overflow: 'hidden'
      },
      table: {
        width: '100%'
      },
      row: {
        borderBottom: '1px solid #eee'
      },
      key: {
        padding: '8px 5px'
      },
      flex: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }
  }
}
