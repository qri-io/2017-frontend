import React, { PropTypes } from 'react'
import { debounce } from 'lodash'
import { Palette, defaultPalette } from '../propTypes/palette'

import Base from './Base'

import AddDatasetContainer from '../containers/AddDataset'

import List from './List'
import DatasetItem from './item/DatasetItem'
import Spinner from './Spinner'

const ADD_DATASET_MODAL = 'ADD_DATASET_MODAL'

export default class Datasets extends Base {
  constructor (props) {
    super(props)
    // this.state = { loading: props.datasets.length === 0 };
    this.state = { loading: true, message: 'No Datasets', error: false }

    this.debounceRunDatasetSearch = debounce((searchString) => {
      this.setState({ loading: false })
      searchString ? this.props.runDatasetSearch(searchString) : undefined
    }
    , 250);

    [
      'onSelectDataset',
      'handleDatasetSearch',
      'handleLoadDatasetsError',
      'handleAddItem'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    this.props.loadDatasets(this.handleLoadDatasetsError, this.props.nextPage)
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.loading && this.state.error || nextProps.datasets.length) {
      this.setState({ loading: false })
    }
  }

  onSelectDataset (index, datasetRef) {
    this.props.showModal(DATASET_DETAILS_MODAL, this, datasetRef, true)
  }

  handleLoadDatasetsError (error) {
    if (error) {
      this.setState({message: 'There was an error loading your Datasets. Please try again by refreshing the page.', error: true})
    } else {
      this.setState({message: 'No Datasets', error: false})
    }
  }
  handleLoadNextPage () {
    this.props.loadDatasets(this.handleLoadDatasetsError, this.props.nextPage)
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
      case ADD_DATASET_MODAL:
        return <AddDatasetContainer />
      default:
        return undefined
    }
  }

  template (css) {
    const { loading, message } = this.state
    const { datasets, searchString, palette, bounds, noHeader } = this.props
    if (loading) {
      return (
        <div className={css('wrap')}>
          <header>
            { noHeader ? undefined : <div><h1>Datasets</h1><hr /></div>}
            <input
              id={'search'}
              name={'search'}
              type={'text'}
              className={css('searchBox')}
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
      <div className={css('wrap')}>
        <header>
          { noHeader ? undefined : <div><h1>Datasets</h1><hr className={css('marginTop')} /></div>}
          <input
            id='search'
            name='search'
            type='text'
            className={css('searchBox')}
            value={searchString}
            placeholder='search'
            onChange={(e) => { this.handleDatasetSearch(e.target.value) }}
          />
          <button onClick={this.handleAddItem} className='btn btn-primary right'>Add</button>
          <hr />
        </header>
        <div className={css('list')}>
          <List
            data={datasets}
            component={DatasetItem}
            onSelectItem={this.onSelectDataset}
            emptyComponent={<p>{message}</p>}
            palette={palette}
            />
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette, padding, bounds } = this.props
    console.log('in styles datasets component')
    const height = bounds.height - 145
    console.log(height)
    let paddingLeft, paddingRight = 0
    if (padding) {
      paddingLeft = 20
      paddingRight = 20
    }
    return {
      wrap: {
        paddingLeft: paddingRight,
        paddingRight: paddingRight,
        height: `${bounds.height - 59}px`
      },
      searchBox: {
        display: 'inline-block',
        width: '50%',
        fontSize: '.9rem',
        lineHeight: '.9rem',
        color: '#55595c',
        backgroundColor: '#fff',
        border: '0.5px solid rgba(0, 0, 0, 0.15)',
        overflow: 'auto',
        borderRadius: '0.25rem',
        marginBottom: 10,
        paddingLeft: 8
      },
      list: {
        position: 'relative',
        overflow: 'auto',
        height: `${height}px`
      },
      marginTop: {
        marginTop: 0
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
  palette: Palette
}

Datasets.defaultProps = {
  skipLoad: false,
  palette: defaultPalette,
  padding: true
}
