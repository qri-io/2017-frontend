import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../../propTypes/palette'

import Base from '../Base'
import List from '../List'
import KeyValueItem from '../item/KeyValueItem'

export default class KeyValueInput extends Base {
  constructor (props) {
    super(props);

    [
      'handleRemoveEntry',
      'handleChange',
      'handleAddEntry'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  objectToArray (obj = {}) {
    return Object.keys(obj).map((key) => { return { key, value: obj[key] } })
  }

  arrayToObject (arr = []) {
    return arr.reduce((acc, a) => {
      acc[a.key] = a.value
      return acc
    }, {})
  }

  handleAddEntry () {
    const { value, name, onChange } = this.props
    // const obj = this.arrayToObject(value)
    let obj = Object.assign({}, value, { '': '' })
    onChange(name, obj)
  }

  handleChange (index, prop) {
    const { onChange, value, name } = this.props

    let obj = this.arrayToObject(Object.keys(value).map((key, i) => {
      if (i === index) {
        return prop
      }
      return { key, value: value[key] }
    }))

    onChange(name, obj)
  }

  handleRemoveEntry (i) {
    // const { onChange, value, name } = this.props
    // var newContributors = value.slice(0, i).concat(value.slice(i + 1))
    // if (newContributors.length === 0) {
    //   newContributors = undefined
    // }
    // onChange(name, newContributors)
  }

  template (css) {
    const { value, error, showError, helpText, showHelpText } = this.props
    return (
      <div className={css('flex')}>
        <List
          data={this.objectToArray(value)}
          component={KeyValueItem}
          onRemove={this.handleRemoveEntry}
          onChange={this.handleChange}
        />
        <a className={`icon-inline ${css('add')}`} onClick={this.handleAddEntry}>add</a>
        {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
        {(helpText && showHelpText) && <div><i className='help_hint'>{helpText}</i></div>}
      </div>
    )
  }

  styles (props) {
    const palette = defaultPalette
    return {
      label: {
        color: palette.neutral
      },
      flex: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column'
      },
      add: {
        alignSelf: 'flex-end',
        marginTop: 10
      }
    }
  }
}

KeyValueInput.propTypes = {
  value: PropTypes.object,
  name: PropTypes.string,
  onChange: PropTypes.func,
  // whether or not to actually display any passed-in errors
  showError: PropTypes.bool,
  // an error message to display
  error: PropTypes.string,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool
}

KeyValueInput.defaultProps = {
  value: {},
  name: 'KeyValueInput'
}
