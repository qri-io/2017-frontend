import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import StatsLine from '../StatsLine'
import DatasetName from '../DatasetName'

import fileSize from '../../utils/filesize'

const DatasetItem = ({ data = {}, small, rename, border, showPublishedStatus }) => {
  // TODO (ramfox): pull out function so it can be reused elsewhere
  const titleString = (name = '', dataset = {}) => {
    const { meta = {} } = dataset
    if (small && meta && meta.title && meta.title.length > 30) {
      return `${meta.title.slice(0, 30)}...`
    }
    return (meta && meta.title) || name
  }

  // TODO (ramfox): pull out function so it can be reused elsewhere
  const stats = (datasetRef) => {
    const { dataset } = datasetRef

    const length = dataset.structure.length
    const entries = dataset.structure.entries || 0

    return [
      {
        name: (entries === 1) ? 'entry' : 'entries',
        value: entries
      },
      fileSize(length)
    ]
  }

  const title = titleString(data.name, data)

  if (!data) {
    return (
      <div>Error. No dataset information found.</div>
    )
  }

  var path = `/${data.peername}/${data.name}/at${data.path}`
  return (
    <Link className={`dataset-item-wrap ${border && 'border-bottom '}`} to={{ pathname: path }} >
      {title && <h3>{title}</h3>}
      <DatasetName
        rename={rename}
        peername={data.peername}
        name={data.name || 'unnamed dataset'}
        style={{ display: 'inline-block', margin: '0 0 13px 0', wordWrap: 'break-word' }}
      />
      { data.dataset && data.dataset.structure
        ? <StatsLine
          stats={stats(data)}
          updated={data.dataset && data.dataset.commit && data.dataset.commit.timestamp}
          published={showPublishedStatus && data.published} />
        : undefined}
    </Link>
  )
}

DatasetItem.propTypes = {
  small: PropTypes.bool,
  link: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  peer: PropTypes.bool,
  rename: PropTypes.func,
  isLatestDataset: PropTypes.bool
}

DatasetItem.defaultProps = {
  small: false
}

export default DatasetItem
