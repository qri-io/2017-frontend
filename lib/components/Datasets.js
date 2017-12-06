import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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

    this.state = {
      loading: !(props.fetchedAll || props.datasets.length > 0),
      message: 'No Datasets',
      error: false
    }

    this.debounceRunDatasetSearch = debounce((searchString) => {
      if (searchString) {
        this.props.runDatasetSearch(searchString)
      }
    }
    , 250);

    [
      'handleDatasetSearch',
      'handleLoadDatasetsError',
      'handleReloadDatasets',
      'handleAddItem',
      'handleLoadNextPage',
      'handleAddDataset'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (this.props.datasets && !this.props.datasets.length) {
      this.props.loadDatasets(this.handleLoadDatasetsError)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.loading && (!nextProps.loading || this.state.error || nextProps.datasets.length || nextProps.fetchedAll || nextProps.noDatasets)) {
      this.setState({ loading: false })
    }
  }

  handleLoadDatasetsError (error) {
    if (error) {
      this.setState({message: 'There was an error loading your Datasets.', error: true})
    } else {
      this.setState({message: 'No Datasets', error: false})
    }
  }
  handleLoadNextPage () {
    this.props.loadDatasets(this.handleLoadDatasetsError, this.props.nextPage)
  }

  handleReloadDatasets () {
    this.props.loadDatasets(this.handleLoadDatasetsError, this.props.nextPage - 1)
  }

  handleAddItem () {
    this.props.showModal(ADD_DATASET_MODAL, this, {}, true)
  }

  handleDatasetSearch (searchString) {
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
  handleAddDataset (path, name, peer) {
    return peer ? () => {
      this.props.addDataset(path, name, '', '',
        () => { this.props.loadDatasets() }
        )
    } : undefined
  }

  template (css) {
    const { loading, message } = this.state
    const { datasets, searchString, noHeader, palette } = this.props
    if (loading) {
      return (
        <div className={css('wrap')}>
          <header>
            { noHeader === true ? undefined : <div className={css('marginTop')}><h1>Datasets</h1><hr /></div>}
            <input
              id={'search'}
              name={'search'}
              type={'text'}
              className={`form-control ${css('searchBox')}`}
              value={searchString}
              placeholder={'search'}
              onChange={(e) => { this.handleDatasetSearch(e.target.value) }}
            />
            <Link to={'/dataset/add'} ><button className='btn btn-primary right'>Add</button></Link>
            <hr />
          </header>
          <Spinner />
        </div>
      )
    }

    return (
      <div className={css('wrap')}>
        <header className={css('header')}>
          { noHeader ? undefined : <div className={css('marginTop')}><h1>Datasets</h1><hr className={css('hr')} /></div>}
          <input
            id='search'
            name='search'
            type='text'
            className={`form-control ${css('searchBox')}`}
            value={searchString}
            placeholder='search'
            onChange={(e) => { this.handleDatasetSearch(e.target.value) }}
          />
          <Link to={'/dataset/add'} ><button className='btn btn-primary right'>Add</button></Link>
          <hr />
        </header>
        <div className={css('list')}>
          <List
            data={datasets}
            component={DatasetItem}
            emptyComponent={<label>{message}</label>}
            palette={palette}
            loading={this.props.loading}
            fetchedAll={this.props.fetchedAll}
            onClick={this.handleLoadNextPage}
            onAdd={this.handleAddDataset}
            type='datasets'
            />
          {/* TODO add back reload datasets button
          this.state.error ? <button className={`btn btn-primary`} onClick={this.handlReloadDatasets} >reload datasets</button> : undefined */}
        </div>
      </div>
    )
  }

  styles (props) {
    return {
      marginTop: {
        marginTop: 40
      },
      wrap: {
        paddingLeft: 0,
        paddingRight: 0
      },
      header: {
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
