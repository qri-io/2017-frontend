/* eslint-disable */
import React from 'react'
import { Switch, Route } from 'react-router-dom';

import AppContainer from './containers/App'
import CollectionContainer from './containers/Collection'
import DatasetContainer from './containers/Dataset'
import ProfileContainer from './containers/Profile'
import NetworkContainer from './containers/Network'
import Stylesheet from './components/stylesheet/Stylesheet'
import SearchResultsContainer from './components/SearchResults'

import EditorContainer from './containers/Editor'

export default () => (
  <AppContainer>
    <Switch>
      <Route exact path="/" component={CollectionContainer} />

      <Route path="/edit"  component={EditorContainer} />

      <Route path="/collection" component={CollectionContainer} />

      <Route path='/profile' component={ProfileContainer} />
      
      <Route exact path='/network' component={NetworkContainer} />
      <Route path='/network/:id' component={ProfileContainer} />

      <Route exact path="/stylesheet" component={Stylesheet} />
      {/*
        TODO: for some reason the SearchResultsContainer doesn't seem
        to get called when we go to the `/search` endpoint
      */}
      <Route exact path="/search" component={SearchResultsContainer} />
      
      <Route path='/:peername/:name/at/:network/:hash' component={DatasetContainer} />
      <Route path='/:peername/:name' component={DatasetContainer} />
      <Route path='/:peername' component={ProfileContainer} />
    </Switch>
  </AppContainer>
)
