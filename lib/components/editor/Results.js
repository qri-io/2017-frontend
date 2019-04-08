import React from 'react'
import PropTypes from 'prop-types'
import Json from '../Json'

export default class Results extends React.PureComponent {
  render () {
    const { resultDataset, message, error } = this.props

    return (
      <div className='results-page'>
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
          <Json body={resultDataset} light />
        </div>}
      </div>
    )
  }
}

Results.propTypes = {
  localDataset: PropTypes.object
}

Results.defaultProps = {

}
