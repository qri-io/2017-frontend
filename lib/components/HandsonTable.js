import React from 'react'
import HotTable from 'react-handsontable'
import PropTypes from 'prop-types'
import Base from './Base'

export default class HandsonTable extends Base {
  template (css) {
    const {body, colHeaders, edit, layout} = this.props
    const columns = edit ? false : colHeaders.map(() => {
      var myMap = new Map()
      myMap.set('readOnly', true)
      return myMap
    })

    var width = layout && layout.width
    var height = layout && layout.height - 140

    return (
      <div style={{height, width, overflow: 'hidden'}}>
        <HotTable
          data={body}
          colHeaders={colHeaders}
          columns={columns}
          rowHeaders
          manualColumnMove
          manualRowMove
          // colWidths={100}
          manualColumnResize
          manualRowResize
          // width={width} // get this from layout
          // height={height} // get this from layout
          stretchH='all'
          sortIndicator
          autoWrapRow
          viewportColumnRenderingOffset={100}
          viewportRowRenderingOffset={100}
          columnSorting
        // contextMenu
        />
      </div>
    )
  }

  styles () {
    return {
    }
  }
}

HandsonTable.propTypes = {
  body: PropTypes.array.isRequired,
  colHeaders: PropTypes.array.isRequired,
  edit: PropTypes.bool
}

HandsonTable.defaultProps = {

}
