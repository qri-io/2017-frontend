import React, { PropTypes } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import selectViewData from '../../selectors/viewData';
import * as viewConfig from '../../selectors/viewConfig';

const LineChartView = ({ view, results, device }) => {
  const data = selectViewData(view, results);
  const dim = viewConfig.dimensions(device, view);

  return (
    <LineChart className="line chart view" width={dim.width} height={dim.height} data={data} margin={{ top: 8, right: 10, left: 10, bottom: 8 }}>
      <XAxis dataKey="name" fill="#000000" />
      <YAxis />
      <Tooltip wrapperStyle={viewConfig.wrapperStyle(device, view)} />
      <Legend />
      {view.series.map((series, i) => {
        return <Line key={i} dataKey={series.name} fill={series.fill || viewConfig.defaultColor(i)} />;
      })}
    </LineChart>
  );
};

LineChartView.propTypes = {
  device: PropTypes.object.isRequired,
  results: PropTypes.object,
  view: PropTypes.object.isRequired,
};

LineChartView.defaultProps = {
};

export default LineChartView;
