import React, { Component } from 'react'
import { remote } from 'electron'

// Sister component to QuitApp.web.js
export default class QuitApp extends Component {
  render () {
    return (<a className='linkSmallMuted' onClick={() => {
      remote.app.quit()
    }}>exit</a>
    )
  }
}
