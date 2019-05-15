/* globals __BUILD__ */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Json from '../Json'
import Spinner from '../chrome/Spinner'
import DatasetRefProps from '../../propTypes/datasetRefProps'
import Button from '../chrome/Button'
import Dropdown from '../chrome/Dropdown'
import DropdownMenu from '../chrome/DropdownMenu'

import { extractColumnHeaders } from '../../selectors/dataset'

const BodyReadOnly = React.lazy(() => import('./BodyReadOnly'))
const HandsonTable = React.lazy(() => import('../HandsonTable'))

const Body = (props) => {
  const [rows, setRows] = useState(100)
  const { body, error, noBody, onClick, loading, datasetRef, layout, readOnly, fetchedAll } = props

  const makeColHeaders = () => {
    const schema = extractColumnHeaders(datasetRef)
    return schema && schema.map(i => i.title)
  }

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

  // button for switching views
  if (body && datasetRef.dataset && datasetRef.dataset.structure && datasetRef.dataset.structure.depth === 2) {
    return (
      <React.Suspense fallback={<Spinner large />}>
        <HandsonTable body={body} readOnly={readOnly} colHeaders={makeColHeaders()} layout={layout} />
        {!fetchedAll && <div className='body-load-more'>Load more rows:
          <Button className='body-buttons' text='100' onClick={() => console.log('100')} />
          <Button className='body-buttons' text='500' onClick={() => console.log('500')} />
          <Button className='body-buttons' text='1000' onClick={() => console.log('1000')} />
        </div>}
      </React.Suspense>
    )
  }

  if (body) {
    return <div className='datasetContent' style={{ margin: 20 }}><Json body={body} /></div>
  }

  return <Spinner large />
}

Body.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  datasetRef: DatasetRefProps,
  noBody: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  // onLoadMore: PropTypes.func.isRequired,
  onSetLoadingBody: PropTypes.func.isRequired
}

Body.defaultProps = {
}

export default Body
