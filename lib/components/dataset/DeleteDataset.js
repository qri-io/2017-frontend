import React from 'react'
import PropTypes from 'prop-types'
import DatasetRefProps from '../../propTypes/datasetRefProps'
import Button from '../chrome/Button'

export default class DeleteDataset extends React.PureComponent {
  render () {
    const { datasetRef, onDelete, onCancel, history } = this.props
    return (
      <div className='white delete-dataset-wrap'>
        <div>
          <h1 className='white'>Delete Most Recent</h1>
          <p>Would you like to delete the most recent version of {datasetRef.peername}/{datasetRef.name}?</p>
          <p>(Note: if this version of the dataset has been published, the data may still exist on the network)</p>
          <div className='delete-dataset-buttons'>
            <a onClick={onCancel} className='delete-dataset-cancel' >cancel</a>
            <Button
              type='submit'
              text='DELETE ONE VERSION'
              color='danger'
              onClick={() => {
                onCancel()
                onDelete(datasetRef, 1)
                  .then((action) => {
                    history.push(`/${datasetRef.peername}/${datasetRef.name}`)
                  })
              }
              }
            />
          </div>
        </div>
        <div className='delete-entire-dataset'>
          <h3 className='white'>Delete Entire Dataset:</h3>
          <p>If you want to delete the entire dataset, this cannot be undone!</p>
          <p>(Note: if this dataset has been published, the data may still exist on the network)</p>
          <div className='delete-dataset-buttons'>
            <a onClick={onCancel} className='delete-dataset-cancel' >cancel</a>
            <Button
              type='submit'
              text='DELETE ENTIRE DATASET'
              color='danger'
              onClick={() => {
                onCancel()
                onDelete(datasetRef, -1)
                  .then((action) => {
                    history.push('/')
                  })
              }
              }
            />
          </div>
        </div>
      </div>
    )
  }
}

DeleteDataset.propTypes = {
  datasetRef: DatasetRefProps.isRequired,
  // onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

DeleteDataset.defaultProps = {

}
