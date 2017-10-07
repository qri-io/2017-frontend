import React, { PropTypes } from 'react'

import { schemaProps } from '../propTypes/datasetRefProps'

export default class ChartOptionsPicker extends React.Component {
  constructor (props) {
    super(props)
    this.onXAxisChange = this.onXAxisChange.bind(this)
    this.onYAxisChange = this.onYAxisChange.bind(this)
    this.onChartChange = this.onChartChange.bind(this)
  }

  onXAxisChange (e) {
    const options = Object.assign({}, this.props.options, { xIndex: +e.target.value })
    this.props.onChange(options)
  }

  onYAxisChange (e) {
    const options = Object.assign({}, this.props.options, { title: this.props.schema.fields[+e.target.value].name, yIndex: +e.target.value })
    this.props.onChange(options)
  }

  onChartChange (e) {
    const options = Object.assign({}, this.props.options, { type: +e.target.value })
    this.props.onChange(options)
  }

  render () {
    const { schema, options } = this.props
    const isChartable = schema.fields.filter(col => col.type === 'integer' || col.type === 'float').length
    if (!isChartable) {
      return (
        <div className='panel'>
          <h5>No chartable fields in this dataset</h5>
        </div>
      )
    }
    return (
      <div className='chartPicker'>
        <label>Chart Type:</label>
        <select value={options.type} onChange={this.onChartChange}>
          <option value='bar'>Bar Chart</option>
        </select>
        {/* for now, x axis represents each row */}
        <label>X Axis:</label>
        <select value={0} onChange={this.onXAxisChange}>
          <option value={0} key={0} >row</option>
        </select>
        <label>Y Axis:</label>
        <select value={options.yIndex} onChange={this.onYAxisChange}>
          <option value='' />
          {schema.fields.map((col, i) => {
            return (col.type === 'integer' || col.type === 'float') ? <option value={i} key={i} >{col.name}</option> : undefined
          })}
        </select>
      </div>
    )
  }
}

ChartOptionsPicker.propTypes = {
  schema: schemaProps,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

ChartOptionsPicker.defaultProps = {
}
