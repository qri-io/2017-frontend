import React, { PropTypes } from 'react'
import { LineChart as RechartsLineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

class LineChart extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { data, title, width, height, xTitle } = this.props
    console.log(xTitle)
    return (
      <RechartsLineChart width={width} height={height} data={data} >
        <XAxis dataKey={xTitle} />
        <YAxis yAxisId='a' />
        <Legend />
        <Tooltip wrapperStyle={{background: '#6c8088', color: '#192327'}} cursor={{fill: '#28353c'}} />
        <CartesianGrid strokeDasharray='3 3' stroke='#000' />
        <Line yAxisId='a' type='monotone' dataKey={title} stroke='#89DDFF' activeDot={{r: 4}} />
      </RechartsLineChart>
    )
  }
}

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xIndex: PropTypes.string.isRequired
}

LineChart.defaultProps = {
}

export default LineChart
