/* globals __BUILD__ */
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AppContainer from './containers/App'
import CollectionContainer from './containers/Collection'
import DatasetContainer from './containers/Dataset'
import ProfileContainer from './containers/Profile'
import NetworkContainer from './containers/Network'
import Stylesheet from './components/stylesheet/Stylesheet'
import SearchResultsContainer from './containers/SearchResults'
import Spinner from './components/chrome/Spinner'
import UpdatesContainer from './containers/Updates'
import CompareContainer from './containers/Compare'

const EditorContainer = React.lazy(() => import('./containers/Editor.js'))

export default () => (
  <AppContainer>
    <React.Suspense fallback={<div className='routes-spinner'><Spinner /></div>}>
      <Switch>
        <Route exact path='/' component={CollectionContainer} />
        <Route path='/collection' component={CollectionContainer} />
        <Route path='/updates' component={UpdatesContainer} />
        <Route path='/profile' component={ProfileContainer} />

        <Route exact path='/network' component={NetworkContainer} />
        <Route path='/network/:id' component={ProfileContainer} />
        
        <Route exact path='/compare' component={CompareContainer} />
        <Route path='/compare/:paths*' component={CompareContainer} />

        <Route exact path='/stylesheet' component={Stylesheet} />
        {/*
          TODO: for some reason the SearchResultsContainer doesn't seem
          to get called when we go to the `/search` endpoint
        */}
        <Route exact path='/search' component={SearchResultsContainer} />

        {!__BUILD__.READONLY && <Route path='/edit' component={EditorContainer} />}
        <Route path='/:peername/:name/at/:network/:hash' component={DatasetContainer} />
        <Route path='/:peername/:name' component={DatasetContainer} />
        <Route path='/:peername' component={ProfileContainer} />
      </Switch>
    </React.Suspense>
  </AppContainer>
)
