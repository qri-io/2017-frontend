import React, { PropTypes } from 'react'

const AxisTick = ({ x, y, dx, dy, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text className='recharts-text' x={0} y={0} dx={dx} dy={dy} textAnchor='middle' fill='#666'>{payload.value}</text>
    </g>
  )
}

AxisTick.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  dx: PropTypes.number,
  dy: PropTypes.number,
  // stroke: PropTypes.string.isRequired,
  payload: PropTypes.object.isRequired
}

AxisTick.defaultProps = {
  dx: 0,
  dy: 0
}

export default AxisTick
