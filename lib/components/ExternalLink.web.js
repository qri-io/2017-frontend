import React, { Component } from 'react'

export default class ExternalLink extends Component {
  render () {
    return <a {...this.props} target='_blank'>{this.props.children}</a>
  }
}
