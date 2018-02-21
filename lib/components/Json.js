import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import { defaultPalette } from '../propTypes/palette'

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

Json.defaultProps = {
}

class Arr extends Base {
  constructor (props) {
    super(props)
    this.state = { collapsed: false }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.setState({ collapsed: !this.state.collapsed })
    e.stopPropagation()
  }

  template (css) {
    const { data } = this.props
    return (<div onClick={this.handleClick} className={css('array')}>&#91;
      {this.state.collapsed
        ? '...'
        : data.map((d, i) => {
          return <Json key={i} data={d} />
        })}
      &#93;</div>)
  }
  styles (props) {
    return {
      array: {
        paddingLeft: 6,
        color: defaultPalette.lightGray
      }
    }
  }
}

class Obj extends Base {
  constructor (props) {
    super(props)
    this.state = { collapsed: false }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.setState({ collapsed: !this.state.collapsed })
    e.stopPropagation()
  }

  template (css) {
    const { data } = this.props
    return (<span onClick={this.handleClick} className={css('object')}>&#123;
      {this.state.collapsed
        ? '...'
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
        paddingLeft: 6,
        color: defaultPalette.lightGray
      },
      keyWrap: {
        paddingLeft: 6
      },
      key: {
        color: defaultPalette.f
      }
    }
  }
}
