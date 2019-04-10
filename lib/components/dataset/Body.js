/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'
import Json from '../Json'
import Spinner from '../chrome/Spinner'
import DatasetRefProps from '../../propTypes/datasetRefProps'
import Button from '../chrome/Button'

import { extractColumnHeaders } from '../../selectors/dataset'

const BodyReadOnly = React.lazy(() => import('./BodyReadOnly'))
const HandsonTable = React.lazy(() => import('../HandsonTable'))

export default class Body extends React.PureComponent {
  constructor (props) {
    super(props);
    [
      'makeColHeaders'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  makeColHeaders () {
    const { datasetRef } = this.props
    const schema = extractColumnHeaders(datasetRef)
    return schema && schema.map(i => i.title)
  }

  render () {
    const { body, error, noBody, onClick, loading, datasetRef, layout, readOnly } = this.props

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
          <HandsonTable body={body} readOnly={readOnly} colHeaders={this.makeColHeaders()} layout={layout} />
        </React.Suspense>
      )
    }

    if (body) {
      return <div className='datasetContent' style={{ margin: 20 }}><Json body={body} /></div>
    }

    return <Spinner large />
  }
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
