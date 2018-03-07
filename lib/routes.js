/* eslint-disable */
import React from 'react'
import { Switch, Route } from 'react-router-dom';

import AppContainer from './containers/App'
import DatasetsContainer from './containers/Datasets'
import DatasetContainer from './containers/Dataset'
import AddDatasetContainer from './containers/AddDataset'
import PeersContainer from './containers/Peers'
import PeerContainer from './containers/Peer'
import Stylesheet from './components/Stylesheet'
import MetadataEditorContainer from './containers/MetadataEditor'

export default () => (
  <AppContainer>
    <Switch>
      <Route exact path="/" component={DatasetsContainer} />

      <Route path="/datasets" component={DatasetsContainer} />
      <Route path="/dataset/add" component={AddDatasetContainer} />

      <Route exact path='/peers' component={PeersContainer} />
      <Route path='/peers/:id' component={PeerContainer} />

      <Route exact path="/stylesheet" component={Stylesheet} />
      
      <Route path='/:peername/:name/at/:network/:hash/meta/edit' component={MetadataEditorContainer} />
      
      <Route path='/:peername/:name/at/:network/:hash' component={DatasetContainer} />
      <Route path='/:peername/:name' component={DatasetContainer} />
    </Switch>
  </AppContainer>
)
