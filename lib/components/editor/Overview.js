import React from 'react'
import PropTypes from 'prop-types'
import Json from '../Json'
import ValidInput from '../form/ValidInput'

export default class Overview extends React.PureComponent {
  filterKeys (dataset) {
    let ds = Object.assign({}, dataset)
    delete ds['path']
    return ds
  }

  render () {
    const { name, localDataset, onChangeName } = this.props

    return (
      <div className='editor-overview-page'>
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
}

Overview.propTypes = {
  localDataset: PropTypes.object,
  onChangeName: PropTypes.func
}

Overview.defaultProps = {

}
