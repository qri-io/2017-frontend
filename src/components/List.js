import React from 'react'

function selectFunc (fn, data, i) {
  return () => {
    if (fn) {
      fn(i, data)
    }
  }
}

const List = (props) => {
  const { data, onSelectItem, className } = props
  return (
    <div className={className}>
      {data.map((d, i) => <props.component data={d} key={i} index={i} onSelect={selectFunc(onSelectItem, d, i)} />)}
    </div>
  )
}

List.propTypes = {
  data: React.PropTypes.array,
  // eslint-disable-next-line react/no-unused-prop-types
  component: React.PropTypes.func.isRequired,
  onSelectItem: React.PropTypes.func
}

List.defaultProps = {
  data: [],
  className: 'list'
}

export default List
