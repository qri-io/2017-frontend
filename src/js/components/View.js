import React, { PropTypes } from 'react';

// import BarChartView from './views/BarChartView';
// import LineChartView from './views/LineChartView';
// import ValueListView from './views/ValueListView';

const View = ({ view, results, device }) => {
  if (!view || !view.type) {
    return null;
  }

  return (<h1>TODO - restore view</h1>)

  // switch (view.type) {
  //   case "bar_chart":
  //     return <BarChartView {...this.props} />;
  //   case "column_chart":
  //     return <BarChartView {...this.props} />;
  //   case "value_list":
  //     return <ValueListView {...this.props} />;
  //   case "line_chart":
  //     return <LineChartView results={results} options={view.attributes} device={device} />;
  //   default:
  //     return <div>unrecognized view type: {view.type}</div>;
  // }
};

View.propTypes = {
  device: PropTypes.object.isRequired,
  results: PropTypes.object,
  view: PropTypes.object.isRequired,
};

View.defaultProps = {
};

export default View;
