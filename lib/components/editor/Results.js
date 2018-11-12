import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import Json from '../Json'

// import { defaultPalette } from '../../propTypes/palette'

export default class Results extends Base {
  template (css) {
    const { resultDataset, message, error } = this.props

    return (
      <div className={css('page')}>
        {/* {localDataset && <Json body={localDataset} />} */}
        {message && <div>
          <hr />
          <h4 className='white' >Message:</h4>
          <p>{message}</p>
        </div>}
        {error && <div>
          <hr />
          <h4 className='white' >Error:</h4>
          <p>{error}</p>
        </div>}
        {resultDataset && <div>
          <hr />
          <h3 className='white' >Results:</h3>
          <Json body={resultDataset} />
        </div>}
      </div>
    )
  }

  styles () {
    return {
      'page': {
        width: '100%',
        height: '100%',
        padding: 10,
        background: '#111',
        overflow: 'auto'
      }
    }
  }
}

Results.propTypes = {
  localDataset: PropTypes.object
}

Results.defaultProps = {

}
