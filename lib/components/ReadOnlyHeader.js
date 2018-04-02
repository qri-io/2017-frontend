import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class ReadOnlyHeader extends Base {
  template (css) {
    const { onGoBack } = this.props
    return (
      <div className={css('wrap')}>
        <a className={`left ${css('link')}`} onClick={onGoBack}><span className='iconInline'>directleft</span> Back</a>
        <a href='http://qri.io' className={`right ${css('link')}`}>qri.io</a>
        <a href='https://github.com/qri-io/qri' className={`right ${css('link')}`}>github</a>
        <a href='https://github.com/qri-io/qri/releases' className={`right ${css('link')}`}>download</a>
        <hr className={css('hr')} />
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        paddingTop: 50,
        fontSize: 20
      },
      paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20
      },
      hr: {
        borderTop: `1px solid ${palette.gray}`,
        display: 'block',
        width: '100%',
        marginBottom: 0,
        marginTop: 30
      },
      link: {
        marginLeft: '5px',
        marginRight: '5px',
        color: palette.gray
      }
    }
  }
}

ReadOnlyHeader.propTypes = {
  onGoBack: PropTypes.func.isRequired
}

ReadOnlyHeader.defaultProps = {
}
