import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { datasetProps } from '../propTypes/datasetRefProps.js'
import Spinner from '../components/Spinner'

function timeout (duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration)
  })
}

class DatasetDataGrid extends React.Component {
  constructor (props) {
    super(props)

    this.state = { sortColumn: '', sortDirection: '' };

    [
      'rowGetter',
      'handleGridSort',
      'schemaColumns'
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
    if (this.props.loading && nextProps.data) {
      this.props.onSetLoadingData(false)
    }
  }

  shouldComponentUpdate () {
    return true
  }

  schemaColumns (dataset, i) {
    return dataset.structure.schema.fields.map((f) => {
      return {
        key: f.name,
        name: f.name
        // locked: true
        // sortable: true
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

  render () {
    if (this.props.loading) {
      return (
        <Spinner />
      )
    }
    const { dataset, data, minHeight } = this.props
    if (!dataset) {
      return (
        <div className='panel'>
          <h5>Run a query to view data</h5>
        </div>
      )
    }
    return (
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        columns={this.schemaColumns(dataset)}
        rowGetter={this.rowGetter}
        rowsCount={data.length}
        minHeight={minHeight} />
    )
  }
}

DatasetDataGrid.propTypes = {
  dataset: datasetProps,
  data: PropTypes.arrayOf(PropTypes.object),
  minHeight: PropTypes.number,
  loading: PropTypes.bool.isRequired
}

DatasetDataGrid.defaultProps = {
  minHeight: 500
}

export default DatasetDataGrid
