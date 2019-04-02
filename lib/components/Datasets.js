import React from 'react'
import PropTypes from 'prop-types'
import { datasetProps } from './../propTypes/datasetRefProps'
import DatasetItem from './item/DatasetItem'
import List from './List'
import Base from './Base'

export default class Datasets extends Base {
  render () {
    const { datasets, message, loading, fetchedAll, showPublishedStatus } = this.props
    return (
      <List
        data={datasets}
        component={DatasetItem}
        emptyComponent={<div className='datasets-empty'>{message}</div>}
        loading={loading}
        fetchedAll={fetchedAll}
        type='datasets'
        border
        showPublishedStatus={showPublishedStatus}
      />
    )
  }
}

Datasets.propTypes = {
  datasets: PropTypes.arrayOf(datasetProps),
  loading: PropTypes.bool,
  fetchedAll: PropTypes.bool
}

Datasets.defaultProps = {
  message: 'No Datasets available'
}
