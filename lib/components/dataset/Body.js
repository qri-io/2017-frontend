/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'
import Json from '../Json'
import Spinner from '../chrome/Spinner'
import DatasetRefProps from '../../propTypes/datasetRefProps'
import Button from '../chrome/Button'
import LoadMore from '../chrome/LoadMore'

import { extractColumnHeaders } from '../../selectors/dataset'

const BodyReadOnly = React.lazy(() => import('./BodyReadOnly'))
const HandsonTable = React.lazy(() => import('../HandsonTable'))

const Body = (props) => {
  const {
    body,
    error,
    noBody,
    onClick,
    loading,
    datasetRef,
    layout,
    offset,
    readOnly,
    fetchedAll,
    bodypath,
    onLoadMore } = props

  const makeColHeaders = () => {
    const schema = extractColumnHeaders(datasetRef)
    return schema && schema.map(i => i.title)
  }

  const handleLoadMore = (limit) => { onLoadMore(datasetRef.peername, datasetRef.name, path, bodypath, offset, limit) }

  if (__BUILD__.READONLY) {
    return (
      <BodyReadOnly peername={datasetRef.peername} name={datasetRef.name} />
    )
  }

  if (error) {
    return (
      <div>
        <p>Error loading data: {error}</p>
        <p>Click button to try to reload:</p>
        <Button onClick={onClick} color='a' text='reload' loading={loading} name='reload' />
      </div>
    )
  }

  if (noBody) {
    return (<p>This dataset currently has no specified data</p>)
  }
  const { path } = datasetRef

  // button for switching views
  if (body && datasetRef.dataset && datasetRef.dataset.structure && datasetRef.dataset.structure.depth === 2) {
    return (
      <React.Suspense fallback={<Spinner large />}>
        <HandsonTable body={body} readOnly={readOnly} colHeaders={makeColHeaders()} layout={fetchedAll ? layout : Object.assign({}, layout, { height: layout.height - 45 })} />
        {!fetchedAll && <LoadMore loading={loading} onLoadMore={handleLoadMore} />}
      </React.Suspense>
    )
  }
  if (body) {
    return (
      <div><div className='datasetContent' style={{ margin: 20 }}><Json body={body} /></div>
        {!fetchedAll && <LoadMore loading={loading} onLoadMore={handleLoadMore} />}
      </div>
    )
  }

  return <Spinner large />
}

Body.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  datasetRef: DatasetRefProps,
  noBody: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired
}

Body.defaultProps = {
}

export default Body
