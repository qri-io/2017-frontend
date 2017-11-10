import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import { Palette, defaultPalette } from '../../propTypes/palette'

export default class QueryItem extends Base {
  constructor (props) {
    super(props)
    this.state = {
      saveButtonState: 'displayNone'
    };
    [
      'handleOnMouseEnter',
      'handleOnMouseLeave'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleOnMouseEnter (e) {
    this.setState({ saveButtonState: 'displayInlineBlock' })
  }

  handleOnMouseLeave (e) {
    this.setState({ saveButtonState: 'displayNone' })
  }

  template (css) {
    const { data, onSelect } = this.props
    const { saveButtonState } = this.state
    const funcs = onSelect()
    return (
      <div className={css('queryItem')} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
        <div className={css('displayInlineBlock')} >
          <h5 className={css('title')} onClick={funcs.onClickQuery}>{data.name || (data.dataset && data.dataset.queryString) || 'unnamed query'}</h5>
          <p><i>{data.path}</i></p>
        </div>
        <div className={`${css('save')} ${css(saveButtonState)}`} onClick={funcs.onClickSave} >
          <button className='btn btn-primary'>Save</button>
        </div>
      </div>
    )
  }
  styles (props) {
    const { palette } = props
    return {
      title: {
        cursor: 'pointer',
        color: palette.a
      },
      queryItem: {
        display: 'flex'
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

QueryItem.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  palette: Palette
}

QueryItem.defaultProps = {
  palette: defaultPalette
}
