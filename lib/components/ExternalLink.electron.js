import { Component } from 'react'
import { shell } from 'electron'

export default class ExternalLink extends Component {
  render () {
    return (<a href={this.props.href} onClick={(e) => {
      e.preventDefault()
      shell.openExternal(this.props.href)
    }} {...this.props}>{this.props.children}</a>)
  }
}
