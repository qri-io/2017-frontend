import React, { PropTypes } from 'react'

export default class ChartOptionsPicker extends React.Component {
  constructor (props) {
    super(props)
    this.onXAxisChange = this.onXAxisChange.bind(this)
    this.onYAxisChange = this.onYAxisChange.bind(this)
  }

  onXAxisChange (e) {
    const options = Object.assign({}, this.props.options, { xIndex: +e.target.value })
    this.props.onChange(options)
  }

  onYAxisChange (e) {
    const options = Object.assign({}, this.props.options, { title: this.props.schema[+e.target.value].name, yIndex: +e.target.value })
    this.props.onChange(options)
  }

  render () {
    const { schema, options } = this.props
    return (
      <div className='chartPicker'>
        <label>Chart Type</label>
        <select disabled>
          <option value='lineChart'>Line</option>
        </select>
        <label>X Axis</label>
        <select value={options.xIndex} onChange={this.onXAxisChange}>
          {schema.map((col, i) => {
            return <option value={i} key={i} disabled={!(col.type === 'integer' || col.type === 'float')}>{col.name}</option>
          })}
        </select>
        <label>Y Axis</label>
        <select value={options.yIndex} onChange={this.onYAxisChange}>
          {schema.map((col, i) => {
            return <option value={i} key={i} disabled={!(col.type === 'integer' || col.type === 'float')}>{col.name}</option>
          })}
        </select>
      </div>
    )
  }
}

ChartOptionsPicker.propTypes = {
  schema: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

ChartOptionsPicker.defaultProps = {
}
