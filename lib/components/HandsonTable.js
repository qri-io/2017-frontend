import React from 'react'
import HotTable from 'react-handsontable'
import PropTypes from 'prop-types'
import Base from './Base'

export default class HandsonTable extends Base {
  template (css) {
    const {data, colHeaders, edit} = this.props
    const columns = edit ? false : colHeaders.map(() => {
      var myMap = new Map()
      myMap.set('readOnly', true)
      return myMap
    })
    return (
      <div id='hot-app' className={css('hotTable')}>
        <HotTable
          data={data}
          colHeaders={colHeaders}
          columns={columns}
          rowHeaders
          manualColumnMove
          manualRowMove
          manualColumnResize
          manualRowResize
          // width='1200' // get this from layout
          // height='500' // get this from layout
          stretchH='all'
          sortIndicator
          columnSorting
          // contextMenu
        />
      </div>
    )
  }

  styles () {
    return {
      hotTable: {
        marginLeft: -10
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
