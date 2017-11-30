/* eslint-disable */
import React from 'react'
import { Switch, Route } from 'react-router-dom';

import AppContainer from './containers/App'
import ConsoleContainer from './containers/Console'
import DatasetsContainer from './containers/Datasets'
import PeersContainer from './containers/Peers'
import ProfileContainer from './containers/Profile'
import SettingsContainer from './containers/Settings'
import DatasetContainer from './containers/Dataset'
import AddDatasetContainer from './containers/AddDataset'
import Stylesheet from './components/Stylesheet'
import MetadataEditorContainer from './containers/MetadataEditor'
import PeerContainer from './containers/Peer'

export default () => (
  <AppContainer>
    <Switch>
      <Route exact path="/" component={ConsoleContainer} />
      <Route path="/datasets" component={DatasetsContainer} />
      <Route path="/peers/:id" component={PeerContainer} />
      <Route path="/profile" component={ProfileContainer} />
      <Route path="/peers" component={PeersContainer} />
      <Route path="/settings" component={SettingsContainer} />
      <Route path="/dataset/add" component={AddDatasetContainer} />
      <Route path="/dataset/:id" component={DatasetContainer} />
      <Route path='/edit/:id' component={MetadataEditorContainer} />
      <Route path="/stylesheet" component={Stylesheet} />
    </Switch>
  </AppContainer>
)
