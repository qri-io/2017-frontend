import React from 'react'
import PropTypes from 'prop-types'

import DatasetItem from './DatasetItem'
import ProfileItem from './ProfileItem'

const processDatasetResult = (data) => {
  return {
    peername: data['Value']['Handle'],
    name: data['Value']['Name'],
    path: data['Value']['path'],
    dataset: {
      meta: data['Value']['meta'],
      structure: data['Value']['structure'],
      commit: data['Value']['commit']
    }
  }
}

const processProfileResult = (data) => {
  return data['Value']
}

const SearchItem = (props) => {
  const { data } = props

  switch (data['Type']) {
    case 'peer':
      return <ProfileItem {...props} data={processProfileResult(data)} />
    case 'dataset':
    default:
      return <DatasetItem {...props} data={processDatasetResult(data)} />
        // return <div>error: search result has no type. must be either 'dataset' or 'peer'</div>
        // the default should really be the above, but since the search responses have been returning
        // without a 'Type', I'm going to have the default return dataset
  }
}

SearchItem.propTypes = {
  data: PropTypes.object.isRequired
}

export default SearchItem
