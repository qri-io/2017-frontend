import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { datasetProps } from '../propTypes/datasetRefProps.js'

function SchemaColumns (dataset) {
  return dataset.structure.fields.map((f) => {
    return {
      key: f.name,
      name: f.title || f.name,
      locked: true,
      sortable: true
    }
  })
}

class DatasetDataGrid extends React.Component {
  constructor (props) {
    super(props)

    const createRows = () => {
      let rows = []
      for (let i = 1; i < 1000; i++) {
        rows.push({
          id: i,
          task: 'Task ' + i,
          complete: Math.min(100, Math.round(Math.random() * 110)),
          priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
          issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
          startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
          completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
        })
      }
      return rows
    }

    this.state = {
      rows: createRows()
    };

    [
      'rowGetter',
      'handleGridSort',
      'getRandomDate'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  getRandomDate (start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString()
  }

  rowGetter (i) {
    return this.state.rows[i]
  }

  handleGridSort (sortColumn, sortDirection) {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1
      }
    }

    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer)

    this.setState({ rows })
  }

  render () {
    const columns = [
      {
        key: 'id',
        name: 'ID',
        locked: true
      },
      {
        key: 'task',
        name: 'Title',
        width: 200,
        sortable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        width: 200,
        sortable: true
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        width: 200,
        sortable: true
      },
      {
        key: 'complete',
        name: '% Complete',
        width: 200,
        sortable: true
      },
      {
        key: 'startDate',
        name: 'Start Date',
        width: 200,
        sortable: true
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        width: 200,
        sortable: true
      }
    ]

    return (
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        columns={columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500} />
    )
  }
}

DatasetDataGrid.propTypes = {
  dataset: datasetProps,
  data: PropTypes.arrayOf(PropTypes.array)
}

export default DatasetDataGrid
