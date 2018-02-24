import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import { defaultPalette } from '../propTypes/palette'

// json documents can get pretty big, this constant sets the treshold at
// which Arr and Obj components automatically collapse their contents on
// initial render, which keeps initial loading snappy and lets the user
// decide if they really do want to see the contents of a container with
// lots of elements
const autoCollapseLength = 50
// size in pixels to left-indent for each closure
const indentAmount = 9

export default class Json extends Base {
  template (css) {
    const { data } = this.props
    if (data == null) {
      return <span className={css('null')}>null</span>
    }
    switch (typeof data) {
      case 'object':
        if (Array.isArray(data)) {
          return <Arr data={data} />
        }
        return <Obj data={data} />
      case 'number':
        return <span className={css('number')}>{data}</span>
      case 'boolean':
        return <span className={css('boolean')}>{data}</span>
      default:
        // assume string
        return <span className={css('string')}>{data}</span>
    }
  }

  styles (props) {
    return {
      boolean: {
        color: defaultPalette.c
      },
      number: {
        color: defaultPalette.d
      },
      string: {
        color: defaultPalette.text
      },
      null: {
        color: defaultPalette.e
      }
    }
  }
}

Json.propTypes = {
  data: PropTypes.any.isRequired
}

export class Arr extends Base {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: props.data.length >= autoCollapseLength
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.setState({ collapsed: !this.state.collapsed })
    e.stopPropagation()
  }

  template (css) {
    const { data } = this.props
    return (<div className={css('array')}><span onClick={this.handleClick} className={css('handle')}>&#91;</span>
      {this.state.collapsed
        ? <span onClick={this.handleClick} className={css('handle')}>{data.length} hidden</span>
        : data.map((d, i) => {
          if ( i === data.length - 1) {
            return <span className={css('element')}><Json key={i} data={d} /></span>
          }
          return <span className={css('element')}><Json key={i} data={d} />, </span>
        })}
      &#93;</div>)
  }

  styles (props) {
    return {
      array: {
        fontFamily: 'monospace',
        paddingLeft: indentAmount,
        color: defaultPalette.lightGray
      },
      handle: {
        cursor: 'pointer'
      }
    }
  }
}

Arr.propTypes = {
  data: PropTypes.array.isRequired
}

export class Obj extends Base {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: Object.keys(props.data).length >= autoCollapseLength
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.setState({ collapsed: !this.state.collapsed })
    e.stopPropagation()
  }

  template (css) {
    const { data } = this.props
    return (<span className={css('object')}><span onClick={this.handleClick} className={css('handle')}>&#123;</span>
      {this.state.collapsed
        ? <span onClick={this.handleClick} className={css('handle')}>{Object.keys(data).length} hidden</span>
        : Object.keys(data).map((k) => {
          return (<div className={css('keyWrap')} key={k}>
            <span className={css('key')}>{k}</span>: <Json data={data[k]} />
          </div>)
        })}
    &#125;</span>)
  }

  styles (props) {
    return {
      object: {
        fontFamily: 'monospace',
        paddingLeft: indentAmount,
        color: defaultPalette.lightGray
      },
      handle: {
        cursor: 'pointer'
      },
      keyWrap: {
        paddingLeft: indentAmount
      },
      key: {
        color: defaultPalette.f
      }
    }
  }
}

Obj.propTypes = {
  data: PropTypes.object.isRequired
}
