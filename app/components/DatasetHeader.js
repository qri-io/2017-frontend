import React, { PropTypes } from 'react'

import DatasetRefProps from '../propTypes/datasetRefProps.js'
import DatasetItem from './item/DatasetItem'
import NavBar from './NavBar.js'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class DatasetHeader extends Base {
  template (css) {
    const { datasetRef, onClickExport, onClickEdit, onClickDelete, onGoBack } = this.props
    const { name, path, dataset } = datasetRef
    return (
      <div className='wrapper'>
        <NavBar
          onGoBack={onGoBack}
          onClickExport={onClickExport}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
        <div className=''>
          <DatasetItem data={datasetRef} link={false} />
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
    }
  }
}

DatasetHeader.propTypes = {
  // dataset data model
  datasetRef: DatasetRefProps,
  onGoBack: PropTypes.func,
  onClickExport: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
  palette: Palette
}

DatasetHeader.defaultProps = {
  palette: defaultPalette
}

// &nbsp;
        // <a className='blue right' download={`${name}.zip`} href={`/download/${path}`}> Download </a>
        // { onDelete && <a className='blue right' onClick={onDelete}> Delete </a> }
        // <a className='blue right' onClick={onEditMetadata}> Edit </a>
