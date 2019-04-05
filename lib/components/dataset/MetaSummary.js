import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '../chrome/Spinner'

import TagItem from '../item/TagItem'
import MetaProps from '../../propTypes/metaProps'

export default class MetaSummary extends React.PureComponent {
  constructor (props) {
    super(props);

    [
      'renderTheme',
      'renderTags'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderTheme (themes) {
    if (themes.length === 0) {
      return undefined
    }
    return (
      <div>
        {themes.map((t, i) =>
          <div key={i} className='meta-summary-theme'>
            <h5>{t}</h5>
          </div>
        )}
      </div>
    )
  }

  renderTags (tags) {
    if (tags.length === 0) {
      return undefined
    }
    return (
      <div className='meta-summary-tags'>
        {tags.map((t, i) =>
          <TagItem tag={t} key={i} />
        )}
      </div>
    )
  }

  render () {
    const { meta, name, loading } = this.props

    if (loading) {
      return (<div className='meta-summary-wrap'><Spinner large /></div>)
    }

    if (!meta && !name) {
      return (<div className='meta-summary-wrap'><div>No Metadata given for this dataset</div></div>)
    }

    return (
      <div className='meta-summary-wrap'>
        {<h1>{(meta && meta.title) || name}</h1>}
        {meta && meta.theme && this.renderTheme(meta.theme)}
        <div className='meta-summary-content'>
          {meta && meta.description && <p className='meta-summary-description'>{meta.description}</p>}
          {meta && meta.keywords && this.renderTags(meta.keywords)}
        </div>
      </div>
    )
  }
}

MetaSummary.propTypes = {
  meta: MetaProps,
  loading: PropTypes.bool,
  name: PropTypes.string
}

MetaSummary.defaultProps = {
}
