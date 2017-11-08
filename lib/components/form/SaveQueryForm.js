import React from 'react'
import PropTypes from 'prop-types'

import ValidInput from './ValidInput'
import ValidTextArea from './ValidTextArea'

import Base from '../Base'
import { Palette, defaultPalette } from '../../propTypes/Palette'

export default class SaveQueryForm extends Base {
  constructor (props) {
    super(props)
    this.state = {
      feedback: '',
      name: '',
      description: '',
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
  	<div>SAVE QUERY FORM :)</div>
  }
  styles () {

  }
}

SaveQueryForm.PropTypes {

}