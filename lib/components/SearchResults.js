import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import List from './List'
import SearchItem from './item/SearchItem'
import PageTitle from './PageTitle'

class SearchResults extends React.PureComponent {
  constructor (props) {
    super(props);

    [
      'handleLoadNextPage',
      'processResults'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentDidMount () {
    const { searchString, isFetching, fetchedAll, error } = this.props
    if (searchString && !isFetching && !fetchedAll && !error) {
      this.props.runDatasetSearch(searchString)
    }
  }

  componentDidUpdate (prevProps) {
    const { searchString } = prevProps
    if (searchString !== this.props.searchString) {
      this.props.runDatasetSearch(this.props.searchString)
    }
  }

  handleLoadNextPage () {
    this.props.runDatasetSearch(this.props.searchString, this.props.nextPage)
  }

  // might not need this later, but as of right now, some search results are returning
  // with a null value. this functions defensively filters for those cases.
  processResults (list) {
    return list.filter(i => !!i['Value'])
  }

  render () {
    const { searchString, searchResults, isFetching, fetchedAll, hitBottom } = this.props
    const results = searchResults && this.processResults(searchResults)

    return (
      <div className='search-results-wrap'>
        <div className='col border'>
          <header>
            <PageTitle pageTitle='Results' sectionTitle={'"' + searchString + '"'} />
          </header>
          <div className='col'>
            {<List
              data={results}
              component={SearchItem}
              loading={isFetching}
              fetchedAll={fetchedAll}
              type='datasets'
              emptyComponent={<p className='search-results-text'>No results found</p>}
              loadMore={this.handleLoadNextPage}
              hitBottom={hitBottom}
            />}
          </div>
        </div>
        <div className='col border-right border-top border-bottom'>
          <header />
          <div className='col'>
            <p className='search-results-text'>Searches the <span className='search-results-strong'> title</span> and <span className='search-results-strong'>description</span> of <span className='search-results-strong'> published</span> datasets.</p>
            <p className='search-results-text'>We are working to refine the search process, check back here for updates!</p>
          </div>
        </div>
      </div>
    )
  }
}

SearchResults.propTypes = {
  sessionProfile: PropTypes.string,
  searchString: PropTypes.string,
  searchResults: PropTypes.array,
  isFetching: PropTypes.bool,
  pageCount: PropTypes.number,
  fetchedAll: PropTypes.bool
}

SearchResults.defaultProps = {
}

export default withRouter(SearchResults)

// const mockResults = [
//   {
//     'Type': 'dataset',
//     'ID': 'echofox/dardoch',
//     'Value': {
//       'peername': 'echofox',
//       'name': 'dardoch',
//       'path': '/nalcs/graves',
//       'dataset': {
//         'meta': {
//           'title': 'best jungler NA'
//         },
//         'structure': {
//           'length': 19,
//           'entries': 4,
//           'errCount': 1
//         }
//       }
//     }
//   },
//   {
//     'Type': 'dataset',
//     'ID': 'echofox/huni',
//     'Value': {
//       'peername': 'echofox',
//       'name': 'huni',
//       'path': '/nalcs/lucian',
//       'dataset': {
//         'meta': {
//           'title': 'best top NA'
//         },
//         'structure': {
//           'length': 20,
//           'entries': 4,
//           'errCount': 1
//         }
//       }
//     }
//   },
//   {
//     'Type': 'peer',
//     'ID': 'echofox',
//     'Value': {
//       'peername': 'echofox',
//       'online': true
//     }
//   }
// ]
