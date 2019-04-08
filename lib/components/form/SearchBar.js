import React from 'react'
import PropTypes from 'prop-types'

export default class SearchBar extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      search: ''
    };
    [
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentDidMount () {
    this.setState({ search: this.props.searchString })
  }

  static getDerivedStateFromProps (props, state) {
    const searchString = props && props.searchString
    const prevSearchString = state && state.search
    if (searchString !== prevSearchString) {
      return { search: searchString }
    }
    return null
  }

  render () {
    const { onKeyUp, onChange } = this.props
    return (
      <input onChange={onChange} className='search-bar-input' value={this.state.search} onKeyUp={onKeyUp} />
    )
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  searchString: PropTypes.string
}

SearchBar.defaultProps = {
}
