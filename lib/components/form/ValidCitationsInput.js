import React from 'react'
import PropTypes from 'prop-types'
import List from '../List'
import CitationItem from '../item/CitationItem'

export default class ValidCitationsInput extends React.PureComponent {
  constructor (props) {
    super(props);

    [
      'handleRemoveRow',
      'handleChange',
      'handleAddRow'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleAddRow () {
    const { value } = this.props
    this.handleChange(value.length, {})
  }

  handleChange (index, citation) {
    const { onChange, value } = this.props
    var newCitations = value.slice(0, value.length)
    newCitations[index] = citation
    onChange('citations', newCitations)
  }

  handleRemoveRow (i) {
    const { onChange, value } = this.props
    var newCitations = value.slice(0, i).concat(value.slice(i + 1))
    if (newCitations.length === 0) {
      newCitations = undefined
    }
    onChange('citations', newCitations)
  }

  render () {
    const { value, error, showError, helpText, showHelpText } = this.props
    return (
      <div className='valid-citation-input-flex'>
        <label className='valid-citation-input-label'>Citations</label>
        <List
          data={value}
          component={CitationItem}
          onRemove={this.handleRemoveRow}
          onChange={this.handleChange}
        />
        <a className='icon-inline valid-citation-input-add' onClick={this.handleAddRow}>add</a>
        {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
        {(helpText && showHelpText) && <div><i className='help_hint'>{helpText}</i></div>}
      </div>
    )
  }
}

ValidCitationsInput.propTypes = {
  value: PropTypes.array,
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

ValidCitationsInput.defaultProps = {
  value: []
}
