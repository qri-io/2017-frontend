import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'

import { showModal } from '../actions/app'
import { loadDatasets, setDatasetSearch, runDatasetSearch } from '../actions/dataset'
import { selectDatasetSearchString, selectNoDatasets, selectDatasets, selectDatasetsPageCount, selectDatasetsFetchedAll, selectDatasetsIsFetching } from '../selectors/dataset'

import AddDatasetContainer from './AddDataset'
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
    this.state = { loading: false }

    this.debounceRunDatasetSearch = debounce((searchString) => {
      this.setState({ loading: false })
      searchString ? this.props.runDatasetSearch(searchString) : undefined
    }
    , 250);

    [
      'onSelectDataset',
      'handleDatasetSearch',
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

  handleDatasetSearch (searchString) {
    // console.log(searchString)
    this.props.setDatasetSearch(searchString)
    this.setState({ loading: true })
    this.debounceRunDatasetSearch(searchString)
  }

  modal (name, data = {}) {
    switch (name) {
      case DATASET_DETAILS_MODAL:
        return <Dataset path={data.path} />
      case ADD_DATASET_MODAL:
        return <AddDatasetContainer />
      default:
        return undefined
    }
  }

  render () {
    const { loading } = this.state
    const { datasets, searchString } = this.props

    if (loading) {
      return (
        <div className='wrapper'>
          <header>
            <input
              id={'search'}
              name={'search'}
              type={'text'}
              className='searchBox'
              value={searchString}
              placeholder={'search'}
              onChange={(e) => { this.handleDatasetSearch(e.target.value) }}
        />
            <button onClick={this.handleAddItem} className='btn btn-primary right'>Add</button>
            <hr />
          </header>
          <Spinner />
        </div>
      )
    }

    return (
      <div id='wrapper'>
        <header>
          <input
            id={'search'}
            name={'search'}
            type={'text'}
            className='searchBox'
            value={searchString}
            placeholder={'search'}
            onChange={(e) => { this.handleDatasetSearch(e.target.value) }}
        />
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
  searchString: PropTypes.string,
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
  const searchString = selectDatasetSearchString(state)
  const paginationSection = searchString ? 'searchedDatasets' : ''
  return Object.assign({
    searchString,
    datasets: selectDatasets(state, paginationSection, searchString),
    noDatasets: selectNoDatasets(state, paginationSection, searchString),
    loading: selectDatasetsIsFetching(state, paginationSection, searchString),
    nextPage: selectDatasetsPageCount(state, paginationSection, searchString) + 1,
    fetchedAll: selectDatasetsFetchedAll(state, paginationSection, searchString)
  }, ownProps)
}

export default connect(mapStateToProps, {
  setDatasetSearch,
  runDatasetSearch,
  showModal,
  loadDatasets
})(DatasetsList)
