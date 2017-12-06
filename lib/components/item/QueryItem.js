import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import Hash from '../Hash'
import Datestamp from '../Datestamp'
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
      <div className={css('wrap')} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
        <div className={`${css('save')} ${css(saveButtonState)}`} onClick={funcs.onClickSave} >
          <button className='btn btn-primary'>Save</button>
        </div>
        <div className={css('displayInlineBlock')} >
          <h5 className={`code ${css('title')}`} onClick={funcs.onClickQuery}>{data.name || (data.dataset && data.dataset.queryString) || 'unnamed query'}</h5>
          <Hash hash={data.path} muted short noPrefix />
          <Datestamp dateString={data.dataset.timestamp} muted />
        </div>
      </div>
    )
  }
  styles (props) {
    const { palette } = props
    return {
      wrap: {
        margin: 20
      },
      title: {
        cursor: 'pointer',
        color: palette.text
      },
      save: {
        marginLeft: 30,
        marginTop: 20,
        float: 'right'
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
