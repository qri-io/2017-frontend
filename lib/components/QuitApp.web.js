import { Component } from 'react'

// Sister component to QuitApp.electron.js
// when we are in the webapp, we don't need any `exit`, the user can just x-out the tab
export default class QuitApp extends Component {
  render () {
    return null
  }
}
