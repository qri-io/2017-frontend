import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '../chrome/Spinner'
import Base from '../Base'
import TagItem from '../item/TagItem'
import MetaProps from '../../propTypes/metaProps'

export default class MetaSummary extends Base {
  constructor (props) {
    super(props);

    [
      'renderTheme',
      'renderTags'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderTheme (css, themes) {
    if (themes.length === 0) {
      return undefined
    }
    return (
      <div className={css('themeList')}>
        {themes.map((t, i) =>
          <div key={i} className={css('theme')}>
            <h5>{t}</h5>
          </div>
        )}
      </div>
    )
  }

  renderTags (css, tags) {
    if (tags.length === 0) {
      return undefined
    }
    return (
      <div className={css('tags')}>
        {tags.map((t, i) =>
          <TagItem tag={t} key={i} />
        )
        }
      </div>
    )
  }

  template (css) {
    const { meta, name, loading } = this.props

    if (loading) {
      return (<div className={css('wrap')}><Spinner /></div>)
    }

    if (!meta && !name) {
      return (<div className={css('wrap')}><div>No Metadata given for this dataset</div></div>)
    }

    return (
      <div className={css('wrap')}>
        {<h1>{(meta && meta.title) || name}</h1>}
        {meta && meta.theme && this.renderTheme(css, meta.theme)}
        <div className={css('content')}>
          {meta && meta.description && <p className={css('description')}>{meta.description}</p>}
          {meta && meta.keywords && this.renderTags(css, meta.keywords)}
        </div>
      </div>
    )
  }
  styles () {
    return {
      wrap: {
        display: 'flex',
        flexDirection: 'column',
        margin: 20
      },
      content: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      description: {
        marginRight: 20,
        paddingRight: 20,
        maxWidth: 560
      },
      tags: {
        flex: '0 0'
      },
      theme: {
        display: 'inline-block',
        marginRight: 20
      }
    }
  }
}

MetaSummary.propTypes = {
  meta: MetaProps,
  loading: PropTypes.bool,
  name: PropTypes.string
}

MetaSummary.defaultProps = {
}
