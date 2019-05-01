import React from 'react'
import PropTypes from 'prop-types'
import { datasetProps } from './../propTypes/datasetRefProps'
import DatasetItem from './item/DatasetItem'
import List from './List'

const Datasets = (props) => {
  const { datasets, message, loading, fetchedAll, showPublishedStatus, atBottom, loadNextPage } = props
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
      atBottom={atBottom}
      loadMore={loadNextPage}
    />
  )
}

Datasets.propTypes = {
  datasets: PropTypes.arrayOf(datasetProps),
  loading: PropTypes.bool,
  fetchedAll: PropTypes.bool
}

Datasets.defaultProps = {
  message: 'No Datasets available'
}

export default Datasets
