import React from 'react'
import Base from './Base'
import PropTypes from 'prop-types'

export default class Spinner extends Base {
  template (css) {
    const { center } = this.props
    return (
      <div className={`${css('spinner')} ${center ? css('center') : undefined}`}>
        <div className={css('block', 'rect1')} />
        <div className={css('block', 'rect2')} />
        <div className={css('block', 'rect3')} />
        <div className={css('block', 'rect4')} />
        <div className={css('block', 'rect5')} />
      </div>
    )
  }

  styles () {
    const spinnerAnim = {
      '0%': { transform: 'scaleY(0.4)' },
      '20%': { transform: 'scaleY(1.0)' },
      '40%': { transform: 'scaleY(0.4)' },
      '100%': { transform: 'scaleY(0.4)' }
    }

    return {
      spinner: {
        width: 60,
        height: 40,
        textAlign: 'center',
        fontSize: 10
      },
      center: {
        margin: '100px auto'
      },
      block: {
        backgroundColor: '#A1B2BC',
        height: '100%',
        width: 6,
        marginRight: 2,
        borderRadius: 6,
        display: 'inline-block',
        animationName: spinnerAnim,
        animationDuration: '1.2s',
        animationIterationCount: 'infinite'
      },
      rect1: { animationDelay: '0s' },
      rect2: { animationDelay: '-1.1s' },
      rect3: { animationDelay: '-1s' },
      rect4: { animationDelay: '-1s' },
      rect5: { animationDelay: '-0.9s' }
    }
  }
}

Spinner.propTypes = {
  center: PropTypes.bool.isRequired
}

Spinner.defaultProps = {
  center: true
}
