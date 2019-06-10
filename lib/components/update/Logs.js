import React from 'react'
import PropTypes from 'prop-types'
// import { datasetProps } from '../propTypes/datasetRefProps'
import LogItem from '../item/LogItem'
import List from '../List'

const Logs = (props) => {
  const { logs, message, loading, fetchedAll, hitBottom, loadNextPage } = props
  return (
    <List
      data={logs}
      component={LogItem}
      emptyComponent={<div className='datasets-empty'>{message}</div>}
      loading={loading}
      fetchedAll={fetchedAll}
      type='logs'
      border
      hitBottom={hitBottom}
      loadMore={loadNextPage}
    />
  )
}

Logs.propTypes = {
  // logs: PropTypes.arrayOf(datasetProps),
  loading: PropTypes.bool,
  fetchedAll: PropTypes.bool
}

Logs.defaultProps = {
  message: 'No Logs available'
}

export default Logs
