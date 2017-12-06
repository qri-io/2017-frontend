import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import StatsLine from '../StatsLine'
import { Palette, defaultPalette } from '../../propTypes/palette'
import Base from '../Base'

export default class DatasetItem extends Base {
  constructor (props) {
    super(props)
    this.state = {
      saveButtonState: 'displayNone'
    };
    [
      'handleOnMouseEnter',
      'handleOnMouseLeave',
      'renderSave'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleOnMouseEnter (e) {
    this.setState({ saveButtonState: 'displayInlineBlock' })
  }

  handleOnMouseLeave (e) {
    this.setState({ saveButtonState: 'displayNone' })
  }

  titleString (props) {
    const {data = {}, small} = props
    const {dataset = {}} = data
    if (small && dataset.title && dataset.title.length > 80) {
      return `${dataset.title.substring(0, 80)}...`
    }
    return dataset.title
  }

  stats (datasetRef) {
    const { dataset } = datasetRef
    const commits = dataset.commits || 1
    const fields = dataset.structure.schema.fields.length
    const rows = dataset.rows || 0

    return [{
      name: (fields === 1) ? 'field' : 'fields',
      value: fields
    },
    {
      name: (rows === 1) ? 'row' : 'rows',
      value: rows
    },
    {
      name: (commits === 1) ? 'commit' : 'commits',
      value: commits
    }]
  }

  renderSave (css, data) {
    const { onAdd } = this.props
    const { saveButtonState } = this.state
    return (
      <div className={`${css('save')} ${css(saveButtonState)}`} onClick={onAdd(data)} >
        <button className='btn btn-primary'>Save</button>
      </div>
    )
  }

  template (css) {
    const { data, link, small } = this.props
    const title = this.titleString(this.props)
    const path = data && data.path && data.path.slice(6, -13)

    if (link) {
      return (
        <div className={css('wrap', small && 'small')} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} >
          <div className='displayInlineBlock'>
            <Link to={{pathname: `/dataset/${path}`}} >
              <h3 className={css('title')}>{title || <i>untitled dataset</i>}</h3>
              <span className={css('name')}>{data.name || <i>unnamed dataset</i>}</span>{ data.peer ? undefined : <span className={css('name')}>&nbsp;✔</span>}
            </Link>
            <StatsLine muted stats={this.stats(data)} />
          </div>
          { data.peer ? this.renderSave(css, data) : undefined}
        </div>
      )
    } else {
      return (
        <div className='dataset item'>
          <b className={css('name')}>{data.name || <i>unnamed dataset</i>}</b>{ data.peer ? undefined : <b className={css('name')}>&nbsp;✔</b>}
          <h3>{(data.dataset && data.dataset.title) || <i>untitled dataset</i>}</h3>
          <p className={css('path')}>{data.path}</p>
        </div>
      )
    }
  }

  styles (props) {
    const { palette } = props
    return {
      wrap: {
        margin: 20,
        maxWidth: 820
      },
      small: {
        maxWidth: 300
      },
      name: {
        color: palette.b,
        fontFamily: '"source code pro", "courier", "monospace"'
      },
      path: {
        color: palette.path
      },
      title: {
        color: palette.text,
        marginBottom: 0
      },
      muted: {
        marginTop: 4,
        color: palette.muted
      },
      save: {
        marginLeft: '30px',
        marginTop: '20px'
      },
      displayNone: {
        display: 'none'
      },
      displayInlineBlock: {
        display: 'inline-block'
      }
    }
  }
}

DatasetItem.propTypes = {
  small: PropTypes.bool,
  link: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  palette: Palette
}

DatasetItem.defaultProps = {
  palette: defaultPalette,
  small: false
}
