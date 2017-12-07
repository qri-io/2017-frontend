import React from 'react'
import PropTypes from 'prop-types'

import FieldItem from './item/FieldItem'
import HOTable from './HOTable'

import { datasetProps } from '../propTypes/datasetRefProps.js'
import Spinner from '../components/Spinner'
import defaultColumnWidths from '../utils/defaultColumnWidths'

function timeout (duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration)
  })
}

class DatasetDataGrid extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      field: undefined
    };

    [
      'rowGetter',
      'handleGridSort',
      'schemaColumns',
      'onCellMouseOver',
      'onCellMouseOut',
      'colInfoPosition'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (this.props.loading && this.props.data) {
      timeout(1000).then(() => {
        this.props.onSetLoadingData(false)
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.loading && nextProps.error) {
      this.props.onSetLoadingData(false)
    } else if (!nextProps.loading && !this.props.loading && !nextProps.data) {
      this.props.onSetLoadingData(true)
    } else if (nextProps.loading && this.props.loading && nextProps.data) {
      this.props.onSetLoadingData(false)
    }
  }

  shouldComponentUpdate () {
    return true
  }

  schemaColumns (dataset, data, i) {
    const width = defaultColumnWidths(dataset, data)
    return dataset.structure.schema.fields.map((f) => {
      return {
        key: f.name,
        name: f.name,
        locked: true,
        // sortable: true,
        resizable: true,
        width: width[f.name]
      }
    })
  }

  colHeaders (dataset) {
    return dataset.structure.schema.fields.map((f) => {
      return f.name
    })
  }

  columns (dataset) {
    return dataset.structure.schema.fields.map((f) => {
      return {
        data: f.name,
        readOnly: true
      }
    })
  }

  rowGetter (i) {
    return Object.assign({ id: i }, this.props.data[i])
  }

  handleGridSort (sortColumn, sortDirection) {
    console.log(sortColumn, sortDirection)
    this.setState({ sortColumn, sortDirection })
    // const comparer = (a, b) => {
    //   if (sortDirection === 'ASC') {
    //     return (a[sortColumn] > b[sortColumn]) ? 1 : -1
    //   } else if (sortDirection === 'DESC') {
    //     return (a[sortColumn] < b[sortColumn]) ? 1 : -1
    //   }
    // }
    // const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer)
    // this.setState({ rows })
  }

  onCellMouseOver (e, coords, td) {
    if (coords.row > 0) {
      return
    }

    this.setState({ field: {
      index: coords.col,
      top: 40,
      td,
      data: this.props.dataset.structure.schema.fields[coords.col]
    }})
  }

  onCellMouseOut (e, coords, td) {
    if (coords.row > 0) {
      return
    }
    this.setState({ field: undefined })
  }

  colInfoPosition (field) {
    const rect = field.td.getBoundingClientRect()
    const bbox = this.table.getBoundingClientRect()

    let left = rect.left - (rect.width / 2)
    if (left + rect.width > bbox.left + bbox.width || rect.right > bbox.right - 30) {
      return { right: 8, top: field.top }
    }
    return { left, top: field.top }
  }

  render () {
    const { dataset, data, width, height } = this.props
    const { field } = this.state

    if (this.props.loading) {
      return (
        <Spinner />
      )
    } else if (this.props.error) {
      return (
        <div className='panel'>
          <label>Error loading data</label>
        </div>
      )
    } else if (!dataset) {
      return (
        <div className='panel'>
          <label>Run a query to view data</label>
        </div>
      )
    }

    return (
      <div style={{position: 'relative', overflow: 'hidden', flex: '1 1 100%', width, height}}>
        { field &&
          <div style={Object.assign({
            position: 'absolute',
            zIndex: 99999
          }, this.colInfoPosition(field))}>
            <FieldItem index={field.index} data={field.data} onSelect={() => {}} />
          </div>
        }
        <HOTable
          containerRef={(el) => { this.table = el }}
          settings={{
            data,
            colHeaders: this.colHeaders(dataset),
            columns: this.columns(dataset),
            manualColumnResize: true,
            manualRowResize: true,
            rowHeights: 26,
            afterOnCellMouseOver: this.onCellMouseOver,
            afterOnCellMouseOut: this.onCellMouseOut
          }} />
      </div>
    )
  }
}

DatasetDataGrid.propTypes = {
  dataset: datasetProps,
  data: PropTypes.arrayOf(PropTypes.object),
  onLoadMore: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
}

DatasetDataGrid.defaultProps = {
}

export default DatasetDataGrid
