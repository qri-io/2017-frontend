/* globals __BUILD__, import */
import React from 'react'

export default class ExternalLink extends React.Component {
  render () {
    return <a {...this.props} target='_blank'>{this.props.children}</a>
  }
}