/* eslint-disable */
import React from 'react'
import { Switch, Route } from 'react-router';

import AppContainer from './containers/App'
import ConsoleContainer from './containers/Console'
import DatasetsContainer from './containers/Datasets'
import PeersContainer from './containers/Peers'
import SettingsContainer from './containers/Settings'
import Stylesheet from './components/Stylesheet'

export default () => (
  <AppContainer>
    <Switch>
      <Route exact path="/" component={ConsoleContainer} />
      <Route path="/datasets" component={DatasetsContainer} />
      <Route path="/peers" component={PeersContainer} />
      <Route path="/settings" component={SettingsContainer} />
      <Route path="/stylesheet" component={Stylesheet} />
    </Switch>
  </AppContainer>
)
