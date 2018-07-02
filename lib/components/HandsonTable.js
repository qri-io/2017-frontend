import React from 'react'
import HotTable from 'react-handsontable'
import PropTypes from 'prop-types'
import Base from './Base'

export default class HandsonTable extends Base {
  template (css) {
    const {data, colHeaders, edit, layout} = this.props
    const columns = edit ? false : colHeaders.map(() => {
      var myMap = new Map()
      myMap.set('readOnly', true)
      return myMap
    })
    var width = layout ? layout.width - 80 : 100
    // var height = layout ? layout.height - 100 : 100

    console.log(width)
    return (
      <div className={css('hotTable')} style={{width, height: '100%', overflow: 'hidden'}}>
        <HotTable
          data={data}
          colHeaders={colHeaders}
          columns={columns}
          rowHeaders
          manualColumnMove
          manualRowMove
          // colWidths={100}
          manualColumnResize
          manualRowResize
          // width={width - 200} // get this from layout
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
      hotTable: {
        marginLeft: -10,
        overflow: 'hidden'
      }
    }
  }
}

HandsonTable.propTypes = {
  data: PropTypes.array.isRequired,
  colHeaders: PropTypes.array.isRequired,
  edit: PropTypes.bool
}

HandsonTable.defaultProps = {

}
