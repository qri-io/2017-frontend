import React from 'react'
import PropTypes from 'prop-types'

// json documents can get pretty big, this constant sets the treshold at
// which Arr and Obj components automatically collapse their contents on
// initial render, which keeps initial loading snappy and lets the user
// decide if they really do want to see the contents of a container with
// lots of elements
const autoCollapseLength = 101

function deepCopy (data) {
  // TODO (b5) - make an actual deep copy
  return Object.assign({}, data)
}

function traverse (data, path) {
  return path.split('/').splice(1).reduce((data, pathEl, i, src) => {
    const sel = Array.isArray(data) ? +pathEl : pathEl
    if (i + 2 >= src.length || data[sel] === 'undefined') {
      return [data, sel]
    }
    return data[sel]
  }, data)
}

const changeFuncs = {
  src: srcChange,
  dst: dstChange,
  union: unionChange
}

function srcChange (data, change) {
}

function dstChange (data, change) {
  if (change.path === '') {
    return {
      __type: change.type,
      __value: change.value
    }
  }

  const [ parent, selector ] = traverse(data, change.path)

  switch (change.type) {
    case 'insert':
      addInsert(parent, selector, change.value)
      break
    case 'delete':
      addWhitespace(parent, selector, change.value)
      break
    case 'update':
      addDelete(parent, selector, change.originalValue)
      addInsert(parent, selector, change.value)
      break
  }

  return data
}

function unionChange (data, change) {
  const [ parent, selector ] = traverse(data, change.path)

  switch (change.type) {
    case 'insert':
      addInsert(parent, selector, change.value)
      break
    case 'delete':
      addDelete(parent, selector, change.value)
      break
    case 'update':
      addDelete(parent, selector, change.originalValue)
      addInsert(parent, selector, change.value)
      break
  }

  return data
}

const insPrefix = 'ins-'

function addInsert (parent, selector, value) {
  const change = {
    __type: 'insert',
    __value: value
  }

  if (Array.isArray(parent)) {
    parent.splice(selector, 1, change)
  } else {
    delete parent[selector]
    parent[insPrefix + selector] = change
  }
}

const wspPrefix = 'wsp-'

function addWhitespace (parent, selector, value) {
  const change = {
    __type: 'whitespace',
    __value: value
  }

  if (Array.isArray(parent)) {
    parent.splice(selector, 1, change)
  } else {
    delete parent[selector]
    parent[wspPrefix + selector] = change
  }
}

const delPrefix = 'del-'

function addDelete (parent, selector, value) {
  const change = {
    __type: 'delete',
    __value: value
  }

  if (Array.isArray(parent)) {
    parent.splice(selector, 1, change)
  } else {
    delete parent[selector]
    parent[delPrefix + selector] = change
  }
}

function dropKeyPrefix (key) {
  if (key.indexOf(delPrefix) === 0) {
    return key.substring(delPrefix.length, key.length)
  } else if (key.indexOf(insPrefix) === 0) {
    return key.substring(insPrefix.length, key.length)
  } else if (key.indexOf(wspPrefix) === 0) {
    return key.substring(wspPrefix.length, key.length)
  }
  return key
}

const JsonDiff = (props) => {
  const { data, diff, type } = props
  const result = diff.reduce(changeFuncs[type], deepCopy(data))

  return (<Json data={result} />)
}

JsonDiff.propTypes = {
  data: PropTypes.any.isRequired,
  diff: PropTypes.array.isRequired,
  union: PropTypes.string
}

JsonDiff.defaultProps = {
  diff: [],
  type: 'dst'
}

export default JsonDiff

const Json = (props) => {
  const { light } = props
  const color = light ? 'json-light' : 'json-dark'
  const stringColor = light ? 'white' : 'text'

  let data = props.data
  if (data == null) {
    return <span className={color}>null</span>
  }

  const type = data.__type

  if (type) {
    data = data.__value
  }

  switch (typeof data) {
    case 'object':
      if (Array.isArray(data)) {
        return <Arr type={type} data={data} light={light} />
      }
      return <Obj type={type} data={data} light={light} />
    case 'number':
      return <span className={`${color} ${type}`}>{data}</span>
    case 'boolean':
      return <span className={`${color} ${type}`}>{data ? 'true' : 'false'}</span>
    default:
      // assume string
      return <span className={`${stringColor} ${type}`}>{data}</span>
  }
}

class Arr extends React.PureComponent {
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

  render () {
    const { data, light } = this.props
    const color = 'arr'
    return (<div className={`json-text ${color}`}><span onClick={this.handleClick} className='json-handle'>&#91;</span>
      {this.state.collapsed
        ? <span onClick={this.handleClick} className='json-handle'>{data.length} hidden</span>
        : data.map((d, i) => {
          if (i === data.length - 1) {
            return <span key={i} ><Json data={d} light={light} /></span>
          }
          return <span key={i} ><Json key={i} data={d} light={light} />, </span>
        })}
      &#93;</div>)
  }
}

Arr.propTypes = {
  data: PropTypes.array.isRequired
}

class Obj extends React.PureComponent {
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

  render () {
    const { data, light } = this.props
    const color = light ? 'obj-light' : 'obj-dark'
    const keyColor = light ? 'json-light' : 'json-dark'

    if (this.state.collapsed) {
      return (<span onClick={this.handleClick} className='json-handle'>{Object.keys(data).length} hidden</span>)
    }

    return (<span className={`json-text ${color}`}>
      <span onClick={this.handleClick} className='json-handle'>&#123;</span>
      {Object.keys(data).map((k) => {
        return (<div className='json-key-wrap' key={k}>
          <span className={keyColor}>{dropKeyPrefix(k)}</span>: <Json data={data[k]} light={light} />
        </div>)
      })}
    &#125;</span>)
  }
}

Obj.propTypes = {
  data: PropTypes.object.isRequired
}
