import React, { PropTypes } from 'react'

import BarChart from '../components/BarChart.js'
import ChartOptionsPicker from './ChartOptionsPicker'
import DatasetRefProps from '../propTypes/datasetRefProps'

function transformResults (schema = [], results = [], xIndex, yIndex) {
  console.log(results)
  return [{
    name: 'results',
    values: results.map(row => ({
      x: row[xIndex] || 0,
      y: row[yIndex] || 0
    }))
  }]
}

function chartDimensions (size) {
  let width = 300
  let height = 400
  switch (size) {
    case 'xs':
      width = 300
      break
    case 'sm':
      width = 450
      break
    case 'md':
      width = 600
      break
    case 'lg':
      width = 900
      height = 400
      break
    case 'xl':
      width = 1100
      height = 500
      break
    default:
      width = 300
      height = 300
      break
  }

  return { width, height }
}

class ResultsChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      options: {
        xIndex: undefined,
        yIndex: undefined
      }
    };
    [
      'handleOptionsChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleOptionsChange (options) {
    this.setState(options)
  }

  render () {
    const { datasetRef, data, title, margins, options, size, onOptionsChange } = this.props
    if (!data) {
      return (
        <div>
          <h4>No Results to Display</h4>
        </div>
      )
    }

    const { width, height } = chartDimensions(size)
    // let xIndex = options.xIndex
    // let yIndex = options.yIndex

    // results.schema.forEach((col, i) => {
    //   if (col.name === options.x_axis) {
    //     xIndex = i
    //   }
    // })

    // results.schema.forEach((col, i) => {
    //   if (col.name === options.y_axis) {
    //     yIndex = i
    //   }
    // })
    // if (xIndex === undefined || yIndex === undefined) {
    //   return (
    //     <div className='resultsChart'>
    //       {onOptionsChange ? <ChartOptionsPicker schema={results.schema} options={options} onChange={onOptionsChange} /> : undefined }
    //     </div>
    //   )
    // }

    // const data = transformResults([], results, xIndex, yIndex)

    return (
      <div className='resultsChart'>

        {/*
        <ChartOptionsPicker schema={datasetRef.schema} options={options} onChange={onOptionsChange} />
*/}

        <BarChart
          data={data}
          title={title}
          width={width}
          height={height}
        />
      </div>
    )
  }
}

ResultsChart.propTypes = {
  // datasetRef: datasetRefProps,
  title: PropTypes.string,
  // margins: PropTypes.objectOf(PropTypes.number),
  // options: PropTypes.shape({
  //   x_axis: PropTypes.string,
  //   y_axis: PropTypes.string
  // }).isRequired,
  // size: React.PropTypes.string,
  size: PropTypes.string
  // onOptionsChange: PropTypes.func
}

ResultsChart.defaultProps = {
  // margins: { left: 80, right: 80, top: 40, bottom: 40 },
  title: 'results',
  // datasetRef: {
  //   dataset: { structure: { schema: { fields: [
  //     {
  //       description: 'This what the thing is called',
  //       name: 'name',
  //       title: 'name',
  //       type: 'string'
  //     },
  //     {
  //       description: 'This the number we want to display',
  //       name: 'uv',
  //       title: 'Some title',
  //       type: 'float'
  //     },
  //     {
  //       description: 'This the number we want to display also',
  //       name: 'pv',
  //       title: 'Some other title',
  //       type: 'float'
  //     },
  //     {
  //       description: 'This the number we want to display also maybe',
  //       name: 'time',
  //       title: 'Some other title as well',
  //       type: 'float'
  //     }
  //   ]} } },
  //   name: 'dummy datasetRef',
  //   path: 'ipfs/fakepath/dataset.json'
  // },
  data:
  [
      { name: 'food', uv: 2000, pv: 2013, amt: 4500, time: 1, uvError: [100, 50], pvError: [110, 20] },
      { name: 'cosmetic', uv: 3300, pv: 2000, amt: 6500, time: 2, uvError: 120, pvError: 50 },
      { name: 'storage', uv: 3200, pv: 1398, amt: 5000, time: 3, uvError: [120, 80], pvError: [200, 100] },
      { name: 'digital', uv: 2800, pv: 2800, amt: 4000, time: 4, uvError: 100, pvError: 30 }
  ],
  options: { xIndex: undefined, yIndex: undefined}
}

export default ResultsChart
