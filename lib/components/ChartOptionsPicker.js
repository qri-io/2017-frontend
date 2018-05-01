import React from 'react'
import PropTypes from 'prop-types'

import { schemaProps } from '../propTypes/datasetRefProps'

import ValidSelect from './form/ValidSelect'
import Base from './Base'

export default class ChartOptionsPicker extends Base {
  constructor (props) {
    super(props)
    this.onXAxisChange = this.onXAxisChange.bind(this)
    this.onYAxisChange = this.onYAxisChange.bind(this)
    this.onChartTypeChange = this.onChartTypeChange.bind(this)
  }

  onXAxisChange (name, value, e) {
    const options = Object.assign({}, this.props.options, { xTitle: this.props.schema.fields[+value].name, xIndex: +value })
    console.log(options)
    this.props.onChange(options)
  }

  onYAxisChange (name, value, e) {
    const options = Object.assign({}, this.props.options, { title: this.props.schema.fields[+value].name, yIndex: +value })
    this.props.onChange(options)
  }

  onChartTypeChange (name, value, e) {
    console.log(value)
    const options = Object.assign({}, this.props.options, { type: value })
    this.props.onChange(options)
  }

  template (css) {
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
      <div className={css('chartPicker')}>
        <ValidSelect
          name='chartType'
          label='Chart Type'
          className='col-md-4'
          value={options.type}
          options={[{value: 'bar', text: 'Bar Chart'}, {value: 'line', text: 'Line Chart'}]}
          onChange={this.onChartTypeChange}
        />
        {/* for now, x axis represents each row */}
        <ValidSelect
          name='xAxis'
          label='X Axis'
          className='col-md-4'
          value={options.xIndex}
          options={schema.fields.map((col, i) => { return { value: i, text: col.name } })}
          onChange={this.onXAxisChange}
        />
        <ValidSelect
          name='yAxis'
          label='Y Axis'
          className='col-md-4'
          value={options.yIndex}
          options={
            schema.fields
              .map((col, i) => { return { value: i, text: col.name, type: col.type } })
              .filter(col => col.type === 'integer' || col.type === 'float')
          }
          onChange={this.onYAxisChange}
        />
      </div>
    )
  }

  styles () {
    return {
      chartPicker: {
        overflow: 'hidden'
      },
      label: {
        marginRight: '5px'
      },
      select: {
        marginRight: '10px'
      }
    }
  }
}

ChartOptionsPicker.propTypes = {
  schema: schemaProps,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

ChartOptionsPicker.defaultProps = {
}
