import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

import Base from './Base'
import List from './List'
import CommitItem from './item/CommitItem'
import Spinner from './Spinner'

export default class Commits extends Base {
  constructor (props) {
    super(props)
    this.state = {
      loading: !(props.fetchedAll || props.history.length > 0)
    }

    this.debounceRunHistorySearch = debounce((searchString) => {
      this.setState({ loading: false })
      if (searchString) {
        this.props.runHistorySearch(searchString)
      }
    }
    , 250);

    [
      'onSelectProfile',
      'handleHistorySearch',
      'handleLoadNextPage'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.skipLoad) {
      this.props.loadHistory(this.props.path)
    } else if (this.state.loading === true && this.props.history.length > 0) {
      this.setState({loading: false})
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.loading === true && nextProps.history.length > 0 && (this.props.history.length === 0 || nextProps.noHistory)) {
      this.setState({ loading: false })
    }
  }

  onSelectProfile (index, profileRef) {
    console.log('Profile selected')
    // this.props.showModal(DATASET_DETAILS_MODAL, this, datasetRef, true)
  }

  handleLoadNextPage () {
    this.props.loadHistory(this.props.path, this.props.nextPage)
  }

  handleHistorySearch (searchString) {
    this.props.setHistorySearch(searchString)
    this.setState({ loading: true })
    this.debounceRunHistorySearch(searchString)
  }

  template (css) {
    const { loading } = this.state
    const { history } = this.props

    if (loading) {
      return (
        <div className='wrapper'>
          <Spinner />
        </div>
      )
    }

    return (
      <div className={css('wrap')}>
        <List
          data={history}
          component={CommitItem}
          onSelectItem={this.onSelectProfile}
          emptyComponent={<label>No History</label>}
          loading={this.props.loading}
          fetchedAll={this.props.fetchedAll}
          onClick={this.handleLoadNextPage}
          type='history'
        />
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        paddingLeft: 0,
        paddingRight: 0
      },
      searchBox: {
        display: 'inline-block',
        width: '50%',
        fontSize: '1rem',
        lineHeight: '1.25',
        color: '#55595c',
        backgroundColor: '#fff',
        border: '0.5px solid rgba(0, 0, 0, 0.15)',
        overflow: 'auto',
        borderRadius: '0.25rem',
        marginBottom: 10,
        paddingLeft: 8
      }
    }
  }
}

Commits.propTypes = {
  searchString: PropTypes.string,
  history: PropTypes.array.isRequired,
  // nextPage: PropTypes.number.isRequired,
  fetchedAll: PropTypes.bool,
  loadHistory: PropTypes.func.isRequired,
  skipLoad: PropTypes.bool
}

Commits.defaultProps = {
  skipLoad: false
}
