/* eslint-disable */
import React from 'react'
import { Switch, Route } from 'react-router-dom';

import AppContainer from './containers/App'
import DatasetsContainer from './containers/Datasets'
import DatasetContainer from './containers/Dataset'
import AddDatasetContainer from './containers/AddDataset'
import ProfilesContainer from './containers/Profiles'
import ProfileContainer from './containers/Profile'
import Stylesheet from './components/Stylesheet'
import SearchResultsContainer from './containers/SearchResults'
import MetadataEditorContainer from './containers/MetadataEditor'

export default () => (
  <AppContainer>
    <Switch>
      <Route exact path="/" component={DatasetsContainer} />

      <Route path="/datasets" component={DatasetsContainer} />
      <Route path="/dataset/add" component={AddDatasetContainer} />

      <Route path='/profile' component={ProfileContainer} />
      <Route exact path='/profiles' component={ProfilesContainer} />
      <Route path='/profiles/:id' component={ProfileContainer} />

      <Route exact path="/stylesheet" component={Stylesheet} />
      <Route exact path="/search" component={DatasetsContainer} />
      
      <Route path='/:peername/:name/at/:network/:hash/meta/edit' component={MetadataEditorContainer} />
      
      <Route path='/:peername/:name/at/:network/:hash' component={DatasetContainer} />
      <Route path='/:peername/:name' component={DatasetContainer} />
      <Route path='/:peername' component={ProfileContainer} />
    </Switch>
  </AppContainer>
)
