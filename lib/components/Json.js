import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'

// json documents can get pretty big, this constant sets the treshold at
// which Arr and Obj components automatically collapse their contents on
// initial render, which keeps initial loading snappy and lets the user
// decide if they really do want to see the contents of a container with
// lots of elements
const autoCollapseLength = 101
// size in pixels to left-indent for each closure
const indentAmount = 9

export default class Json extends Base {
  render () {
    const { body, light } = this.props
    const color = light ? 'json-light' : 'json-dark'
    const stringColor = light ? 'white' : 'text'
    if (body == null) {
      return <span className={color}>null</span>
    }
    switch (typeof body) {
      case 'object':
        if (Array.isArray(body)) {
          return <Arr body={body} light={light} />
        }
        return <Obj body={body} light={light} />
      case 'number':
        return <span className={color}>{body}</span>
      case 'boolean':
        return <span className={color}>{body ? 'true' : 'false'}</span>
      default:
        // assume string
        return <span className={stringColor}>{body}</span>
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
    const { body, light } = this.props
    const color = 'arr'
    return (<div className={`${css('array')} ${color}`}><span onClick={this.handleClick} className={css('handle')}>&#91;</span>
      {this.state.collapsed
        ? <span onClick={this.handleClick} className={css('handle')}>{body.length} hidden</span>
        : body.map((d, i) => {
          if (i === body.length - 1) {
            return <span key={i} className={css('element')}><Json body={d} light={light} /></span>
          }
          return <span key={i} className={css('element')}><Json key={i} body={d} light={light} />, </span>
        })}
      &#93;</div>)
  }

  styles (props) {
    return {
      array: {
        fontFamily: 'monospace',
        // paddingLeft: indentAmount,
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
    const { body, light } = this.props
    const color = light ? 'obj-light' : 'obj-dark'
    const keyColor = light ? 'json-light' : 'json-dark'
    return (<span className={`${css('object')} ${color}`}><span onClick={this.handleClick} className={css('handle')}>&#123;</span>
      {this.state.collapsed
        ? <span onClick={this.handleClick} className={css('handle')}>{Object.keys(body).length} hidden</span>
        : Object.keys(body).map((k) => {
          return (<div className={css('keyWrap')} key={k}>
            <span className={keyColor}>{k}</span>: <Json body={body[k]} light={light} />
          </div>)
        })}
    &#125;</span>)
  }

  styles () {
    return {
      object: {
        fontFamily: 'monospace',
        // paddingLeft: indentAmount,
        fontSize: 14
      },
      handle: {
        cursor: 'pointer'
      },
      keyWrap: {
        paddingLeft: indentAmount
      }
    }
  }
}

Obj.propTypes = {
  body: PropTypes.object.isRequired
}
