/* eslint-disable */
import React from 'react'
import { Switch, Route } from 'react-router';

import AppContainer from './containers/App'
import ConsoleContainer from './containers/Console'
import DatasetsContainer from './containers/Datasets'
import PeersContainer from './containers/Peers'

export default () => (
  <AppContainer>
    <Switch>
      <Route exact path="/" component={ConsoleContainer} />
      <Route path="/datasets" component={DatasetsContainer} />
      <Route path="/peers" component={PeersContainer} />
    </Switch>
  </AppContainer>
)
