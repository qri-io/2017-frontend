import React from 'react'
import Base from '../Base'

// import { defaultPalette } from '../../propTypes/palette'

export default class EditConfig extends Base {
  template (css) {
    return (
      <div className={css('page')}>
        <div className={css('center')}>
          <h4>EditConfig</h4>
        </div>
      </div>
    )
  }
  styles () {
    return {
      'page': {
        width: '100%',
        height: '100%'
      },
      'center': {
        width: 300,
        height: 300,
        padding: '10em auto',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        textAlign: 'center'
      }
    }
  }
}

EditConfig.propTypes = {
}

EditConfig.defaultProps = {
}
