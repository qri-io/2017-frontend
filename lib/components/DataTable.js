// DEPRICATE - No longer works -> Data is now an array of objects not array of arrays

import React from 'react'
import PropTypes from 'prop-types'

import Spinner from './Spinner'
import { fieldsProps } from '../propTypes/datasetRefProps.js'

const DataTable = ({ data, fields, fetching, fetchedAll, error, onLoadMore }) => {
  if (!data || !fields) {
    return <div className='resultsTable' />
  }

  if (error) {
    return (
      <div className='dataTable resultsTable'>
        <h5>{error}</h5>
      </div>
    )
  }

  return (
    <div className='dataTable resultsTable'>
      <div className='table-responsive'>
        <table className='table table-hover query-results'>
          <thead><tr>{fields.map((col, i) => <th className='blue' key={i}>{col.name}</th>)}</tr></thead>
          <tbody>
            {data.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((cell, j) => {
                    return <td className={`dt-${fields[j].type}`} key={`${i}.${j}`}>{cell.toString()}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      { fetching ? <Spinner /> : undefined }
      { (!fetching && !fetchedAll) ? <button className='btn btn-primary btn-large' onClick={onLoadMore}>Load More</button> : undefined }
    </div>
  )
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  fields: fieldsProps,
  fetching: PropTypes.bool,
  fetchedAll: PropTypes.bool,
  error: PropTypes.string,
  showLoadMore: PropTypes.bool,
  onLoadMore: PropTypes.func
}

DataTable.defaultProps = {
  showLoadMore: false
}

export default DataTable
