import React from 'react'
import LoadMore from './LoadMore'

function selectFunc (fn, data, i) {
  return () => {
    if (fn) {
      return fn(i, data)
    }
  }
}

const List = (props) => {
  const { data, onSelectItem, className, emptyComponent, style, fetchedAll, onClick, type, loading } = props
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
      { type ? <LoadMore
        fetchedAll={fetchedAll}
        onClick={onClick}
        type={type}
        loading={loading}
        /> : undefined}
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
