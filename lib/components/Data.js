import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import Json from './Json'
import Spinner from './Spinner'
import ReadOnlyBlock from './ReadOnlyBlock'
// import DatasetDataGrid from './DatasetDataGrid'
import DatasetRefProps from '../propTypes/datasetRefProps'

export default class Data extends Base {
  template (css) {
    const { data, loading, error, onClick } = this.props
    // const { data, datasetRef, loading, error, onClick, onSetLoadingData } = this.props

    if (READ_ONLY) {
      return <ReadOnlyBlock />
    }

    if (loading) {
      return <Spinner />
    }

    if (error) {
      return (
        <div className={css('comingSoonWrap')}>
          <p>Error loading data. Click button to try to reload:</p>
          <button onClick={onClick} className={`btn btn-primary`}>reload</button>
        </div>
      )
    }

    // if (datasetRef.dataset && datasetRef.dataset.structure && datasetRef.dataset.structure.format === 'csv') {
    //   return (
    //     <DatasetDataGrid
    //       dataset={datasetRef && datasetRef.dataset}
    //       data={data}
    //       // onLoadMore={onLoadMore}
    //       onSetLoadingData={onSetLoadingData}
    //       onReload={onclick}
    //       loading={loading}
    //       path={datasetRef && datasetRef.path}
    //       error={error}
    //     />
    //   )
    // }
    if (data) {
      return <Json data={data} />
    }
    return (<p>This dataset currently has no specified data</p>)
  }

  styles () {
    return {
      fields: {
        margin: 10,
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start'
      }
    }
  }
}

Data.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  datasetRef: DatasetRefProps,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  // onLoadMore: PropTypes.func.isRequired,
  onSetLoadingData: PropTypes.func.isRequired
}

Data.defaultProps = {
}
