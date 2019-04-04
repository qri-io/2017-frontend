import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

import Base from '../Base'
import List from '../List'
import CommitItemContainer from '../../containers/CommitItem'
import Spinner from '../chrome/Spinner'

export default class Commits extends Base {
  constructor (props) {
    super(props)
    this.state = {
      loading: !(props.fetchedAll || props.log.length > 0)
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

  componentDidMount () {
    if (!this.props.skipLoad) {
      this.props.loadHistoryByName(this.props.peername, this.props.name)
    } else if (this.state.loading === true && this.props.loading === false) {
      this.setState({ loading: false })
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (state.loading === true && props.loading === false) {
      return { loading: false }
    }

    return null
  }

  onSelectProfile (index, profileRef) {
    // this.props.showModal(DATASET_DETAILS_MODAL, this, datasetRef, true)
  }

  handleLoadNextPage () {
    this.props.loadHistorybyName(this.props.peername, this.props.name, this.props.nextPage)
  }

  handleHistorySearch (searchString) {
    this.props.setHistorySearch(searchString)
    this.setState({ loading: true })
    this.debounceRunHistorySearch(searchString)
  }

  render () {
    const { loading } = this.state
    const { log, currentID, datasetRef, registryVersion, fromRegistry, sessionProfile } = this.props

    if (loading) {
      return (
        <div className='wrapper'>
          <Spinner large />
        </div>
      )
    }

    return (
      <div className='commits-wrap'>
        <List
          data={log}
          component={CommitItemContainer}
          onSelectItem={this.onSelectProfile}
          emptyComponent={<CommitItemContainer data={datasetRef} currentID={currentID} index={0} registryVersion={registryVersion} sessionProfile={sessionProfile} />}
          loading={this.props.loading}
          fetchedAll={this.props.fetchedAll}
          onClick={this.handleLoadNextPage}
          type='history'
          currentID={currentID}
          registryVersion={registryVersion}
          sessionProfile={sessionProfile}
        />
        {fromRegistry && sessionProfile && <div className='commits-note-wrap'>Note: this dataset is from the registry, so it's history may be incomplete</div>}
      </div>
    )
  }
}

Commits.propTypes = {
  searchString: PropTypes.string,
  log: PropTypes.array.isRequired,
  // nextPage: PropTypes.number.isRequired,
  fetchedAll: PropTypes.bool,
  loadHistoryByName: PropTypes.func.isRequired,
  skipLoad: PropTypes.bool
}

Commits.defaultProps = {
  skipLoad: false
}
