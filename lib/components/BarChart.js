import React from 'react'
import PropTypes from 'prop-types'

import { BarChart as RechartsBarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

import Base from './Base'

class BarChart extends Base {
  template (css) {
    const { data, title, width, height, xTitle, palette } = this.props
    return (
      <RechartsBarChart width={width} height={height} data={data} >
        <XAxis dataKey={xTitle} />
        <YAxis yAxisId='a' />
        <Legend />
        <Tooltip wrapperStyle={{background: palette.background, color: palette.neutralMuted}} cursor={{fill: palette.neutralBold}} />
        <CartesianGrid vertical={false} />
        <Bar yAxisId='a' dataKey={title} barSize={40} fill={palette.a} />
      </RechartsBarChart>
    )
  }

  styles () {
    return {

    }
  }
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xTitle: PropTypes.string.isRequired
}

BarChart.defaultProps = {
}

export default BarChart
