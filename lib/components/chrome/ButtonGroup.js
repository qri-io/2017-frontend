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
      // the download props (eg `topLeftDownload`) should be a
      // uri to content you want to download
      // the download props will override the more general func props
      topLeftDownload,
      topRightDownload,
      bottomLeftDownload,
      bottomRightDownload,
      redText,
      redFunc
    } = this.props

    return (
      <div className={css('wrap')}>
        <div className={css('row')}>
          { topLeftText &&
            (topLeftFunc || topLeftDownload) &&
            <Button
              download={topLeftDownload}
              downloadName={topLeftDownload}
              onClick={topLeftDownload ? undefined : topLeftFunc}
              text={topLeftText} /> }
          { topRightText &&
            (topRightFunc || topRightDownload) &&
            <Button
              download={topRightDownload}
              downloadName={topRightDownload}
              onClick={topRightDownload ? undefined : topRightFunc}
              text={topRightText} /> }
        </div>
        <div className={css('row')}>
          { bottomLeftText &&
            (bottomLeftFunc || bottomLeftDownload) &&
            <Button
              download={bottomLeftDownload}
              downloadName={bottomLeftDownload}
              onClick={bottomLeftDownload ? undefined : bottomLeftFunc}
              text={bottomLeftText} /> }
          { bottomRightText &&
            (bottomRightFunc || bottomRightDownload) &&
            <Button
              download={bottomRightDownload}
              downloadName={bottomRightDownload}
              onClick={bottomRightDownload ? undefined : bottomRightFunc}
              text={bottomRightText} /> }
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
  topLeftFunc: PropTypes.oneOf(PropTypes.func, PropTypes.bool),
  topRightFunc: PropTypes.oneOf(PropTypes.func, PropTypes.bool),
  bottomLeftFunc: PropTypes.oneOf(PropTypes.func, PropTypes.bool),
  bottomRightFunc: PropTypes.oneOf(PropTypes.func, PropTypes.bool),
  topLeftDownload: PropTypes.string,
  topRightDownload: PropTypes.string,
  bottomLeftDownload: PropTypes.string,
  bottomRightDownload: PropTypes.string,
  redFunc: PropTypes.func
}

ButtonGroup.defaultProps = {

}

// max width 360
// keep them in the boxes?
