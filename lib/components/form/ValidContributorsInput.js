import React from 'react'
import PropTypes from 'prop-types'
import List from '../List'
import ContributorItem from '../item/ContributorItem'

export default class ValidContributorsInput extends React.PureComponent {
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

  handleChange (index, contributor) {
    const { onChange, value } = this.props
    var newContributors = value.slice(0, value.length)
    newContributors[index] = contributor
    onChange('contributors', newContributors)
  }

  handleRemoveRow (i) {
    const { onChange, value } = this.props
    var newContributors = value.slice(0, i).concat(value.slice(i + 1))
    if (newContributors.length === 0) {
      newContributors = undefined
    }
    onChange('contributors', newContributors)
  }

  render () {
    const { value, error, showError, helpText, showHelpText } = this.props
    return (
      <div className='valid-contributor-input-flex'>
        <label className='valid-contributor-input-label'>Contributors</label>
        <List
          data={value}
          component={ContributorItem}
          onRemove={this.handleRemoveRow}
          onChange={this.handleChange}
        />
        <a className='icon-inline valid-contributor-input-add' onClick={this.handleAddRow}>add</a>
        {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
        {(helpText && showHelpText) && <div><i className='help_hint'>{helpText}</i></div>}
      </div>
    )
  }
}

ValidContributorsInput.propTypes = {
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

ValidContributorsInput.defaultProps = {
  value: []
}
