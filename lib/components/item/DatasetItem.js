import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
      'handleOnAdd',
      'renderSave'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleOnMouseEnter (e) {
    this.setState({ saveButtonState: 'displayInlineBlock' })
  }

  handleOnMouseLeave (e) {
    this.setState({ saveButtonState: 'displayNone' })
  }

  handleOnAdd (path, name, peer) {
    return () => this.props.onAdd(path, name, peer)
  }

  renderSave (css, data) {
    const { onAdd } = this.props
    const { saveButtonState } = this.state
    return (
      <div className={`${css('save')} ${css(saveButtonState)}`} onClick={onAdd(data.path, data.name || 'unnamed dataset', true)} >
        <button className='btn btn-primary'>Save</button>
      </div>
    )
  }

  template (css) {
    const { data, link } = this.props
    const path = data && data.path && data.path.slice(6, -13)
    if (link) {
      return (
        <div className={css('datasetItem')} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} >
          <div className='displayInlineBlock'>
            <Link to={{pathname: `/dataset/${path}`}} >
              <b className={css('name')}>{data.name || <i>unnamed dataset</i>}</b>{ data.peer ? undefined : <b className={css('name')}>&nbsp;✔</b>}
              <h3>{(data.dataset && data.dataset.title) || <i>untitled dataset</i>}</h3>
            </Link>
            <p className={css('path')}>{data.path}</p>
          </div>
          { data.peer ? this.renderSave(css, data) : undefined}
        </div>
      )
    } else {
      return (
        <div className='dataset item' >
          <b className={css('name')}>{data.name || <i>unnamed dataset</i>}</b>{ data.peer ? undefined : <b className={css('name')}>&nbsp;✔</b>}
          <h3>{(data.dataset && data.dataset.title) || <i>untitled dataset</i>}</h3>
          <p className={css('path')}>{data.path}</p>
          {/* <ul>
            {data.schema.fields && data.schema.fields.map((table, i) => <li key={i}>{table.name}</li>)}
          </ul> */}
        </div>
      )
    }
  }

  styles (props) {
    const { palette } = props
    return {
      name: {
        color: palette.b,
        fontFamily: '"source code pro", "courier", "monospace"'
      },
      path: {
        color: palette.path
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
      },
      datasetItem: {
        display: 'flex'
      }
    }
  }
}

DatasetItem.propTypes = {
  link: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  palette: Palette
}

DatasetItem.defaultProps = {
  palette: defaultPalette
}
