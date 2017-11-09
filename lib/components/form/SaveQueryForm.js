import React from 'react'
import PropTypes from 'prop-types'

import ValidInput from './ValidInput'
import ValidTextArea from './ValidTextArea'

import Base from '../Base'
import { Palette, defaultPalette } from '../../propTypes/palette'

export default class SaveQueryForm extends Base {
  constructor (props) {
    super(props)
    this.state = {
      feedback: '',
      name: '',
      description: this.props.query.queryString,
      message: '',
      disabled: true
    };
    [
      'handleDisableButton'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  onChange (name, value, e) {
    this.setState({ [name]: value })
    this.handleDisableButton()
  }

  handleDisableButton () {
    const { name, description } = this.state
    if (name && description) {
      this.setState({ disabled: false })
    } else {
      this.setState({ disabled: true })
    }
  }

  template (css) {
    const { query } = this.props
    console.log(query)
    // Save Query As New Dataset
    // name
    // query.queryString -> pre filled in description
    // description
    // button
    return (
      <div>SAVE QUERY FORM :)</div>
    )
  }
  styles () {
    return {

    }
  }
}

SaveQueryForm.PropTypes = {
  query: PropTypes.object
}

SaveQueryForm.defaultProps = {

}
