import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import { defaultPalette } from '../propTypes/palette'

// json documents can get pretty big, this constant sets the treshold at
// which Arr and Obj components automatically collapse their contents on
// initial render, which keeps initial loading snappy and lets the user
// decide if they really do want to see the contents of a container with
// lots of elements
const autoCollapseLength = 101
// size in pixels to left-indent for each closure
const indentAmount = 9

export default class Json extends Base {
  template (css) {
    const { body } = this.props
    if (body == null) {
      return <span className={css('null')}>null</span>
    }
    switch (typeof body) {
      case 'object':
        if (Array.isArray(body)) {
          return <Arr body={body} />
        }
        return <Obj body={body} />
      case 'number':
        return <span className={css('number')}>{body}</span>
      case 'boolean':
        return <span className={css('boolean')}>{body ? 'true' : 'false'}</span>
      default:
        // assume string
        return <span className={css('string')}>{body}</span>
    }
  }

  styles () {
    const palette = defaultPalette
    return {
      boolean: {
        color: palette.primary
      },
      number: {
        color: palette.primary
      },
      string: {
        color: palette.text
      },
      null: {
        color: palette.primary
      }
    }
  }
}

Json.propTypes = {
  body: PropTypes.any.isRequired
}

export class Arr extends Base {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: props.body.length >= autoCollapseLength
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.setState({ collapsed: !this.state.collapsed })
    e.stopPropagation()
  }

  template (css) {
    const { body } = this.props
    return (<div className={css('array')}><span onClick={this.handleClick} className={css('handle')}>&#91;</span>
      {this.state.collapsed
        ? <span onClick={this.handleClick} className={css('handle')}>{body.length} hidden</span>
        : body.map((d, i) => {
          if (i === body.length - 1) {
            return <span key={i} className={css('element')}><Json body={d} /></span>
          }
          return <span key={i} className={css('element')}><Json key={i} body={d} />, </span>
        })}
      &#93;</div>)
  }

  styles (props) {
    return {
      array: {
        fontFamily: 'monospace',
        // paddingLeft: indentAmount,
        color: defaultPalette.lightGray,
        fontSize: 14
      },
      handle: {
        cursor: 'pointer'
      }
    }
  }
}

Arr.propTypes = {
  body: PropTypes.array.isRequired
}

export class Obj extends Base {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: Object.keys(props.body).length >= autoCollapseLength
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.setState({ collapsed: !this.state.collapsed })
    e.stopPropagation()
  }

  template (css) {
    const { body } = this.props
    return (<span className={css('object')}><span onClick={this.handleClick} className={css('handle')}>&#123;</span>
      {this.state.collapsed
        ? <span onClick={this.handleClick} className={css('handle')}>{Object.keys(body).length} hidden</span>
        : Object.keys(body).map((k) => {
          return (<div className={css('keyWrap')} key={k}>
            <span className={css('key')}>{k}</span>: <Json body={body[k]} />
          </div>)
        })}
    &#125;</span>)
  }

  styles () {
    const palette = defaultPalette
    return {
      object: {
        fontFamily: 'monospace',
        // paddingLeft: indentAmount,
        color: palette.primaryLight,
        fontSize: 14
      },
      handle: {
        cursor: 'pointer'
      },
      keyWrap: {
        paddingLeft: indentAmount
      },
      key: {
        color: palette.primary
      }
    }
  }
}

Obj.propTypes = {
  body: PropTypes.object.isRequired
}
