import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { datasetProps } from '../propTypes/datasetRefProps.js'
import Spinner from '../components/Spinner'

class DatasetDataGrid extends React.Component {
  constructor (props) {
    super(props)

    this.state = { sortColumn: '', sortDirection: '', loading: false };

    [
      'rowGetter',
      'handleGridSort',
      'schemaColumns'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.data) {
      this.setState({ loading: true })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.data) {
      this.setState({ loading: true })
    } else {
      this.setState({ loading: false })
    }
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
    const { dataset, data, minHeight } = this.props
    const { loading } = this.state
    if (!dataset) {
      return (
        <div className='panel'>
          <h5>Run a query to view data</h5>
        </div>
      )
    }
    if (loading) {
      return (
        <Spinner />
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
  minHeight: PropTypes.number
}

DatasetDataGrid.defaultProps = {
  minHeight: 500
}

export default DatasetDataGrid
