import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'
import Base from '../Base'

export default class ButtonGroup extends Base {
  template (css) {
    const {
      topLeftText,
      topRightText,
      bottomLeftText,
      bottomRightText,
      topLeftFunc,
      topRightFunc,
      bottomLeftFunc,
      bottomRightFunc,
      redText,
      redFunc
    } = this.props

    return (
      <div className={css('wrap')}>
        <div className={css('row')}>
          { topLeftFunc &&
            topLeftText &&
            <Button onClick={topLeftFunc} text={topLeftText} /> }
          { topRightFunc &&
            topRightText &&
            <Button onClick={topRightFunc} text={topRightText} /> }
        </div>
        <div className={css('row')}>
          { bottomLeftFunc &&
            bottomLeftText &&
            <Button onClick={bottomLeftFunc} text={bottomLeftText} /> }
          { bottomRightFunc &&
            bottomRightText &&
            <Button onClick={bottomRightFunc} text={bottomRightText} /> }
        </div>
        { redFunc &&
          redText &&
          <a className='errLinkMedium' onClick={redFunc} >{redText}</a> }
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        width: 260
      },
      row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 20
      }
    }
  }
}

ButtonGroup.propTypes = {
  topLeftText: PropTypes.string,
  topRightText: PropTypes.string,
  bottomLeftText: PropTypes.string,
  bottomRightText: PropTypes.string,
  redText: PropTypes.string,
  topLeftFunc: PropTypes.func,
  topRightFunc: PropTypes.func,
  bottomLeftFunc: PropTypes.func,
  bottomRightFunc: PropTypes.func,
  redFunc: PropTypes.func
}

ButtonGroup.defaultProps = {

}

// max width 360
// keep them in the boxes?
