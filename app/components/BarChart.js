import React, { PropTypes } from 'react'
import { BarChart as RechartsBarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LabelList } from 'recharts'

class BarChart extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let xAxisDataKey = 'name'
    let yAxisDataKey = 'pv'
    const { data, title, width, height } = this.props
    return (
    // <div className='bar-chart-wrapper' style={{textAlign: 'right'}}>
      <RechartsBarChart width={width} height={height} data={data} >
        <XAxis dataKey={xAxisDataKey} />
        <YAxis yAxisId='a' />
        <Legend />
        <Tooltip wrapperStyle={{background: '#6c8088', color: '#192327'}} cursor={{fill: '#28353c'}} />
        <CartesianGrid vertical={false} />
        <Bar yAxisId='a' dataKey={yAxisDataKey} barSize={40} fill='#192327' />
      </RechartsBarChart>
    // </div>
    )
  }
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
  // margins: PropTypes.objectOf(PropTypes.number),
  // options: PropTypes.object.isRequired,
  // size: React.PropTypes.string,
  // device: PropTypes.object.isRequired,
  // onOptionsChange: PropTypes.func
}

BarChart.defaultProps = {
  // margins: { left: 80, right: 80, top: 40, bottom: 40 },
  title: 'results'
}

export default BarChart
