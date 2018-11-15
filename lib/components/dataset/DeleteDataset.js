import React from 'react'
import PropTypes from 'prop-types'
import DatasetRefProps from '../../propTypes/datasetRefProps'

import Base from '../Base'
import Button from '../chrome/Button'

export default class DeleteDataset extends Base {
  template (css) {
    const { datasetRef, onDelete, onCancel, history } = this.props
    return (
      <div className={`white ${css('wrap')}`} >
        <h1 className='white'>Delete Dataset</h1>
        <p>Are you sure you want to delete dataset {datasetRef.peername}/{datasetRef.name}?</p>
        <p>This action will remove all version of this dataset from your Qri node.</p>
        <p>(Note: if this dataset has been published, the data may still exist on the network)</p>
        <div className={css('buttons')}>
          <Button
            type='submit'
            text='Delete'
            onClick={() => {
              onCancel()
              onDelete(datasetRef)
                .then((action) => {
                  history.push('/')
                })
            }
            }
          />
          <div className={css('cancel')}>
            <Button
              color='neutral-bold'
              onClick={onCancel}
              text='Cancel' />
          </div>
        </div>
      </div>
    )
  }
  styles () {
    return {
      wrap: {
        marginTop: 40,
        paddingLeft: 20,
        paddingRight: 20
      },
      buttons: {
        float: 'right'
      },
      cancel: {
        marginLeft: 10,
        display: 'inline-block'
      }
    }
  }
}

DeleteDataset.propTypes = {
  datasetRef: DatasetRefProps.isRequired,
  // onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

DeleteDataset.defaultProps = {

}
