import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import Json from '../Json'
import ValidInput from '../form/ValidInput'

// import { defaultPalette } from '../../propTypes/palette'

export default class Overview extends Base {
  filterKeys (dataset) {
    let ds = Object.assign({}, dataset)
    delete ds['path']
    return ds
  }

  template (css) {
    const { name, localDataset, onChangeName } = this.props

    return (
      <div className={css('page')}>
        <p style={{ textAlign: 'right' }}>Choose a tab above to start editing</p>
        <div>
          <h3 style={{ color: 'white' }}>Overview</h3>
          <div>
            <h5>Dataset Name:</h5>
            <ValidInput value={name} name='name' onChange={(_, name) => { onChangeName(name) }} isDatasetRef />
          </div>
          <p>This is the JSON form of the dataset as it'll be sent to qri for processing:</p>
          <Json body={this.filterKeys(localDataset)} light />
        </div>
      </div>
    )
  }

  styles () {
    return {
      'page': {
        color: 'white',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        padding: 10,
        overflow: 'auto'
      }
    }
  }
}

Overview.propTypes = {
  localDataset: PropTypes.object,
  onChangeName: PropTypes.func
}

Overview.defaultProps = {

}
