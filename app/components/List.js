import React from 'react'

function selectFunc (fn, data, i) {
  return () => {
    if (fn) {
      fn(i, data)
    }
  }
}

const List = (props) => {
  const { data, onSelectItem, className, emptyComponent, style } = props
  if (!data || data.length === 0) {
    if (emptyComponent) {
      return (
        <div className={className}>
          {emptyComponent}
        </div>
      )
    }
    return <div className={className} />
  }
  return (
    <div className={className} style={style}>
      {data.map((d, i) => <props.component data={d} key={i} index={i} onSelect={selectFunc(onSelectItem, d, i)} link />)}
    </div>
  )
}

List.propTypes = {
  data: React.PropTypes.array,
  // eslint-disable-next-line react/no-unused-prop-types
  component: React.PropTypes.func.isRequired,
  emptyComponent: React.PropTypes.element,
  onSelectItem: React.PropTypes.func
}

List.defaultProps = {
  data: [],
  className: 'list'
}

export default List
