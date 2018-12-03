import React from 'react'
import PropTypes from 'prop-types'
import { datasetProps } from './../propTypes/datasetRefProps'
import DatasetItem from './item/DatasetItem'
import List from './List'
import Base from './Base'

export default class Datasets extends Base {
  template (css) {
    const { datasets, message, loading, fetchedAll } = this.props
    return (
      <List
        data={datasets}
        component={DatasetItem}
        emptyComponent={<div className={css('empty')}>{message}</div>}
        loading={loading}
        fetchedAll={fetchedAll}
        type='datasets'
        border
      />
    )
  }

  styles () {
    return {
      empty: {
        padding: 20
      }
    }
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
