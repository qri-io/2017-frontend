import React from 'react'
import PropTypes from 'prop-types'

import DatasetItem from './DatasetItem'
import ProfileItem from './ProfileItem'

export default class SearchItem extends React.PureComponent {
  constructor (props) {
    super(props);
    [
      'processDatasetResult',
      'processProfileResult'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  processDatasetResult (data) {
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

  processProfileResult (data) {
    return data['Value']
  }

  render () {
    const { data } = this.props

    switch (data['Type']) {
      case 'peer':
        return <ProfileItem {...this.props} data={this.processProfileResult(data)} />
      case 'dataset':
      default:
        return <DatasetItem {...this.props} data={this.processDatasetResult(data)} />
        // return <div>error: search result has no type. must be either 'dataset' or 'peer'</div>
        // the default should really be the above, but since the search responses have been returning
        // without a 'Type', I'm going to have the default return dataset
    }
  }
}

SearchItem.propTypes = {
  data: PropTypes.object.isRequired
}
