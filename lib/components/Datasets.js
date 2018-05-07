import React from 'react'
import PropTypes from 'prop-types'

// import { debounce } from 'lodash'

import { DATASETS_FAILURE } from '../constants/dataset'

import Base from './Base'
import ReadOnly from './ReadOnly'

import AddDatasetContainer from '../containers/AddDataset'

import List from './List'
import DatasetItem from './item/DatasetItem'
import Spinner from './Spinner'
import Header from './Header'
import Button from './Button'
// import Search from './Search'

const ADD_DATASET_MODAL = 'ADD_DATASET_MODAL'

export default class Datasets extends Base {
  constructor (props) {
    super(props)

    this.state = {
      loading: !(props.fetchedAll || props.datasets.length > 0),
      message: 'No Datasets',
      error: false
    };

    // TODO - restore search
    // this.debounceRunDatasetSearch = debounce((searchString) => {
    //   this.props.runDatasetSearch(searchString)
    // }
    // , 250);

    [
      // 'handleDatasetSearch',
      'handleLoadDatasetsError',
      'handleReloadDatasets',
      'handleAddItem',
      'handleLoadNextPage',
      'handleAddDataset'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (this.props.id && this.props.datasets && !this.props.datasets.length) {
      this.props.loadDatasets(this.props.id).then(action => this.handleLoadDatasetsError(action))
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.id !== nextProps.id) {
      this.props.loadDatasets(nextProps.id).then(action => this.handleLoadDatasetsError(action))
    } else if (this.state.loading && (!nextProps.loading || this.state.error || nextProps.datasets.length || nextProps.fetchedAll || nextProps.noDatasets)) {
      this.setState({ loading: false })
    }
  }

  handleLoadDatasetsError (action) {
    if (action.type === DATASETS_FAILURE) {
      this.setState({message: 'There was an error loading your Datasets.', error: true})
    } else {
      this.setState({message: 'No Datasets', error: false})
    }
  }
  handleLoadNextPage () {
    this.props.loadDatasets(this.props.id, this.props.nextPage).then(action => this.handleLoadDatasetsError(action))
  }

  handleReloadDatasets () {
    this.props.loadDatasets(this.props.id, this.props.nextPage - 1).then(action => this.handleLoadDatasetsError(action))
  }

  handleAddItem () {
    this.props.showModal(ADD_DATASET_MODAL, this, {}, true)
  }

  // TODO - restore search
  // handleDatasetSearch (searchString) {
  //   this.setState({ loading: true })
  //   this.props.setDatasetSearch(searchString)
  //   this.debounceRunDatasetSearch(searchString)
  // }

  modal (name, data = {}) {
    switch (name) {
      case ADD_DATASET_MODAL:
        return <AddDatasetContainer />
      default:
        return undefined
    }
  }
  handleAddDataset (path, name, peer) {
    return peer ? () => {
      this.props.addDataset(path, name, '', '').then(() => {
        this.props.loadDatasets(this.props.id)
      })
    } : undefined
  }

  template (css) {
    const { message, loading, error } = this.state
    const { datasets, noHeader, palette, smallItems, showStats } = this.props

    if (!this.props.id) {
      return (<ReadOnly />)
    }

    return (
      <div className={css('wrap')}>
        { noHeader ? undefined : <Header text='Datasets' buttonText='Add Dataset' buttonColor='a' link='/dataset/add' /> }
        <div className={css('list')}>
          <div className={`${showStats ? 'col-md-8' : undefined}`}>
            {
              loading ? <Spinner />
                : <List
                  data={datasets}
                  component={DatasetItem}
                  emptyComponent={<label>{message}</label>}
                  small={smallItems}
                  palette={palette}
                  loading={this.props.loading}
                  fetchedAll={this.props.fetchedAll}
                  onClick={this.handleLoadNextPage}
                  onAdd={this.handleAddDataset}
                  type='datasets'
                />
            }
            {error ? <div className={css('reload')}><Button color='neutral-bold' onClick={this.handleReloadDatasets} text='reload datasets' /></div> : undefined }
          </div>
        </div>
      </div>
    )
  }

  styles () {
    return {
      marginTop: {
        marginTop: 40
      },
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
      },
      searchBox: {
        display: 'inline-block',
        width: '50%',
        fontSize: '.9rem',
        lineHeight: '.9rem'
      },
      list: {
        position: 'relative',
        overflow: 'auto'
      },
      hr: {
        marginTop: 0
      },
      reload: {
        marginBottom: 40
      }
    }
  }
}

Datasets.propTypes = {
  searchString: PropTypes.string,
  datasets: PropTypes.array.isRequired,
  nextPage: PropTypes.number.isRequired,
  fetchedAll: PropTypes.bool,
  loadDatasets: PropTypes.func.isRequired,
  skipLoad: PropTypes.bool,
  padding: PropTypes.bool.isRequired,
  smallItems: PropTypes.bool
}

Datasets.defaultProps = {
  showStats: true,
  skipLoad: false,
  smallItems: false,
  padding: true,
  statItem: [
    {
      icon: 'document',
      title: 'network-wide datasets',
      stat: '245k'
    },
    {
      icon: 'harddrive',
      title: 'network-wide data size',
      stat: '4.5Tib'
    },
    {
      icon: 'link',
      title: 'transferred',
      stat: '2.4Gib'
    }]
}
