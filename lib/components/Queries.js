import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import { Palette, defaultPalette } from '../propTypes/palette'

import Base from './Base'

import List from './List'
import QueryItem from './item/QueryItem'
import Spinner from './Spinner'
import SaveQueryForm from './form/SaveQueryForm'

const ADD_SAVE_QUERY_MODAL = 'ADD_SAVE_QUERY_MODAL'

export default class Queries extends Base {
  constructor (props) {
    super(props)
    // this.state = { loading: props.Queries.length === 0 };
    this.state = { loading: true, error: false };

    [
      'onSelectQuery',
      'handleLoadNextPage',
      'handleMultiFunc',
      'onShowModal'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.queries) {
      this.props.loadQueries()
    } else if (!this.props.loading) {
      this.setState({ loading: false })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.queries) {
      this.props.loadQueries()
    } else if (this.state.loading && nextProps.queries.length > 0 && this.props.queries.length === 0 || nextProps.fetchedAll) {
      this.setState({ loading: false })
    }
  }

  onSelectQuery (i, query) {
    this.props.setTopPanel(0)
    this.props.setQuery(query.dataset)
  }

  onShowModal (i, query) {
    this.props.showModal(ADD_SAVE_QUERY_MODAL, this, query, true)
  }

  handleMultiFunc (i, query) {
    const funcs = {
      onClickQuery: () => { this.onSelectQuery(i, query) },
      onClickSave: () => { this.onShowModal(i, query) }
    }
    return funcs
  }

  handleLoadNextPage () {
    this.props.loadQueries(this.props.nextPage)
  }

  modal (name, data = {}) {
    switch (name) {
      case ADD_SAVE_QUERY_MODAL:
        return <SaveQueryForm query={data} />
      default:
        return undefined
    }
  }

  template (css) {
    const { loading, error } = this.state
    const { queries, searchString, palette, bounds, fetchedAll } = this.props
    let height = bounds.height - 57
    bounds.height = height
    if (loading) {
      return (
        <div className={css('wrap')}>
          <Spinner />
        </div>
      )
    }

    return (
      <div className={css('wrap')}>
        <List
          data={queries}
          component={QueryItem}
          onSelectItem={this.handleMultiFunc}
          emptyComponent={<label>No Queries</label>}
          palette={palette}
          style={bounds}
          loading={this.props.loading}
          fetchedAll={fetchedAll}
          onClick={this.handleLoadNextPage}
          type='queries'
          />
      </div>
    )
  }

  styles (props) {
    const { palette } = this.props

    return {
      wrap: {
        overflow: 'auto'
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

Queries.propTypes = {
  queries: PropTypes.array.isRequired,
  nextPage: PropTypes.number.isRequired,
  fetchedAll: PropTypes.bool,
  loadQueries: PropTypes.func.isRequired,
  skipLoad: PropTypes.bool,
  palette: Palette
}

Queries.defaultProps = {
  skipLoad: false,
  palette: defaultPalette
}
