import React from 'react'
import PropTypes from 'prop-types'
import List from '../List'
import CommitItemContainer from '../../containers/CommitItem'

export default class Commits extends React.PureComponent {
  constructor (props) {
    super(props);

    [
      'handleLoadNextPage'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentDidMount () {
    if (!this.props.skipLoad) {
      this.props.loadHistoryByName(this.props.peername, this.props.name)
    }
  }

  handleLoadNextPage () {
    this.props.loadHistoryByName(this.props.peername, this.props.name, this.props.nextPage)
  }

  render () {
    const {
      log,
      currentID,
      datasetRef,
      registryVersion,
      fromRegistry,
      sessionProfile,
      hitBottom,
      loading,
      fetchedAll
    } = this.props

    return (
      <div className='commits-wrap'>
        <List
          data={log}
          component={CommitItemContainer}
          onSelectItem={this.onSelectProfile}
          emptyComponent={<CommitItemContainer data={datasetRef} currentID={currentID} index={0} registryVersion={registryVersion} sessionProfile={sessionProfile} />}
          loading={loading}
          fetchedAll={fetchedAll}
          type='history'
          currentID={currentID}
          registryVersion={registryVersion}
          sessionProfile={sessionProfile}
          loadMore={this.handleLoadNextPage}
          hitBottom={hitBottom}
        />
        {fromRegistry && sessionProfile && <div className='commits-note-wrap'>Note: this dataset is from the registry, so it's history may be incomplete</div>}
      </div>
    )
  }
}

Commits.propTypes = {
  searchString: PropTypes.string,
  log: PropTypes.array.isRequired,
  nextPage: PropTypes.number.isRequired,
  fetchedAll: PropTypes.bool,
  loadHistoryByName: PropTypes.func.isRequired,
  skipLoad: PropTypes.bool
}

Commits.defaultProps = {
  skipLoad: false
}
