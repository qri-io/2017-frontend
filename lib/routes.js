/* eslint-disable */
import React from 'react'
import { Switch, Route } from 'react-router-dom';

import AppContainer from './containers/App'
import CollectionContainer from './containers/Collection'
import DatasetContainer from './containers/Dataset'
import ProfilesContainer from './containers/Profiles'
import ProfileContainer from './containers/Profile'
import Stylesheet from './components/stylesheet/Stylesheet'

import EditorContainer from './containers/Editor'

export default () => (
  <AppContainer>
    <Switch>
      <Route exact path="/" component={CollectionContainer} />

      <Route path="/edit"  component={EditorContainer} />

      <Route path="/collection" component={CollectionContainer} />

      <Route path='/profile' component={ProfileContainer} />
      <Route exact path='/profiles' component={ProfilesContainer} />
      <Route path='/profiles/:id' component={ProfileContainer} />

      <Route exact path="/stylesheet" component={Stylesheet} />
      <Route exact path="/search" component={CollectionContainer} />
      
      <Route path='/:peername/:name/at/:network/:hash' component={DatasetContainer} />
      <Route path='/:peername/:name' component={DatasetContainer} />
      <Route path='/:peername' component={ProfileContainer} />
    </Switch>
  </AppContainer>
)
