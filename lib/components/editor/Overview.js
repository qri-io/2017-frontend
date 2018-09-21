import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import Json from './Json'

// import { defaultPalette } from '../../propTypes/palette'

export default class Overview extends Base {
  template (css) {
    const { localDataset } = this.props
    const haz = !!Object.keys(localDataset).length

    return (
      <div className={css('page')}>
        {!haz && <p>Choose a tab above to start editing</p>}
        {haz &&
          <div>
            <h3 style={{ color: 'white' }}>Overview</h3>
            <p>This is the JSON form of the dataset as it'll be sent to qri for processing:</p>
            <Json body={localDataset} />
          </div>}
      </div>
    )
  }

  styles () {
    return {
      'page': {
        color: 'white',
        width: '100%',
        height: '100%',
        minHeight: 1000,
        top: 0,
        left: 0,
        padding: 10
      }
    }
  }
}

Overview.propTypes = {
  localDataset: PropTypes.object
}

Overview.defaultProps = {

}
