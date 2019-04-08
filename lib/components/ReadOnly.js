import React from 'react'
import AppDrag from './AppDrag'
import Button from './chrome/Button'

export default class ReadOnly extends React.PureComponent {
  render () {
    return (
      <div className='read-only-page'>
        <AppDrag />
        <div className='read-only-center'>
          <h4>This qri server </h4>
          <h4>is in read-only mode!</h4>
          <p>Only calls to <span className='linkMedium'>/network</span> <br /> and <span className='linkMedium'>/[peername]/[datasetname]</span> are active</p>
          <Button link='/network' text='Go To Network' />
        </div>
      </div>
    )
  }
}

ReadOnly.propTypes = {
}

ReadOnly.defaultProps = {
}
