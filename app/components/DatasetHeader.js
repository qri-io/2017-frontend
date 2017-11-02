import React, { PropTypes } from 'react'

import DatasetRefProps from '../propTypes/datasetRefProps.js'
import DatasetItem from './item/DatasetItem'
import PageHeader from './PageHeader.js'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class DatasetHeader extends Base {
  template (css) {
    const { datasetRef, exportPath, onClickEdit, onClickDelete, onClickAdd, onGoBack, peer, bounds } = this.props
    const { name, path, dataset } = datasetRef
    return (
      <div className='dataSetHeader' style={{height: bounds.height}}>
        <PageHeader
          onGoBack={onGoBack}
          exportPath={exportPath}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
          onClickAdd={onClickAdd}
          name={name}
        />
        <div className={css('item')} style={{height: bounds.height - 41}}>
          <DatasetItem data={datasetRef} link={false} peer={peer} />
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
      item: {
        width: '100%',
        overflow: 'auto'
      }
    }
  }
}

DatasetHeader.propTypes = {
  // dataset data model
  datasetRef: DatasetRefProps,
  onGoBack: PropTypes.func,
  exportPath: PropTypes.string,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
  onClickAdd: PropTypes.func,
  palette: Palette,
  peer: PropTypes.bool
}

DatasetHeader.defaultProps = {
  palette: defaultPalette
}
