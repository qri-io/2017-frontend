import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import StatsLine from '../StatsLine'
import DatasetName from '../DatasetName'
import Hash from '../Hash'
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
      'renderSave',
      'renderOnAdd'
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
    const { meta } = dataset
    if (small && meta.title && meta.title.length > 30) {
      return `${meta.title.slice(0, 30)}...`
    }
    return meta.title
  }

  stats (datasetRef) {
    const { dataset } = datasetRef
    const length = dataset.structure.length
    const entries = dataset.structure.entries || 0
    const errors = dataset.structure.errCount || 0

    return [
      {
        name: (errors === 1) ? 'error' : 'errors',
        value: errors
      },
      {
        name: (entries === 1) ? 'entry' : 'entries',
        value: entries
      },
      {
        name: ' ',
        value: length
      }]
  }

  renderOnAdd (e) {
    this.props.onAdd(this.props.data)
  }

  renderSave (css) {
    const { saveButtonState } = this.state
    return (
      <div className={`${css('save')} ${css(saveButtonState)}`} onClick={this.renderOnAdd} >
        <DatasetName save name='Save' />
      </div>
    )
  }

  template (css) {
    const { data, link, small, isLatestDataset } = this.props
    const title = this.titleString(this.props)
    // const path = data && data.path && data.path.slice(6, -13)
    const path = `/${data.peername}/${data.name}/at${data.path}`
    if (link) {
      return (
        <div className={css('wrap', small && 'small')} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} >
          <div className='displayInlineBlock'>
            <Link to={{pathname: path}} >
              <h3 className={css('title')}>{title || <i>untitled dataset</i>}</h3>
              <span className={css('name')}>{data.name || <i>unnamed dataset</i>}</span>{ data.peer ? undefined : <span className={css('name')}>&nbsp;✔</span>}
            </Link>
            { data.peer ? this.renderSave(css) : undefined}
            <StatsLine muted stats={this.stats(data)} />
          </div>
        </div>
      )
    } else {
      return (
        <div className={css('wrap', small && 'small')} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} >
          <div className='displayInlineBlock'>
            <DatasetName name={data.name || 'unnamed dataset'} large style={{display: 'inline-block', marginBottom: 15}} />
            {!isLatestDataset ? <div className={css('previousCommit')}>You are viewing a previous version of this dataset</div> : undefined}
            <Hash hash={data.path} style={{marginBottom: 15}} />
            { data.peer ? this.renderSave(css) : undefined}
            <h2>{title || 'untitled dataset'}</h2>
            <StatsLine stats={this.stats(data)} extraSpace large style={{marginTop: 30}} />
          </div>
        </div>
      )
    }
  }

  styles (props) {
    const { palette } = props
    return {
      wrap: {
        margin: '20px 20px 20px 0'
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
        marginLeft: 30,
        cursor: 'pointer'
      },
      displayNone: {
        display: 'none'
      },
      displayInlineBlock: {
        display: 'inline-block'
      },
      previousCommit: {
        color: palette.error,
        display: 'inline-block',
        float: 'right'
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
