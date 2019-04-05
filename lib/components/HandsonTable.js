import React from 'react'
import HotTable from 'react-handsontable'
import PropTypes from 'prop-types'

export default class HandsonTable extends React.PureComponent {
  render () {
    const { body, colHeaders, readOnly, layout, onAfterChange } = this.props

    var width = layout && layout.width
    var height = layout && layout.height

    return (
      <div style={{ height, width, overflow: 'hidden' }}>
        <HotTable
          colHeaders={colHeaders}
          readOnly={readOnly}
          rowHeaders
          manualColumnMove
          manualRowMove
          manualColumnResize
          manualRowResize
          stretchH='all'
          sortIndicator
          autoWrapRow
          viewportColumnRenderingOffset={100}
          viewportRowRenderingOffset={100}
          columnSorting
          data={body}
          onAfterChange={onAfterChange}
        />
      </div>
    )
  }
}

HandsonTable.propTypes = {
  body: PropTypes.array.isRequired,
  colHeaders: PropTypes.array,
  onAfterChange: PropTypes.func,
  edit: PropTypes.bool
}

HandsonTable.defaultProps = {

}
