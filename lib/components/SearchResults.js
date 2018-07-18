import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import List from './List'
import SearchItem from './item/SearchItem'

import Base from './Base'

class SearchResults extends Base {
  constructor (props) {
    super(props);

    [
      'processResults'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    const { searchResults, searchString } = this.props
    if (!searchResults && searchString) {
      this.props.runDatasetSearch(searchString)
    }
  }

  // might not need this later, but as of right now, some search results are returning
  // with a null value. this functions defensively filters for those cases.
  processResults (list) {
    return list.filter(i => !!i['Value'])
  }

  template (css) {
    const { sessionProfile, searchString, searchResults, isFetching, fetchedAll } = this.props

    if (!sessionProfile) {
      return <div />
    }

    const results = this.processResults(searchResults)

    return (
      <div className={css('wrap')} >
        <div className={css('pad')}>
          <p className={css('pad')}>We are currently working on dataset availability. There may be datasets that show up in your search results that are not currently online.</p>
          <h3>{searchString ? `${results.length} search results found for "` + searchString + '":' : 'Search using the search bar above'}</h3>
        </div>
        {searchString ? <List
          data={results}
          component={SearchItem}
          loading={isFetching}
          fetchedAll={fetchedAll}
          type='datasets'
          emptyComponent={<p style={{padding: '0 40px'}} >no results found</p>}
          onClick={() => {}}
          style={{margin: 40}}
        /> : undefined}
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        padding: '30px 20px'
      },
      pad: {
        padding: '0 40px'
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
