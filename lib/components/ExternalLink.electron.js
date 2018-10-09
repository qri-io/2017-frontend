/* globals __BUILD__, import */
import React from 'react'
import { shell } from 'electron'

export default class ExternalLink extends React.Component {
  render () {
    return (<a href={this.props.href} onClick={(e) => {
      e.preventDefault()
      shell.openExternal(this.props.href)
    }} {...this.props}>{this.props.children}</a>)
  }
}
