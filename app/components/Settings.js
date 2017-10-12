import React from 'react'

import Base from './Base'

export default class Settings extends Base {
  template (css) {
    return (
      <div className={css('wrap')}>
        <header>
          <h1>Settings</h1>
          <hr />
        </header>
      </div>
    )
  }
  styles () {
    return {
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
      }
    }
  }
}
