import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { showModal } from '../actions/app'
import { loadDatasets } from '../actions/dataset'
import { selectAllDatasets, selectNoDatasets } from '../selectors/dataset'

import AddDataset from './AddDataset'
import Dataset from './Dataset'

import List from '../components/List'
import DatasetItem from '../components/item/DatasetItem'
import Spinner from '../components/Spinner'

const DATASET_DETAILS_MODAL = 'DATASET_DETAILS_MODAL'
const ADD_DATASET_MODAL = 'ADD_DATASET_MODAL'

class DatasetsList extends React.Component {
  constructor (props) {
    super(props)
    // this.state = { loading: props.datasets.length === 0 };
    this.state = { loading: false };
    [
      'onSelectDataset',
      'handleAddItem'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.skipLoad) {
      this.props.loadDatasets(this.props.nextPage)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.datasets.length > 0 && this.props.datasets.length === 0 || nextProps.noDatasets) {
      this.setState({ loading: false })
    }
  }

  onSelectDataset (index, datasetRef) {
    this.props.showModal(DATASET_DETAILS_MODAL, this, datasetRef, true)
  }

  handleLoadNextPage () {
    this.props.loadDatasets(this.props.nextPage)
  }

  handleAddItem () {
    this.props.showModal(ADD_DATASET_MODAL, this, {}, true)
  }

  modal (name, data = {}) {
    switch (name) {
      case DATASET_DETAILS_MODAL:
        return <Dataset path={data.path} />
      case ADD_DATASET_MODAL:
        return <AddDataset />
      default:
        return undefined
    }
  }

  render () {
    const { loading } = this.state
    const { datasets } = this.props

    if (loading) {
      return (
        <div className='container'>
          <Spinner />
        </div>
      )
    }

    return (
      <div id='wrapper'>
        <header>
          <button onClick={this.handleAddItem} className='btn btn-primary right'>Add</button>
          <hr />
        </header>
        <List
          data={datasets}
          component={DatasetItem}
          onSelectItem={this.onSelectDataset}
          emptyComponent={<p>No Datasets</p>} />
      </div>
    )
  }
}

DatasetsList.propTypes = {
  datasets: PropTypes.array.isRequired,
  nextPage: PropTypes.number.isRequired,
  fetchedAll: PropTypes.bool,
  loadDatasets: PropTypes.func.isRequired,
  skipLoad: PropTypes.bool
}

DatasetsList.defaultProps = {
  skipLoad: false
}

function mapStateToProps (state, ownProps) {
  const pagination = state.pagination.popularDatasets

  return Object.assign({
    // TODO - horrible hack to remove "unnnamed dataset" entries from display
    datasets: selectAllDatasets(state).filter((ref) => ref.name != ''),
    noDatasets: selectNoDatasets(state),
    loading: (pagination.popularDatasets) ? pagination.popularDatasets.isFetching : false,
    nextPage: (pagination.popularDatasets) ? (pagination.popularDatasets.pageCount + 1) : 1,
    fetchedAll: (pagination.popularDatasets) ? pagination.popularDatasets.fetchedAll : false
  }, ownProps)
}

export default connect(mapStateToProps, {
  showModal,
  loadDatasets
})(DatasetsList)
