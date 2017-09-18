import React, { PropTypes } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

import selectViewData from '../../selectors/viewData'
import * as viewConfig from '../../selectors/viewConfig'

import AxisTick from './AxisTick'

const BarChartView = ({ view, results, device }) => {
  if (!results || !results.data) {
    return null
  }

  const data = selectViewData(view, results)
  const dim = viewConfig.dimensions(device, view)

  return (
    <BarChart className='bar chart view col-md-12' width={dim.width} height={dim.height} data={data} margin={{ top: 10, right: 10, left: 10, bottom: 15 }}>
      <XAxis dataKey='name' fill='#000000' padding={{ left: 10, right: 10 }} tick={<AxisTick dy={22} />} />
      <YAxis tick={<AxisTick dx={-14} dy={8} />} />
      <Tooltip wrapperStyle={viewConfig.wrapperStyle(device, view)} />
      {view.series.map((series, i) => {
        return <Bar key={i} dataKey={series.name} fill={series.fill || viewConfig.defaultColor(i)} />
      })}
    </BarChart>
  )
}

BarChartView.propTypes = {
  device: PropTypes.object.isRequired,
  results: PropTypes.object,
  view: PropTypes.object.isRequired
}

BarChartView.defaultProps = {
}

export default BarChartView
