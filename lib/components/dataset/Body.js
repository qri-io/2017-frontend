import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import Json from '../Json'
import Spinner from '../chrome/Spinner'
import DatasetRefProps from '../../propTypes/datasetRefProps'
import Button from '../chrome/Button'
import HandsonTable from '../HandsonTable'
import { extractColumnHeaders } from '../../selectors/dataset'
import BodyReadOnly from './BodyReadOnly'

export default class Body extends Base {
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

  template (css) {
    const { body, error, noBody, onClick, loading, datasetRef, layout, sessionProfile, readOnly } = this.props

    if (error) {
      return (
        <div className={css('comingSoonWrap')}>
          <p>Error loading data: {error}</p>
          <p>Click button to try to reload:</p>
          <Button onClick={onClick} color='a' text='reload' loading={loading} name='reload' />
        </div>
      )
    }

    if (!sessionProfile) {
      return (
        <BodyReadOnly peername={datasetRef.peername} name={datasetRef.name} />
      )
    }

    if (noBody) {
      return (<p>This dataset currently has no specified data</p>)
    }

    // button for switching views

    if (body && datasetRef.dataset && datasetRef.dataset.structure && datasetRef.dataset.structure.depth === 2) {
      return <HandsonTable body={body} readOnly={readOnly} colHeaders={this.makeColHeaders()} layout={layout} />
    }

    if (body) {
      return <div className='datasetContent' style={{ margin: 20 }}><Json body={body} /></div>
    }

    return <Spinner large />
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
