import React, { PropTypes } from 'react'
import { BarChart as RechartsBarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

class BarChart extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { data, title, width, height, xIndex } = this.props
    return (
      <RechartsBarChart width={width} height={height} data={data} >
        <XAxis dataKey={xIndex} />
        <YAxis yAxisId='a' />
        <Legend />
        <Tooltip wrapperStyle={{background: '#6c8088', color: '#192327'}} cursor={{fill: '#28353c'}} />
        <CartesianGrid vertical={false} />
        <Bar yAxisId='a' dataKey={title} barSize={40} fill='#192327' />
      </RechartsBarChart>
    )
  }
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xIndex: PropTypes.number
}

BarChart.defaultProps = {
}

export default BarChart
