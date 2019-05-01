import React from 'react'
import PropTypes from 'prop-types'
import Spinner from './chrome/Spinner'

function selectFunc (fn, data, i) {
  return () => {
    if (fn) {
      return fn(i, data)
    }
  }
}

const List = (props) => {
  const {
    data,
    onSelectItem,
    className,
    emptyComponent,
    style,
    loading,
    onAdd,
    small,
    loadMore,
    fetchedAll,
    hitBottom
  } = props

  if (!loading && (!data || data.length === 0)) {
    if (emptyComponent) {
      return (
        <div className={className}>
          {emptyComponent}
        </div>
      )
    }
    return <div className={className} />
  }

  const safeProps = Object.keys(props).reduce((obj, key) => {
    // array of props already used by List
    if (![
      'data',
      'component',
      'onSelectItem',
      'emptyComponent',
      'loading',
      'fetchedAll',
      'onClick',
      'type',
      'hitBottom',
      'loadMore'
    ].includes(key)) {
      obj[key] = props[key]
    }
    return obj
  }, {})

  return (
    <div className={className} style={style}>
      {data.map((d, i) => <props.component data={d} key={i} index={i} onAdd={onAdd} onSelect={selectFunc(onSelectItem, d, i)} link small={small} {...safeProps} />)}
      {loading && <div style={{ marginTop: 40 }}><Spinner large /></div>}
      {!fetchedAll && !loading && hitBottom && loadMore && loadMore()}
    </div>
  )
}

List.propTypes = {
  data: PropTypes.array,
  // eslint-disable-next-line react/no-unused-prop-types
  component: PropTypes.func.isRequired,
  emptyComponent: PropTypes.element,
  onSelectItem: PropTypes.func,
  small: PropTypes.bool
}

List.defaultProps = {
  data: [],
  className: 'list'
}

export default List
