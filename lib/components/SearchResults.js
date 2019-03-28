import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import List from './List'
import SearchItem from './item/SearchItem'
import PageTitle from './PageTitle'

import Base from './Base'

class SearchResults extends Base {
  constructor (props) {
    super(props);

    [
      'processResults'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentDidMount () {
    const { searchString, isFetching, fetchedAll, error } = this.props
    if (searchString && !isFetching && !fetchedAll && !error) {
      this.props.runDatasetSearch(searchString)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { searchString } = this.props
    if (searchString !== nextProps.searchString) {
      this.props.runDatasetSearch(nextProps.searchString)
    }
  }

  // might not need this later, but as of right now, some search results are returning
  // with a null value. this functions defensively filters for those cases.
  processResults (list) {
    return list.filter(i => !!i['Value'])
  }

  template (css) {
    const { searchString, searchResults, isFetching, fetchedAll } = this.props
    const results = searchResults && this.processResults(searchResults)

    return (
      <div className={css('wrap')}>
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
              emptyComponent={<p className={css('text')}>No results found</p>}
              onClick={() => {}}
            />}
          </div>
        </div>
        <div className='col border-right border-top border-bottom'>
          <header />
          <div className='col'>
            <p className={css('text')}>Searches the <span className={css('strong')}> title</span> and <span className={css('strong')}>description</span> of <span className={css('strong')}> published</span> datasets.</p>
            <p className={css('text')}>We are working to refine the search process, check back here for updates!</p>
          </div>
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        height: '100%',
        display: 'flex'
      },
      strong: {
        fontWeight: 500
      },
      text: {
        maxWidth: 300,
        margin: 20
      }
    }
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
