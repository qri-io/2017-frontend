import React from 'react'

export default class Spinner extends React.Component {
  render () {
    return (
      <div className='spinner'>
        <div className='rect1' />
        <div className='rect2' />
        <div className='rect3' />
        <div className='rect4' />
        <div className='rect5' />
      </div>
    )
  }
}

Spinner.propTypes = {

}

Spinner.defaultProps = {

}
