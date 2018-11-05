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
    // TODO: for some reason the SearchResultsContainer doesn't seem
    // to get called when we go to the `/search` endpoint, so sessionProfile
    // never get's set
    // if (!sessionProfile) {
    //   return <div />
    // }
    console.log(sessionProfile)
    const results = searchResults && this.processResults(searchResults)

    return (
      <div className={css('wrap')}>
        <div className={`sectionWidth border-top border-right ${css('col1')}`} >
          <div className='border-bottom headerHeight'>
            <PageTitle pageTitle='Results' sectionTitle={searchString} />
          </div>
          <div className={`sectionWidth ${css('padding')}`} >
            {<List
              data={results}
              component={SearchItem}
              loading={isFetching}
              fetchedAll={fetchedAll}
              type='datasets'
              emptyComponent={<p>no results found</p>}
              onClick={() => {}}
              style={{ marginLeft: 30 }}
            />}
          </div>
        </div>
        <div className={`border-top ${css('col2')}`}>
          <div className='border-bottom headerHeight' />
          <div className={css('padding')} >
            <p>We are currently working on getting you better search results!</p>
            <p>Be on the look out here for further updates :)</p>
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
      col2: {
        width: '100%'
      },
      padding: {
        padding: 20
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
