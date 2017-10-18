import React, { PropTypes } from 'react'

import { schemaProps } from '../propTypes/datasetRefProps'

import Base from './Base'
import { Palette, defaultPalette } from '../propTypes/palette'

export default class ChartOptionsPicker extends Base {
  constructor (props) {
    super(props)
    this.onXAxisChange = this.onXAxisChange.bind(this)
    this.onYAxisChange = this.onYAxisChange.bind(this)
    this.onChartTypeChange = this.onChartTypeChange.bind(this)
  }

  onXAxisChange (e) {
    const options = Object.assign({}, this.props.options, { xTitle: this.props.schema.fields[+e.target.value].name, xIndex: +e.target.value })
    console.log(options)
    this.props.onChange(options)
  }

  onYAxisChange (e) {
    const options = Object.assign({}, this.props.options, { title: this.props.schema.fields[+e.target.value].name, yIndex: +e.target.value })
    this.props.onChange(options)
  }

  onChartTypeChange (e) {
    console.log(e.target.value)
    const options = Object.assign({}, this.props.options, { type: e.target.value })
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
      <div className='chartPicker'>
        <label className={css('label')} >Chart Type:</label>
        <select className={css('select')} value={options.type} onChange={this.onChartTypeChange}>
          <option value='' />
          <option value='bar'>Bar Chart</option>
          <option value='line'>Line Chart</option>
        </select>
        {/* for now, x axis represents each row */}
        <label className={css('label')} >X Axis:</label>
        <select className={css('select')} value={options.xIndex} onChange={this.onXAxisChange}>
          <option value='' />
          {schema.fields.map((col, i) => {
            return <option value={i} key={i} >{col.name}</option>
          })}
        </select>
        <label className={css('label')} >Y Axis:</label>
        <select className={css('select')} value={options.yIndex} onChange={this.onYAxisChange}>
          <option value='' />
          {schema.fields.map((col, i) => {
            return (col.type === 'integer' || col.type === 'float') ? <option value={i} key={i} >{col.name}</option> : undefined
          })}
        </select>
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
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
  onChange: PropTypes.func.isRequired,
  palette: Palette
}

ChartOptionsPicker.defaultProps = {
  palette: defaultPalette
}
